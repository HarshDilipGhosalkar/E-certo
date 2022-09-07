import React from "react";
import { Button, MenuItem, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));
export const renderText = ({ type, label, color, ...rest }) => (
  <Typography variant={type} color={color} {...rest}>
    {label}
  </Typography>
);

export const renderInputField = ({ name, label, type, state, onChange }) => {
  const classes = useStyles();

  const { data, errors } = state;
  return (
    <TextField
      required
      label={label}
      type={type ? type : "text"}
      variant='outlined'
      color='primary'
      size='small'
      fullWidth={true}
      name={name}
      value={data[name]}
      error={errors[name] ? true : false}
      helperText={errors[name] ? errors[name] : ""}
      onChange={onChange}
    />
    
  );
};
export const renderDateField = ({ name, label, type, state, onChange }) => {
  const classes = useStyles();

  const { data, errors } = state;
  return (
    // <TextField
    //   required
    //   label={label}
    //   type={type ? type : "text"}
    //   variant='outlined'
    //   color='primary'
    //   size='small'
    //   fullWidth={true}
    //   name={name}
    //   value={data[name]}
    //   error={errors[name] ? true : false}
    //   helperText={errors[name] ? errors[name] : ""}
    //   onChange={onChange}
    // />
    <TextField
          required
          id="outlined-full-width"
          label={label}
          type={type ? type : "text"}
          style={{ margin: 0 }}
          size='small'
          name={name}
          value={data[name]}
          error={errors[name] ? true : false}
          placeholder={name}
          helperText={errors[name] ? errors[name] : ""}
          onChange={onChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
  );
};
export const renderSelect = ({ name, label, options, state, onChange }) => {
  const { data, errors } = state;
  return (
    <TextField
      required
      select
      label={label}
      variant='outlined'
      color='primary'
      size='small'
      fullWidth={true}
      name={name}
      value={data[name]}
      error={errors[name] ? true : false}
      helperText={errors[name] ? errors[name] : ""}
      onChange={onChange}>
      {options.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.key}
        </MenuItem>
      ))}
    </TextField>
  );
};

export const renderButton = ({ label, variant, color, fullWidth, onClick }) => (
  <Button 
    type="submit"
    variant={variant ? variant : "outlined"}
    color={color ? color : "primary"}
    fullWidth={fullWidth ? fullWidth : false}
    onClick={onClick}>
    {label}
  </Button>
);
