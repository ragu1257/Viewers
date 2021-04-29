import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import './FindingsQuestions.css'

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const AssociatedFeatures = ({ handleChange, values }) => {
  // const [state, setState] = React.useState({ });

  // const handleChange = (event) => {
  //   setState({ ...state, [event.target.name]: event.target.checked });
  // };

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={values.associated_features.skin_reaction}
            onChange={handleChange('associated_features')}
            name="skin_reaction"
            color="primary"
          />
        }
        label="Skin Reaction"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={values.associated_features.nipple_retraction}
            onChange={handleChange('associated_features')}
            name="nipple_retraction"
            color="primary"
          />
        }
        label="Nipple Retraction"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={values.associated_features.skin_thickening}
            onChange={handleChange('associated_features')}
            name="skin_thickening"
            color="primary"
          />
        }
        label="Skin Thickening"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={values.associated_features.axillary_adenopathy}
            onChange={handleChange('associated_features')}
            name="axillary_adenopathy"
            color="primary"
          />
        }
        label="Axillary Adenopathy"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={values.associated_features.architectural_distortion}
            onChange={handleChange('associated_features')}
            name="architectural_distortion"
            color="primary"
          />
        }
        label="Architectural Distortion"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={values.associated_features.classification}
            onChange={handleChange('associated_features')}
            name="classification"
            color="primary"
          />
        }
        label="Classification"
      />
    </FormGroup>
  );
};

export default AssociatedFeatures;
