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
import Classification from './FindingsQuestions/Classification';
import Location from './FindingsQuestions/Location';
import Distribution from './FindingsQuestions/Distribution';

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
    classification: false,
  },
  classification_details: {
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
      'masses_shape',
      'associated_features',
      'classification_details',
      'distribution',
    ];
  }

  const handleNext = () => {
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
      case 'distribution':
        setForm(formData => ({ ...formData, [input]: e.target.value }));

      case 'masses':
        setForm(formData => ({
          ...formData,
          masses: { ...formData.masses, [e.target.name]: e.target.value },
        }));

      case 'associated_features':
        setForm(formData => ({
          ...formData,
          associated_features: {
            ...formData.associated_features,
            [e.target.name]: e.target.checked,
          },
        }));
      case 'classification_details':
        setForm(formData => ({
          ...formData,
          classification_details: {
            ...formData.classification_details,
            [e.target.name]: e.target.value,
          },
        }));
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
    classification_details,
    distribution,
  } = formData;
  const values = {
    masses,
    associated_features,
    classification_details,
    distribution,
  };
  function getStepsContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <MassesShape handleChange={handleChange} values={values} />;
      case 1:
        return (
          <AssociatedFeatures handleChange={handleChange} values={values} />
        );
      case 2:
        return formData.associated_features.classification == true ? (
          <Classification handleChange={handleChange} values={values} />
        ) : (
          <Location handleChange={handleChange} values={values} />
        );
      case 3:
        return formData.associated_features.classification == true ? (
          <Distribution handleChange={handleChange} values={values} />
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
