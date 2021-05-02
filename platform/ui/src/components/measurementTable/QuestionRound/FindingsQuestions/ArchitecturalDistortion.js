import React from 'react'
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

const ArchitecturalDistortion = ({handleChange, values}) => {
  const style = useStyles();
  return (
    <div className={style.button}>
      <p style={{ marginTop: 60 }}>Architectural Distortion</p>
      <div
        className="radio-toolbar density"
        value={values.architectural_distortion}
        onChange={handleChange('architectural_distortion')}
      >
        <input type="radio" id="radio1" name="architectural_distortion" value="standalone" />
        <label htmlFor="radio1">standalone</label>

        <input type="radio" id="radio2" name="architectural_distortion" value="associated_feature" />
        <label htmlFor="radio2">Associated Feature</label>
      </div>
    </div>
  );
}

export default ArchitecturalDistortion;
