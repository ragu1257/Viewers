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

const TotalFindings = ({ handleChange, values }) => {
  const style = useStyles();
  // console.log('this is step 1', values);
  return (
    <div className={style.button}>

      <div
        className="radio-toolbar density"
        value={values.total_findings}
        onChange={handleChange('total_findings')}
      >
        <input type="radio" id="radio1" name="total_findings" value="1" />
        <label htmlFor="radio1">1</label>

        <input type="radio" id="radio2" name="total_findings" value="2" />
        <label htmlFor="radio2">2</label>
        <input type="radio" id="radio3" name="total_findings" value="3" />
        <label htmlFor="radio3">3</label>

        <input type="radio" id="radio4" name="total_findings" value="4" />
        <label htmlFor="radio4">4</label>
      </div>
    </div>
  );
};

export default TotalFindings;
