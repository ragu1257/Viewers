import React from 'react';
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

const Asymmetries = ({ handleChange, values }) => {
  const style = useStyles();
  console.log('these are values', values);
  return (
    <div className={style.button}>
      <p style={{ marginTop: 60 }}>Asymmetries</p>
      <div
        className="radio-toolbar density"
        value={values.asymmetries.view}
        onChange={handleChange('asymmetries')}
      >
        <input
          type="radio"
          id="radio1"
          name="view"
          value="two_views"
        />
        <label htmlFor="radio1">in 2 Views</label>

        <input
          type="radio"
          id="radio2"
          name="view"
          value="one_view"
        />
        <label htmlFor="radio2">only in 1 view</label>

        <input
          type="radio"
          id="radio3"
          name="view"
          value="developing_asymmetry"
        />
        <label htmlFor="radio3">Developing Asymmetry</label>
      </div>
    </div>
  );
};

export default Asymmetries;
