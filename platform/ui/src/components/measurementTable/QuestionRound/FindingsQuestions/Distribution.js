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

const Distribution = ({ handleChange, values }) => {
  const style = useStyles();
  // console.log('this is step 1', values);
  return (
    <div className={style.button}>
      <p style={{ marginTop: 60 }}>Distribution</p>
      <div
        className="radio-toolbar density"
        value={values.distribution}
        onChange={handleChange('distribution')}
      >
        <input type="radio" id="radio1" name="distribution" value="diffuse" />
        <label htmlFor="radio1">diffuse</label>

        <input type="radio" id="radio2" name="distribution" value="grouped" />
        <label htmlFor="radio2">grouped</label>
        <input type="radio" id="radio3" name="distribution" value="regional" />
        <label htmlFor="radio3">regional</label>

        <input type="radio" id="radio4" name="distribution" value="linear" />
        <label htmlFor="radio4">linear</label>
        <input type="radio" id="radio5" name="distribution" value="segmental" />
        <label htmlFor="radio5">segmental</label>
      </div>
    </div>
  );
};

export default Distribution;
