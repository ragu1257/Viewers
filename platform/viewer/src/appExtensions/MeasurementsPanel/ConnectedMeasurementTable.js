import { connect } from 'react-redux';
import { MeasurementTable } from '@ohif/ui';
import OHIF, { DICOMSR } from '@ohif/core';
import moment from 'moment';
import cornerstone from 'cornerstone-core';

import jumpToRowItem from './jumpToRowItem.js';

const { setViewportSpecificData } = OHIF.redux.actions;
const { MeasurementApi } = OHIF.measurements;

/**
 * Takes a list of objects and a property and return the list grouped by the property
 *
 * @param {Array} list - The objects to be grouped by
 * @param {string} props - The property to group the objects
 * @returns {Object}
 */
function groupBy(list, props) {
  return list.reduce((a, b) => {
    (a[b[props]] = a[b[props]] || []).push(b);
    return a;
  }, {});
}

/**
 *  Takes a list of tools grouped and return all tools separately
 *
 * @param {Array} [toolGroups=[]] - The grouped tools
 * @returns {Array} - The list of all tools on all groups
 */
function getAllTools(toolGroups = []) {
  let tools = [];
  toolGroups.forEach(toolGroup => (tools = tools.concat(toolGroup.childTools)));

  return tools;
}

/**
 * Takes measurementData and build the measurement text to be used into the table
 *
 * @param {Object} [measurementData={}]
 * @param {string} measurementData.location - The measurement location
 * @param {string} measurementData.description - The measurement description
 * @returns {string}
 */
function getMeasurementText(measurementData = {}) {
  const defaultText = '...';
  const { location = '', description = '' } = measurementData;
  const result = location + (description ? ` (${description})` : '');

  return result || defaultText;
}

/**
 * Takes a list of measurements grouped by measurement numbers and return each measurement data by available timepoint
 *
 * @param {Array} measurementNumberList - The list of measurements
 * @param {Array} timepoints - The list of available timepoints
 * @param {Function} displayFunction - The function that builds the display text by each tool
 * @returns
 */
function getDataForEachMeasurementNumber(
  measurementNumberList,
  timepoints,
  displayFunction
) {
  const data = [];
  // on each measurement number we should get each measurement data by available timepoint
  measurementNumberList.forEach(measurement => {
    timepoints.forEach(timepoint => {
      const eachData = {
        displayText: '...',
      };
      if (measurement.timepointId === timepoint.timepointId) {
        eachData.displayText = displayFunction(measurement);
      }
      data.push(eachData);
    });
  });

  return data;
}

/**
 * Take a measurement toolName and return if any warnings
 *
 * @param {string} toolName - The tool name
 * @returns {string}
 */
function getWarningsForMeasurement(toolName) {
  const isToolSupported = DICOMSR.isToolSupported(toolName);

  return {
    hasWarnings: !isToolSupported,
    warningTitle: isToolSupported ? '' : 'Unsupported Tool',
    warningList: isToolSupported
      ? []
      : [`${toolName} cannot be persisted at this time`],
  };
}

/**
 * Take measurements from MeasurementAPI structure and convert into a measurementTable structure
 *
 * @param {Object} toolCollections - The list of all measurement grouped by groupTool and toolName
 * @param {Array} timepoints - The list of available timepoints
 * @returns
 */
function convertMeasurementsToTableData(toolCollections, timepoints) {
  const config = OHIF.measurements.MeasurementApi.getConfiguration();
  const toolGroups = config.measurementTools;
  const tools = getAllTools(toolGroups);

  const tableMeasurements = toolGroups.map(toolGroup => {
    return {
      groupName: toolGroup.name,
      groupId: toolGroup.id,
      measurements: [],
    };
  });

  Object.keys(toolCollections).forEach(toolId => {
    const toolMeasurements = toolCollections[toolId];
    const tool = tools.find(tool => tool.id === toolId);
    const { displayFunction } = tool.options.measurementTable;

    // Group by measurementNumber so we can display then all in the same line
    const groupedMeasurements = groupBy(toolMeasurements, 'measurementNumber');

    Object.keys(groupedMeasurements).forEach(groupedMeasurementsIndex => {
      const measurementNumberList =
        groupedMeasurements[groupedMeasurementsIndex];
      const measurementData = measurementNumberList[0];
      const {
        measurementNumber,
        lesionNamingNumber,
        toolType,
      } = measurementData;
      const measurementId = measurementData._id;

      const {
        hasWarnings,
        warningTitle,
        warningList,
      } = getWarningsForMeasurement(toolType);

      //check if all measurements with same measurementNumber will have same LABEL
      const tableMeasurement = {
        itemNumber: lesionNamingNumber,
        label: getMeasurementText(measurementData),
        measurementId,
        measurementNumber,
        lesionNamingNumber,
        toolType,
        hasWarnings,
        warningTitle,
        warningList,
        isSplitLesion: false, //TODO
        data: getDataForEachMeasurementNumber(
          measurementNumberList,
          timepoints,
          displayFunction
        ),
      };

      // find the group object for the tool
      const toolGroupMeasurements = tableMeasurements.find(group => {
        return group.groupId === tool.toolGroup;
      });
      // inject the new measurement for this measurementNumer
      toolGroupMeasurements.measurements.push(tableMeasurement);
    });
  });

  // Sort measurements by lesion naming number
  tableMeasurements.forEach(tm => {
    tm.measurements.sort((m1, m2) =>
      m1.lesionNamingNumber > m2.lesionNamingNumber ? 1 : -1
    );
  });

  return tableMeasurements;
}

