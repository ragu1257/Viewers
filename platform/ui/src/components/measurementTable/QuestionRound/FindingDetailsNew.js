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

const FindingDetailsNew = ({ handleChange, values }) => {
  const style = useStyles();
  // console.log('this is step 1', values);
  return (
    <div className={style.button}>


      <p style={{ marginTop: 60 }}>Breast Density</p>
      <div
        className="radio-toolbar density"
        value={values.findings_new}
        onChange={handleChange('findings_new')}
      >
        <input type="radio" id="radio1" name="findings_new" value="A" />
        <label htmlFor="radio1">A</label>

        <input type="radio" id="radio2" name="findings_new" value="B" />
        <label htmlFor="radio2">B</label>
        <input type="radio" id="radio3" name="findings_new" value="C" />
        <label htmlFor="radio3">C</label>

        <input type="radio" id="radio4" name="findings_new" value="D" />
        <label htmlFor="radio4">D</label>
      </div>
    </div>
  );
};

export default FindingDetailsNew;
