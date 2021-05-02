import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import FindingDetails from './FindingDetails';
import ReacordFindings from './ReacordFindings';
// import { useForm, useStep } from "react-hooks-helper";
import {
  Stepper,
  Step,
  TextField,
  StepLabel,
  Typography,
  Button,
} from '@material-ui/core';
import StepOne from './StepOne';
import FindingsTabs from './FindingsTabs';
import TotalFindings from './TotalFindings';

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
  findingsArray: [],
};

export const QuestionRound = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { register, handleSubmit } = useForm();
  const [disableButton, setDisableButton] = useState(false);
  const [formData, setForm] = useState(defaultData);
  const [showComponent, setshowComponent] = useState(0);
  const [showComponentBool, setshowComponentBool] = useState(true);
  const [activeFinding, setactiveFinding] = useState();
  const [name, setname] = useState('');

  const props = { formData, setForm };

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

  const handleNext = async () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // const steps = getSteps();
  const steps = [
    'age',
    'nipple_position',
    'pictorial_muscle',
    'findings',
    'total_findings',
    'FindingsTabs',
    ReacordFindings,
  ];

  const handleChange = input => e => {
    console.log('bottu clicked', input, e);
    e.persist();
    setForm(formData => ({ ...formData, [input]: e.target.value }));
  };
  const handleChangeReport = input => e => {
    console.log('this is handleChangeReport ', input, e);
    setactiveFinding(input);
    setActiveStep(6);
    // getStepsContent(5)
    // setshowComponentBool(false);
    // setshowComponentBool(true);

    // handleNext();
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

  function addSteps() {
    for (let i = 0; i < parseInt(values.total_findings); i++) {
      steps.push('findings' + i);
    }
    console.log('total steps now', steps);
  }

  const updateCurrentFinding = (active, data) => e => {
    console.log('updateCurrentFinding', active, data, e);
    let finding = {};
    finding['finding' + active] = data;
    defaultData.findingsArray.push(finding);
    setActiveStep(5);
  };

  function getStepsContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return values.findings == 'No' ? null : (
          <FindingDetails handleChange={handleChange} values={values} />
        );
      case 1:
        return (
          <div>
            <h2>Nipple position</h2>
            <p>Please Define for all the 4 images</p>
          </div>
        );
      case 2:
        return (
          <div>
            <h2>Pictorial Muscle</h2>
            <p>Please Draw a Line</p>
          </div>
        );
      case 3:
        return <StepOne handleChange={handleChange} values={values} />;
      case 4:
        return (
          <div>
            <p>How many findings?</p>
            <TotalFindings handleChange={handleChange} values={values} />
            {/* <TextField
              style={{ margin: 20 }}
              hintext="total_findings"
              label="Total Findings"
              onChange={handleChange('total_findings')}
              defaultValue={values.total_findings}
            /> */}
          </div>
        );
      case 5:
        if (parseInt(values.total_findings) > 0) {
          // let sampleArray = [];
          // async function countSet(){
          //   for (let i = 0; i < parseInt(values.total_findings); i++) {
          //    await sampleArray.push({ finding: {} });
          //     // setForm({ ...setForm, length:7 });
          //   }
          // }

          // countSet()
          // console.log('thisis sam[ple aray', sampleArray);
          // setForm(formData => ({ ...formData, sampleArray }));
          return (
            <FindingsTabs
              handleChangeReport={handleChangeReport}
              total_findings={parseInt(values.total_findings)}
            />
          );
          // }
        } else {
          return null;
        }
      case 6:
        return (
          <ReacordFindings
            updateCurrentFinding={updateCurrentFinding}
            activeFinding={activeFinding}
          />
        );
      default:
        return 'unknown step';
    }
  }

  const onSubmit = data => {
    console.log('data after form submit', data);
  };
  const classes = useStyles();

  useEffect(() => {
    // Update the document title using the browser API
    console.log(
      'this is useEFfect',
      formData,
      parseInt(formData.total_findings)
    );
  }, [formData, activeStep]);
  console.log('this is updated formdata', formData);
  return (
    <div className={classes.root}>
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

            {disableButton ? null : (
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
                  <Button className={classes.button}>Go to next study</Button>
                ) : (
                  <Button className={classes.button} onClick={handleNext}>
                    {activeStep === steps.length ? 'Finish' : 'Next'}
                  </Button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
