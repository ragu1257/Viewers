import React from 'react';
import {
  Stepper,
  Step,
  TextField,
  StepLabel,
  Typography,
  Button,
} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';
import './Stepper.css';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    margin: '6rem auto',
    border: '1px solid #333',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  button: {
    // color: '#fff',
  },
}));

const StepOne = ({ handleChange, values }) => {
  const style = useStyles();
  // console.log('this is step 1', values);
  return (
    <div className={style.button}>
      {/* <TextField
        hinText="Enter your first name"
        onChange={handleChange('firstName')}
        defaultValue={values.firstName}
      />
      <TextField
        hinText="Enter your lastName name"
        onChange={handleChange('lastName')}
        defaultValue={values.lastName}
      />
      <FormControl className={style.formControl}>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={values.age ? values.age : ''}
          onChange={handleChange('age')}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl> */}
      {/* <FormControl component="fieldset">
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender"
          value={values.gender}
          onChange={handleChange('gender')}
        > */}
      {/* <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
      <p>Are there any findings?</p>
      <div
        className="radio-toolbar"
        value={values.findings}
        onChange={handleChange('findings')}
      >
        <input type="radio" id="radio1" name="radios" value="Yes" />
        <label htmlFor="radio1">Yes</label>

        <input type="radio" id="radio2" name="radios" value="No" />
        <label htmlFor="radio2">No</label>
      </div>
      {/* </RadioGroup>
      </FormControl> */}
    </div>
  );
};

export default StepOne;
