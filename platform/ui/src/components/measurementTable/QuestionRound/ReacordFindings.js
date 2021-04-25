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
  findings: '',
  age: '',
  breast_density: '',
  picture_quality: '',
  total_findings: null,
};

const ReacordFindings = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setForm] = useState(defaultData);

  function getSteps() {
    return [
      'findings',
      'age',
      'nipple_position',
      'pictorial_muscle',
      'total_findings',
      'ReacordFindings',
    ];
  }

  const handleNext = () => {
    console.log('clicked');
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    console.log('this is active step', activeStep);
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
  const {
    findings,
    age,
    breast_density,
    picture_quality,
    total_findings,
  } = formData;
  const values = {
    findings,
    age,
    breast_density,
    picture_quality,
    total_findings,
  };
  function getStepsContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <StepOne handleChange={handleChange} values={values} />;
      case 1:
        return values.findings == 'No' ? null : (
          <FindingDetails handleChange={handleChange} values={values} />
        );
      case 2:
        return (
          <div>
            <h2>Nipple position</h2>
            <p>Please Define for all the 4 images</p>
          </div>
        );
      case 3:
        return (
          <div>
            <h2>Pictorial Muscle</h2>
            <p>Please Draw a Line</p>
          </div>
        );
      case 4:
        return (
          <div>
            <p>How many findings?</p>
            <TextField
              style={{ margin: 20 }}
              hintext="total_findings"
              label="Total Findings"
              onChange={handleChange('total_findings')}
              defaultValue={values.total_findings}
            />
          </div>
        );
      case 5:
        return parseInt(values.total_findings) > 0 ? <ReacordFindings /> : null;
      default:
        return 'unknown step';
    }
  }
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
            <Typography className={classes.button}>
              All steps completed - you&apos;re finished
            </Typography>
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
              {values.findings == 'No' ||
              parseInt(values.total_findings) == 0 ? (
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