/**
 * Take a list of available timepoints and return a list header information for each timepoint
 *
 * @param {Array} timepoints - The list of available timepoints
 * @param {string} timepoints[].latestDate - The date of the last study taken on the timepoint
 * @returns {{label: string, key: string, date: string}[]}
 */
function convertTimepointsToTableData(timepoints) {
  if (!timepoints || !timepoints.length) {
    return [];
  }

  return [
    {
      label: 'Study date:',
      key: 'StudyDate',
      date: moment(timepoints[0].latestDate).format('DD-MMM-YY'),
    },
  ];
}

/**
 *  Takes server type and return a function or undefined
 *
 * @param {string} serverType - The server type
 * @returns {undefined|Function}
 */
// let tempMeasurements = [{
//   visible: true,
//   active: true,
//   invalidated: false,
//   handles: {
//     start: {
//       x: 365.0913580246911,
//       y: 1682.2666666666667,
//       highlight: true,
//       active: false,
//     },
//     end: {
//       x: 727.5999999999999,
//       y: 1886.177777777778,
//       highlight: true,
//       active: false,
//       moving: false,
//     },
//     initialRotation: 0,
//     textBox: {
//       active: false,
//       hasMoved: false,
//       movesIndependently: false,
//       drawnIndependently: true,
//       allowedOutsideImage: true,
//       hasBoundingBox: true,
//       x: 727.5999999999999,
//       y: 1784.2222222222222,
//       boundingBox: {
//         width: 249.1015625,
//         height: 45,
//         left: 775,
//         top: 292.5,
//       },
//     },
//   },
//   uuid: '8989edc1-48f0-4999-b625-81bc87172e71',
//   PatientID: '001',
//   StudyInstanceUID: '1.2.840.113619.2.66.2158408118.16050010109105933.20000',
//   SeriesInstanceUID: '1.2.840.113619.2.66.2158408118.16050010109110253.10003',
//   SOPInstanceUID: '1.2.840.113619.2.66.2158408118.2683010109110300.85',
//   frameIndex: 0,
//   imagePath:
//     '1.2.840.113619.2.66.2158408118.16050010109105933.20000_1.2.840.113619.2.66.2158408118.16050010109110253.10003_1.2.840.113619.2.66.2158408118.2683010109110300.85_0',
//   lesionNamingNumber: 4,
//   userId: null,
//   toolType: 'EllipticalRoi',
//   _id: '2115bee7-51b8-34fd-3812-4acb0004c4f2',
//   timepointId: 'TimepointId',
//   measurementNumber: 4,
//   cachedStats: {
//     area: 581.6030479590786,
//     count: 58127,
//     mean: 2226.322242675521,
//     variance: 2560.3312242571265,
//     stdDev: 50.59971565391575,
//     min: 2064,
//     max: 2407,
//   },
//   viewport: {
//     scale: 0.17654751525719267,
//     translation: {
//       x: 0,
//       y: 0,
//     },
//     voi: {
//       windowWidth: 750,
//       windowCenter: 2419,
//     },
//     invert: false,
//     pixelReplication: false,
//     rotation: 0,
//     hflip: false,
//     vflip: false,
//     labelmap: false,
//     displayedArea: {
//       tlhc: {
//         x: 1,
//         y: 1,
//       },
//       brhc: {
//         x: 1914,
//         y: 2294,
//       },
//       rowPixelSpacing: 0.1,
//       columnPixelSpacing: 0.1,
//       presentationSizeMode: 'NONE',
//     },
//   },
// }];
let tempMeasurements = [];
function getSaveFunction(serverType) {
  if (serverType === 'dicomWeb') {
    return () => {
      const measurementApi = OHIF.measurements.MeasurementApi.Instance;

      // const localMeasurementAPI = OHIF.measurements.MeasurementApi.Instance;
      // tempMeasurements.forEach(tempMeasurements =>
      //   localMeasurementAPI.addMeasurement(
      //     tempMeasurements.toolType,
      //     tempMeasurements
      //   )
      // );
      // localMeasurementAPI.syncMeasurementsAndToolData();
      // cornerstone.getEnabledElements().forEach(enabledElement => {
      //   cornerstone.updateImage(enabledElement.element);
      // });

      // we can save this to our database
      //   fetch("http://localhost:8080/info", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify(measurementApi)
      // }).then(
      //   this.setState({
      //     singledata: {
      //       title: "",
      //       author: ""
      //     }
      //   })
      // );
      console.log('measurementApi.tools', measurementApi.tools);
      try {
        Object.entries(measurementApi.tools).map(([key, value]) => {
          // console.log('keysss', key, value, value.length);
          if (value.length) {
            value.forEach(async function(arrayItem) {
              console.log(arrayItem, key);
              // let presentOrNot = false;
              // await fetch('http://localhost:8080/' + key)
              //   .then(res => {
              //     return res.json();
              //   })
              //   .then(data => {
              //     console.log(
              //       'yaaa hohoooooo 4444',
              //       JSON.stringify(data).includes(arrayItem._id)
              //     );
              //     presentOrNot = JSON.stringify(data).includes(arrayItem._id);
              //     // tempMeasurements = data;
              //   });
              // console.log('presentOrNot', presentOrNot);
              // if (presentOrNot) {
              //   await fetch(
              //     'http://localhost:8080/' + key + '?' + arrayItem._id,
              //     {
              //       method: 'PUT',
              //       headers: {
              //         'Content-Type': 'application/json',
              //       },
              //       body: JSON.stringify(arrayItem),
              //     }
              //   );
              // await fetch(
              //   'http://localhost:8080/' + key,
              //   {
              //     method: 'POST',
              //     headers: {
              //       'Content-Type': 'application/json',
              //     },
              //     body: JSON.stringify(arrayItem),
              //   }
              // ).then(data => {
              //   console.log('data added for', arrayItem._id);
              // });
              // } else {
              //   await fetch('http://localhost:8080/' + key, {
              //     method: 'POST',
              //     headers: {
              //       'Content-Type': 'application/json',
              //     },
              //     body: JSON.stringify(arrayItem),
              //   }).then(data => {
              //     console.log('data ssaved', arrayItem._id);
              //   });
              // }

              await fetch('http://localhost:8080/' + key, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(arrayItem),
              }).then(data => {
                console.log('data ssaved');
              });
            });
          }
          // Pretty straightforward - use key for the key and value for the value.
          // Just to clarify: unlike object destructuring, the parameter names don't matter here.
        });
      } catch (error) {
        console.error(error);
      }
      console.log('this is measurementApi return', measurementApi.tools);
      const promise = measurementApi.storeMeasurements();
      return promise;
    };
  }
}

