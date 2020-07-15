import React from 'react';
import { useField } from 'formik';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    background: 'white',
    borderRadius: 4,
  },
  input: {
    color: theme.palette.primary.main
  }
}));

function MyTextField({ ...props }) {
  const classes = useStyles();
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      variant="outlined"
      margin="dense"
      // label={label}
      {...field}
      {...props}
      onChange={e => {
        field.onChange(e);
        if (props.onChange) {
          props.onChange(e);
        }
      }}
      helperText={errorText || props.helperText}
      error={errorText ? true : false}
    />
  );
}

export default MyTextField;
