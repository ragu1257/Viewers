import cornerstone from 'cornerstone-core';
import { MeasurementApi } from '../classes';
import log from '../../log';

export default async function({ eventData, tool, toolGroupId, toolGroup }) {
  const measurementApi = MeasurementApi.Instance;
  if (!measurementApi) {
    log.warn('Measurement API is not initialized');
  }

  const { measurementData, toolType } = eventData;

  const collection = measurementApi.tools[toolType];

  // Stop here if the tool data shall not be persisted (e.g. temp tools)
  if (!collection) return;
  console.log(
    'it is CornerstoneToolsMeasurementModified',
    eventData,
    eventData.measurementData
  );
  log.info('CornerstoneToolsMeasurementModified');
  // await fetch('http://localhost:8080/' + eventData.measurementData.toolType, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(eventData.measurementData),
  // }).then(data => {
  //   console.log('data ssaved');
  // });
  let presentOrNot
  await fetch('http://localhost:8080/' + eventData.measurementData.toolType)
    .then(res => {
      return res.json();
    })
    .then(data => {
      data.forEach( ele => {
        console.log(
          'yaaa hohoooooo 4444',
          JSON.stringify(ele), ele.measurementNumber,  eventData.measurementData.measurementNumber, eventData.measurementData
        );
        if(ele.measurementNumber == eventData.measurementData.measurementNumber){
          presentOrNot = true
        }
      })

      // tempMeasurements = data;
    });
    console.log("presentOrNot",presentOrNot);
  if (presentOrNot == true) {
    console.log("in present", eventData.measurementData.measurementNumber);
    await fetch(
      'http://localhost:8080/' + eventData.measurementData.toolType + `/${eventData.measurementData.measurementNumber}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData.measurementData),
      }
    ).then(data => {
      console.log('data added for', eventData.measurementData.measurementNumber);
    });
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
  } else {
    await fetch('http://localhost:8080/' + eventData.measurementData.toolType, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData.measurementData),
    }).then(data => {
      console.log('data ssaved', eventData.measurementData.measurementNumber);
    });
  }
  let measurement = collection.find(t => t._id === measurementData._id);

  // Stop here if the measurement is already deleted
  if (!measurement) return;

  measurement = Object.assign(measurement, measurementData);
  measurement.viewport = cornerstone.getViewport(eventData.element);

  measurementApi.updateMeasurement(toolType, measurement);

  // TODO: Notify about the last activated measurement

  if (MeasurementApi.isToolIncluded(tool)) {
    console.log('this is last');
    // TODO: Notify that viewer suffered changes
  }
}