function getShowMeasurement(serverType) {
  fetch('http://localhost:8080/EllipticalRoi')
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log('yaaa hohoooooo getting data', data);
      tempMeasurements = data;
    });
  if (serverType === 'dicomWeb') {
    return () => {
      console.log(tempMeasurements);
      // const measurementApi = OHIF.measurements.MeasurementApi.Instance;

      const localMeasurementAPI = OHIF.measurements.MeasurementApi.Instance;
      tempMeasurements.forEach(tempMeasurements =>
        localMeasurementAPI.addMeasurement(
          tempMeasurements.toolType,
          tempMeasurements
        )
      );
      localMeasurementAPI.syncMeasurementsAndToolData();
      return cornerstone.getEnabledElements().forEach(enabledElement => {
        cornerstone.updateImage(enabledElement.element);
      });

      // we can save this to our database
      // console.log('this is measurementApi return', measurementApi);
      // const promise = measurementApi.storeMeasurements();
      // return promise;
    };
  }
}

const mapStateToProps = state => {
  const { timepointManager, servers } = state;
  const { timepoints, measurements } = timepointManager;
  const activeServer = servers.servers.find(a => a.active === true);
  const saveFunction = getSaveFunction(activeServer.type);
  const showMeasurement = getShowMeasurement(activeServer.type);

  return {
    timepoints: convertTimepointsToTableData(timepoints),
    measurementCollection: convertMeasurementsToTableData(
      measurements,
      timepoints
    ),
    timepointManager: state.timepointManager,
    viewports: state.viewports,
    saveFunction,
    showMeasurement,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatchRelabel: (event, measurementData, viewportsState) => {
      event.persist();

      const activeViewportIndex =
        (viewportsState && viewportsState.activeViewportIndex) || 0;

      const enabledElements = cornerstone.getEnabledElements();
      if (!enabledElements || enabledElements.length <= activeViewportIndex) {
        OHIF.log.error('Failed to find the enabled element');
        return;
      }

      const { toolType, measurementId } = measurementData;
      const tool = MeasurementApi.Instance.tools[toolType].find(measurement => {
        return measurement._id === measurementId;
      });

      // Clone the tool not to set empty location initially
      const toolForLocation = Object.assign({}, tool, { location: null });

      if (ownProps.onRelabel) {
        ownProps.onRelabel(toolForLocation);
      }
    },
    dispatchEditDescription: (event, measurementData, viewportsState) => {
      event.persist();

      const activeViewportIndex =
        (viewportsState && viewportsState.activeViewportIndex) || 0;

      const enabledElements = cornerstone.getEnabledElements();
      if (!enabledElements || enabledElements.length <= activeViewportIndex) {
        OHIF.log.error('Failed to find the enabled element');
        return;
      }

      const { toolType, measurementId } = measurementData;
      const tool = MeasurementApi.Instance.tools[toolType].find(measurement => {
        return measurement._id === measurementId;
      });

      if (ownProps.onEditDescription) {
        ownProps.onEditDescription(tool);
      }
    },
    dispatchJumpToRowItem: (
      measurementData,
      viewportsState,
      timepointManagerState,
      options
    ) => {
      const actionData = jumpToRowItem(
        measurementData,
        viewportsState,
        timepointManagerState,
        dispatch,
        options
      );

      actionData.viewportSpecificData.forEach(viewportSpecificData => {
        const { viewportIndex, displaySet } = viewportSpecificData;

        dispatch(setViewportSpecificData(viewportIndex, displaySet));
      });

      const { toolType, measurementNumber } = measurementData;
      const measurementApi = MeasurementApi.Instance;

      Object.keys(measurementApi.tools).forEach(toolType => {
        const measurements = measurementApi.tools[toolType];

        measurements.forEach(measurement => {
          measurement.active = false;
        });
      });

      const measurementsToActive = measurementApi.tools[toolType].filter(
        measurement => {
          return measurement.measurementNumber === measurementNumber;
        }
      );

      measurementsToActive.forEach(measurementToActive => {
        measurementToActive.active = true;
      });

      measurementApi.syncMeasurementsAndToolData();

      cornerstone.getEnabledElements().forEach(enabledElement => {
        if (enabledElement.image) {
          cornerstone.updateImage(enabledElement.element);
        }
      });

      // Needs to update viewports.layout state to set layout
      //const layout = actionData.layout;
      //dispatch(setLayout(layout))

      // Needs to update viewports.activeViewportIndex to the first updated viewport
      //const viewportIndex = actionData.viewportIndex;
      //dispatch(setViewportActive(viewportIndex));

      // Needs to update timepointsManager.measurements state to set active measurementId
      // TODO: Not yet implemented
      //dispatch(setActiveMeasurement(measurementData.measurementId))

      // (later): Needs to set some property on state.extensions.cornerstone to synchronize viewport scrolling
    },
  };
};

