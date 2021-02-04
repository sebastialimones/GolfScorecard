import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiFormControlLabel-root': {
      maxWidth: '0px',
    },
    '& .MuiFormGroup-root': {
      flexWrap:'revert',
    },
  },
}));

export const RadioButtonsGroup = ({ strokesPerHole, disabled }) => {
  const [value, setValue] = useState('');
  const classes = useStyles();

  const handleChange = (event) => {
    setValue(event.target.value);
    strokesPerHole(event.target.value)
  };

  return (
    <FormControl component="fieldset" disabled={ disabled } className={classes.root}>
      <RadioGroup value={value} onChange={ handleChange } row>
        <FormControlLabel 
          label="0"
          labelPlacement="top"
          value="0" 
          control={<Radio />} 
        />
        <FormControlLabel
          label="1"
          labelPlacement="top"
          value="1" 
          control={<Radio />} 
        />
        <FormControlLabel 
          label="2"
          labelPlacement="top"
          value="2" 
          control={<Radio />} 
        />
      </RadioGroup>
    </FormControl>
  );
};
