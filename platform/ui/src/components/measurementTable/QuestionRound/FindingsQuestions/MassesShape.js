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
import '../Stepper.css';

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

const MassesShape = ({ handleChange, values }) => {
  const style = useStyles();
  // console.log('this is step 1', values);
  return (
    <div className={style.button}>
      <p style={{ marginTop: 60 }}>Shape</p>
      <div
        className="radio-toolbar density"
        value={values.masses.shape}
        onChange={handleChange('masses')}
      >
        <input type="radio" id="radio1" name="shape" value="round" />
        <label htmlFor="radio1">round</label>

        <input type="radio" id="radio2" name="shape" value="oval" />
        <label htmlFor="radio2">oval</label>
        <input type="radio" id="radio3" name="shape" value="irregular" />
        <label htmlFor="radio3">irregular</label>
      </div>

      <p style={{ marginTop: 60 }}>Margine</p>
      <div
        className="radio-toolbar density"
        value={values.masses.margine}
        onChange={handleChange('masses')}
      >
        <input
          type="radio"
          id="margine1"
          name="margine"
          value="circumscribed"
        />
        <label htmlFor="margine1">circumscribed</label>

        <input type="radio" id="margine2" name="margine" value="obscured" />
        <label htmlFor="margine2">obscured</label>
        <input
          type="radio"
          id="margine3"
          name="margine"
          value="microlobulated"
        />
        <label htmlFor="margine3">microlobulated</label>

        <input type="radio" id="margine4" name="margine" value="indistinct" />
        <label htmlFor="margine4">indistinct</label>
        <input type="radio" id="margine5" name="margine" value="spiculated" />
        <label htmlFor="margine5">spiculated</label>
      </div>

      <p style={{ marginTop: 60 }}>Density</p>
      <div
        className="radio-toolbar density"
        value={values.masses.density}
        onChange={handleChange('masses')}
      >
        <input
          type="radio"
          id="density1"
          name="density"
          value="fat_containing"
        />
        <label htmlFor="density1">Fat Containing</label>

        <input type="radio" id="density2" name="density" value="low" />
        <label htmlFor="density2">low</label>
        <input type="radio" id="density3" name="density" value="equal" />
        <label htmlFor="density3">equal</label>
        <input type="radio" id="density4" name="density" value="hign" />
        <label htmlFor="density4">hign</label>
      </div>
    </div>
  );
};

export default MassesShape;