const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {
  const {
    timepoints,
    saveFunction,
    showMeasurement,
    measurementCollection,
  } = propsFromState;
  const { onSaveComplete, selectedMeasurementNumber } = ownProps;

  return {
    timepoints,
    saveFunction,
    showMeasurement,
    measurementCollection,
    onSaveComplete,
    selectedMeasurementNumber,
    ...propsFromDispatch,
    onItemClick: (event, measurementData) => {
      // TODO: Add timepointId to .data for measurementData?
      // TODO: Tooltype should be on the level below? This should
      // provide the entire row item?

      const viewportsState = propsFromState.viewports;
      const timepointManagerState = propsFromState.timepointManager;

      // TODO: invertViewportTimepointsOrder should be stored in / read from user preferences
      // TODO: childToolKey should come from the measurement table when it supports child tools
      const options = {
        invertViewportTimepointsOrder: false,
        childToolKey: null,
      };

      propsFromDispatch.dispatchJumpToRowItem(
        measurementData,
        viewportsState,
        timepointManagerState,
        options
      );
    },
    onRelabelClick: (event, measurementData) => {
      const viewportsState = propsFromState.viewports;
      propsFromDispatch.dispatchRelabel(event, measurementData, viewportsState);
    },
    onEditDescriptionClick: (event, measurementData) => {
      const viewportsState = propsFromState.viewports;
      propsFromDispatch.dispatchEditDescription(
        event,
        measurementData,
        viewportsState
      );
    },
    onDeleteClick: (event, measurementData) => {
      const { MeasurementHandlers } = OHIF.measurements;

      MeasurementHandlers.onRemoved({
        detail: {
          toolType: measurementData.toolType,
          measurementData: {
            _id: measurementData.measurementId,
            lesionNamingNumber: measurementData.lesionNamingNumber,
            measurementNumber: measurementData.measurementNumber,
          },
        },
      });
    },
  };
};

const ConnectedMeasurementTable = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(MeasurementTable);

export default ConnectedMeasurementTable;
