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

const Classification = ({ handleChange, values }) => {
  const style = useStyles();
  // console.log('this is step 1', values);
  return (
    <div className={style.button}>
      <p style={{ marginTop: 60 }}>Typical Benign</p>
      <div
        className="radio-toolbar density"
        value={values.classification_details.typically_benign}
        onChange={handleChange('classification_details')}
      >
        <input type="radio" id="radio1" name="typically_benign" value="skin" />
        <label htmlFor="radio1">skin</label>
        <input type="radio" id="radio2" name="typically_benign" value="vascular" />
        <label htmlFor="radio2">vascular</label>
        <input type="radio" id="radio3" name="typically_benign" value="pop_corn_like" />
        <label htmlFor="radio3">pop-corn like</label>
        <input type="radio" id="radio4" name="typically_benign" value="large_rod_like" />
        <label htmlFor="radio4">large rod like</label>
        <input type="radio" id="radio5" name="typically_benign" value="round" />
        <label htmlFor="radio5">round</label>
        <input type="radio" id="radio6" name="typically_benign" value="rim" />
        <label htmlFor="radio6">rim</label>
        <input type="radio" id="radio7" name="typically_benign" value="dystrophic" />
        <label htmlFor="radio7">dystrophic</label>
        <input type="radio" id="radio8" name="typically_benign" value="milk_of_calcium" />
        <label htmlFor="radio8">milk of calcium</label>
        <input type="radio" id="radio9" name="typically_benign" value="suture" />
        <label htmlFor="radio9">suture</label>
      </div>

      <p style={{ marginTop: 60 }}>Suspicious</p>
      <div
        className="radio-toolbar density"
        value={values.classification_details.suspicious}
        onChange={handleChange('classification_details')}
      >
        <input type="radio" id="radio10" name="suspicious" value="amorphous" />
        <label htmlFor="radio10">amorphous</label>
        <input type="radio" id="radio11" name="suspicious" value="coarse_heterogenous" />
        <label htmlFor="radio11">coarse_heterogenous</label>
        <input type="radio" id="radio12" name="suspicious" value="fine_pleomorphic" />
        <label htmlFor="radio12">fine pleomorphic</label>
        <input type="radio" id="radio13" name="suspicious" value="fine_linear" />
        <label htmlFor="radio13">Fine linear or fine linear branching</label>
      </div>
    </div>
  );
};

export default Classification;
