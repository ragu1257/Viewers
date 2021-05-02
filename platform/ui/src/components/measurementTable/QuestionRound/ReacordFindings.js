import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import {
  Stepper,
  Step,
  TextField,
  StepLabel,
  Typography,
  Button,
} from '@material-ui/core';
import MassesShape from './FindingsQuestions/MassesShape';
import AssociatedFeatures from './FindingsQuestions/AssociatedFeatures';
import Calcifications from './FindingsQuestions/Calcifications';
import Location from './FindingsQuestions/Location';
import Distribution from './FindingsQuestions/Distribution';
import Classification from './FindingsQuestions/Classification';
import ArchitecturalDistortion from './FindingsQuestions/ArchitecturalDistortion';
import Asymmetries from './FindingsQuestions/Asymmetries';

const useStyles = makeStyles({
  root: {
    width: '100%',
    margin: '6rem auto',
    border: '1px solid #333',
    background: '#1fa5d6',
  },
  button: {
    // color: '#fff',
  },
});

const defaultData = {
  architectural_distortion: '',
  classification: '',
  associated_findings_boolean: false,
  distribution: '',
  masses: {
    shape: '',
    margine: '',
    density: '',
  },
  associated_features: {
    skin_reaction: false,
    nipple_retraction: false,
    skin_thickening: false,
    axillary_adenopathy: false,
    architectural_distortion: false,
    Calcifications: false,
  },
  calcifications_details: {
    typically_benign: '',
    suspicious: '',
  },
};

