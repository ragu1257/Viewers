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

const Classification = ({ handleChange, values }) => {
  const style = useStyles();
  // console.log('this is step 1', values);
  return (
    <div className={style.button}>
      <div
        className="radio-toolbar density"
        value={values.classification}
        onChange={handleChange('classification')}
      >
        <input type="radio" id="radio1" name="classification" value="masses" />
        <label htmlFor="radio1">Masses</label>

        <input
          type="radio"
          id="radio2"
          name="classification"
          value="calcifications"
        />
        <label htmlFor="radio2">Calcifications</label>
        <input
          type="radio"
          id="radio3"
          name="classification"
          value="architectural_distortion"
        />
        <label htmlFor="radio3">Architectural Distortion</label>

        <input
          type="radio"
          id="radio4"
          name="classification"
          value="asymmetries"
        />
        <label htmlFor="radio4">Asymmetries</label>
        <input
          type="radio"
          id="radio5"
          name="classification"
          value="intramsmmsry_lymph_node"
        />
        <label htmlFor="radio5">Intramsmmsry lymph node</label>

        <input
          type="radio"
          id="radio6"
          name="classification"
          value="skin_lesion"
        />
        <label htmlFor="radio6">Skin lesion</label>
        <input
          type="radio"
          id="radio7"
          name="classification"
          value="solitary_dilated_duct"
        />
        <label htmlFor="radio7">Solitary dilated duct</label>

        <input
          type="radio"
          id="radio8"
          name="classification"
          value="associated_features"
        />
        <label htmlFor="radio8">Associated features</label>
      </div>
    </div>
  );
};

export default Classification;
