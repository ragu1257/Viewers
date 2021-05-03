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

const AsymmetriesTwoView = ({ handleChange, values }) => {
  const style = useStyles();
  // console.log('this is step 1', values);
  return (
    <div className={style.button}>
      <p style={{ marginTop: 60 }}>in 2 Views</p>
      <div
        className="radio-toolbar density"
        value={values.asymmetries.quadrant}
        onChange={handleChange('asymmetries')}
      >
        <input type="radio" id="radio1" name="quadrant" value="global" />
        <label htmlFor="radio1"> &gt;quadrant </label>

        <input type="radio" id="radio2" name="quadrant" value="focal" />
        <label htmlFor="radio2">&#60;quadrant</label>

      </div>
    </div>
  );
};

export default AsymmetriesTwoView;