const ReacordFindings = ({ updateCurrentFinding, activeFinding }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setForm] = useState(defaultData);

  useEffect(() => {
    console.log('child compo values', formData);
  }, [formData]);

  function getSteps() {
    return [
      'classification',
      'masses_shape',
      'associated_features',
      'calcifications_details',
      'distribution',
      '6',
      '7',
      '8',
    ];
  }

  const handleNext = () => {
    // if (formData.distribution.length != 0) {
    //   setActiveStep(7);
    // } else {
    //   setActiveStep(prevActiveStep => prevActiveStep + 1);
    // }
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const steps = getSteps();

  const handleChange = input => e => {
    console.log('bottu clicked', input, e.target.value, e.target.name);
    e.persist();
    switch (input) {
      case 'classification':
      case 'distribution':
      case 'architectural_distortion':
        // console.log('in case classification', input);
        setForm(formData => ({ ...formData, [e.target.name]: e.target.value }));
        break;
      // case 'distribution':
      // //   console.log('in case distribution', input);
      //   setForm(formData => ({ ...formData, [e.target.name]: e.target.value }));
      case 'masses':
        // console.log('in case masses', input);
        setForm(formData => ({
          ...formData,
          masses: { ...formData.masses, [e.target.name]: e.target.value },
        }));
        break;

      case 'associated_features':
        // console.log('in case associated_features', input);
        setForm(formData => ({
          ...formData,
          associated_features: {
            ...formData.associated_features,
            [e.target.name]: e.target.checked,
          },
        }));
        break;
      case 'calcifications_details':
        // console.log('in case calcifications_details', input);
        setForm(formData => ({
          ...formData,
          calcifications_details: {
            ...formData.calcifications_details,
            [e.target.name]: e.target.value,
          },
        }));
        break;
      // default:
      //   setForm(formData => ({ ...formData, [input]: e.target.value }));
    }
    // if(input=='shape'){
    //   setForm(formData => ({
    //     ...formData,
    //     masses: { ...formData.masses, [input]: e.target.value },
    //   }));
    // } else
  };
  const {
    masses,
    associated_features,
    calcifications_details,
    distribution,
    architectural_distortion,
    associated_findings_boolean
  } = formData;
  const values = {
    masses,
    architectural_distortion,
    associated_features,
    calcifications_details,
    distribution,
    associated_findings_boolean
  };
  function getStepsContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <Classification handleChange={handleChange} values={values} />;
      case 1:
        return formData.classification == 'masses' ? (
          <div>
            <h2>Make Region Of Interest</h2>
          </div>
        ) : formData.classification == 'calcifications' ? (
          <div>
          <h2>Are there any Associated Features?</h2>
          <div
            className="radio-toolbar density"
            value={values.associated_findings_boolean}
            onChange={handleChange('masses')}
          >
            <input
              type="radio"
              id="radio1"
              name="associated_findings_boolean"
              value="yes"
            />
            <label htmlFor="radio1">Yes</label>

            <input
              type="radio"
              id="radio2"
              name="associated_findings_boolean"
              value="no"
            />
            <label htmlFor="radio2">No</label>
          </div>
        </div>
        ) : formData.classification == 'architectural_distortion' ? (
          <ArchitecturalDistortion
            handleChange={handleChange}
            values={values}
          />
        ) : formData.classification == 'asymmetries' ? (
          <Asymmetries handleChange={handleChange} values={values} />
        ) : (
          <Location handleChange={handleChange} values={values} />
        );
      case 2:
        return formData.classification == 'masses' ? (
          <MassesShape handleChange={handleChange} values={values} />
        ) : formData.classification == 'calcifications' && formData.associated_findings_boolean=='yes' ? (
          <AssociatedFeatures handleChange={handleChange} values={values} />
        ) : formData.classification == 'architectural_distortion' &&
          formData.architectural_distortion == 'standalone' ? (
          <Location handleChange={handleChange} values={values} />
        ) : formData.classification == 'architectural_distortion' &&
          formData.architectural_distortion == 'associated_feature' ? (
          <AssociatedFeatures handleChange={handleChange} values={values} />
        ) : <Location handleChange={handleChange} values={values} />;
      case 3:
        return formData.classification == 'masses' ? (
          <div>
            <h2>Are there any Associated Features?</h2>
            <div
              className="radio-toolbar density"
              value={values.associated_findings_boolean}
              onChange={handleChange('masses')}
            >
              <input
                type="radio"
                id="radio1"
                name="associated_findings_boolean"
                value="yes"
              />
              <label htmlFor="radio1">Yes</label>

              <input
                type="radio"
                id="radio2"
                name="associated_findings_boolean"
                value="no"
              />
              <label htmlFor="radio2">No</label>
            </div>
          </div>
        ) : formData.classification == 'calcifications' && formData.associated_findings_boolean=='yes'?
        <Calcifications handleChange={handleChange} values={values} />: null
        ;
      case 4:
        return formData.classification == 'masses' &&
          formData.associated_findings_boolean == 'yes' ? (
          <AssociatedFeatures handleChange={handleChange} values={values} />
        ) : formData.classification == 'calcifications' && formData.associated_findings_boolean=='yes'?  <Distribution handleChange={handleChange} values={values} />:(
          <Location handleChange={handleChange} values={values} />
        );
      case 5:
        return formData.associated_features.Calcifications == true ? (
          <Calcifications handleChange={handleChange} values={values} />
        ) : (
          <Location handleChange={handleChange} values={values} />
        );
      case 6:
        return formData.associated_features.Calcifications == true ? (
          <Distribution handleChange={handleChange} values={values} />
        ) : null;
      case 7:
        return formData.distribution.length != 0 ? (
          <Location handleChange={handleChange} values={values} />
        ) : null;
      default:
        return 'unknown step';
    }
  }
  // function handleReport() {
  //   console.log('clicked handleChangeReport')
  //   handleChangeReport(formData);
  // }
  // const testing = () => {
  //   props.handleChangeReport(formData);
  // };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* <Stepper activeStep={activeStep}>
      {steps.map(label => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper> */}
      <div className={classes.button}>
        {activeStep === steps.length ? (
          <div style={{ marginTop: 60 }}>
            <Button
              onClick={updateCurrentFinding(activeFinding, formData)}
              className={classes.button}
            >
              Complete this Finding
            </Button>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <>
            {getStepsContent(activeStep)}
            <div
              className="testing123"
              style={{ marginTop: 60, textAlign: 'center' }}
            >
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              {values.findings == 'No' ? (
                <Button className={classes.button}>Go to next finding</Button>
              ) : (
                <Button className={classes.button} onClick={handleNext}>
                  {activeStep === steps.length ? 'Finish' : 'Next'}
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default ReacordFindings;
