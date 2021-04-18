import React, { useState } from 'react';
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

const useStyles = makeStyles({
  root: {
    width: '100%',
    margin: '6rem auto',
    border: '1px solid red',
  },
  button: {
    color: '#fff',
  },
});

export const QuestionRound = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { register, handleSubmit } = useForm();

  function getSteps() {
    return ['sign up', 'choose plan', 'checkout'];
  }

  const handleNext = () => {
    console.log('clicked');
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    console.log('this is active step', activeStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const steps = getSteps();

  function getStepsContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return 'Step One (sign Up)';
      case 1:
        return 'Step Two (choose plan)';
      case 2:
        return 'Step three (checkout)';
      default:
        return 'unknown step';
    }
  }
  const onSubmit = data => {
    console.log('data after form submit', data);
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className={classes.button}>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.button}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        )  : (
          <>
            {getStepsContent(activeStep)}
            <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
            <Button className={classes.button} onClick={handleNext}>
              {activeStep === steps.length ? 'Finish' : 'Next'}
            </Button>
          </>
        )}
      </div>
      {/* <form onSubmit= {handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor='username' id="usernameLabel">Username</label>
          <TextField
            className="form-control"
            type="text"
            name="username"
            {...register("username")}
            required
          />
          <div className="error" id="usernameError" />
        </div>
        <div className="form-group">
          <label htmlFor='password' id="passwordLabel">Password</label>
          <TextField
            className="form-control"
            type="password"
            name="password"

            {...register("password")}
            required
          />
          <div className="error" id="passwordError" />
        </div>
        <div className="form-group">
          <label htmlFor='passwordConfirm' id="passwordConfirmLabel">Confirm Password</label>
          <TextField
            className="form-control"
            type="password"
            name="passwordConfirm"

            {...register("confirmusername")}
            required
          />
          <div className="error" id="passwordConfirmError" />
        </div>
        <button type="submit" className="btn btn-primary">submit</button>
      </form> */}
    </div>
  );
};
// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Stepper from '@material-ui/core/Stepper';
// import Step from '@material-ui/core/Step';
// import StepLabel from '@material-ui/core/StepLabel';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//   },
//   button: {
//     marginRight: theme.spacing(1),
//   },
//   instructions: {
//     marginTop: theme.spacing(1),
//     marginBottom: theme.spacing(1),
//   },
// }));

// function getSteps() {
//   return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
// }

// function getStepContent(step) {
//   switch (step) {
//     case 0:
//       return 'Select campaign settings...';
//     case 1:
//       return 'What is an ad group anyways?';
//     case 2:
//       return 'This is the bit I really care about!';
//     default:
//       return 'Unknown step';
//   }
// }

// export const QuestionRound = ()=> {
//   const classes = useStyles();
//   const [activeStep, setActiveStep] = React.useState(0);
//   const [skipped, setSkipped] = React.useState(new Set());
//   const steps = getSteps();

//   const isStepOptional = (step) => {
//     return step === 1;
//   };

//   const isStepSkipped = (step) => {
//     return skipped.has(step);
//   };

//   const handleNext = () => {
//     let newSkipped = skipped;
//     if (isStepSkipped(activeStep)) {
//       newSkipped = new Set(newSkipped.values());
//       newSkipped.delete(activeStep);
//     }

//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     setSkipped(newSkipped);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleSkip = () => {
//     if (!isStepOptional(activeStep)) {
//       // You probably want to guard against something like this,
//       // it should never occur unless someone's actively trying to break something.
//       throw new Error("You can't skip a step that isn't optional.");
//     }

//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     setSkipped((prevSkipped) => {
//       const newSkipped = new Set(prevSkipped.values());
//       newSkipped.add(activeStep);
//       return newSkipped;
//     });
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//   };

//   return (
//     <div className={classes.root}>
//       <Stepper activeStep={activeStep}>
//         {steps.map((label, index) => {
//           const stepProps = {};
//           const labelProps = {};
//           if (isStepOptional(index)) {
//             labelProps.optional = <Typography variant="caption">Optional</Typography>;
//           }
//           if (isStepSkipped(index)) {
//             stepProps.completed = false;
//           }
//           return (
//             <Step key={label} {...stepProps}>
//               <StepLabel {...labelProps}>{label}</StepLabel>
//             </Step>
//           );
//         })}
//       </Stepper>
//       <div>
//         {activeStep === steps.length ? (
//           <div>
//             <Typography className={classes.instructions}>
//               All steps completed - you&apos;re finished
//             </Typography>
//             <Button onClick={handleReset} className={classes.button}>
//               Reset
//             </Button>
//           </div>
//         ) : (
//           <div>
//             <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
//             <div>
//               <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
//                 Back
//               </Button>
//               {isStepOptional(activeStep) && (
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={handleSkip}
//                   className={classes.button}
//                 >
//                   Skip
//                 </Button>
//               )}

//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleNext}
//                 className={classes.button}
//               >
//                 {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
