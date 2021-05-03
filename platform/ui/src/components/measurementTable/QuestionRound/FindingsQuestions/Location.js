import React, { useState } from 'react';
import TimeKeeper from 'react-timekeeper';
import './FindingsQuestions.css';
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

const Location = ({ handleChange, values, handleClock }) => {
  const [time, setTime] = useState(values.location.clockface);
  const style = useStyles();

  function handleChangee(e) {
    console.log('this is handle chanfeg', e, e.hour12);
  }

  return (
    <div className={style.button}>
      <p>Side</p>
      <div
        className="radio-toolbar density"
        value={values.location.side}
        onChange={handleChange('location')}
      >
        <input type="radio" id="radio1" name="side" value="left" />
        <label htmlFor="radio1">Left</label>

        <input type="radio" id="radio2" name="side" value="right" />
        <label htmlFor="radio2">Right</label>
      </div>

      <p>Quadrant</p>
      <div
        className="radio-toolbar density"
        value={values.location.quadrant}
        onChange={handleChange('location')}
      >
        <input type="radio" id="radio3" name="quadrant" value="anterior" />
        <label htmlFor="radio3">Anterior</label>

        <input type="radio" id="radio4" name="quadrant" value="middle" />
        <label htmlFor="radio4">Middle</label>
        <input type="radio" id="radio5" name="quadrant" value="posterior" />
        <label htmlFor="radio5">Posterior</label>
      </div>

      <div>
        <p>ClockFace</p>
        <TimeKeeper time={time} name="clockface" onChange={handleClock} />
      </div>
    </div>
  );
};

export default Location;
