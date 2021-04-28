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
import StepOne from './StepOne';
import FindingDetails from './FindingDetails';
import FindingDetailsNew from './FindingDetailsNew';

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
  findings_new: '',
};

const ReacordFindings = ({ updateCurrentFinding, activeFinding }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setForm] = useState(defaultData);

  useEffect(() => {
    console.log('child compo values', activeFinding);
  }, []);

  function getSteps() {
    return ['findings_new'];
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
    console.log('bottu clicked', input, e);
    e.persist();
    setForm(formData => ({ ...formData, [input]: e.target.value }));
  };
  const { findings_new } = formData;
  const values = {
    findings_new,
  };
  function getStepsContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <FindingDetailsNew handleChange={handleChange} values={values} />
        );
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
