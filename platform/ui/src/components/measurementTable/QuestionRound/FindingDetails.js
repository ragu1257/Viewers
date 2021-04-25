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
      <TextField
        style={{ margin: 20 }}
        hintext="Age"
        label="Age"
        onChange={handleChange('age')}
        defaultValue={values.age}
      />

      <p style={{ marginTop: 60 }}>Breast Density</p>
      <div
        className="radio-toolbar density"
        value={values.breast_density}
        onChange={handleChange('breast_density')}
      >
        <input type="radio" id="radio1" name="breast_density" value="A" />
        <label htmlFor="radio1">A</label>

        <input type="radio" id="radio2" name="breast_density" value="B" />
        <label htmlFor="radio2">B</label>
        <input type="radio" id="radio3" name="breast_density" value="C" />
        <label htmlFor="radio3">C</label>

        <input type="radio" id="radio4" name="breast_density" value="D" />
        <label htmlFor="radio4">D</label>
      </div>

      <p style={{ marginTop: 60 }}>Picture Quality</p>
      <div
        className="radio-toolbar quality"
        value={values.picture_quality}
        onChange={handleChange('picture_quality')}
      >
        <input type="radio" id="radio5" name="picture_quality" value="P" />
        <label htmlFor="radio5">P</label>

        <input type="radio" id="radio6" name="picture_quality" value="M" />
        <label htmlFor="radio6">M</label>
        <input type="radio" id="radio7" name="picture_quality" value="G" />
        <label htmlFor="radio7">G</label>

        <input type="radio" id="radio8" name="picture_quality" value="I" />
        <label htmlFor="radio8">I</label>
      </div>
    </div>
  );
};

export default StepOne;
