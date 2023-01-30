import { makeStyles } from '@material-ui/core';
import React from 'react';
import { myAccentColor } from '../config/helpers';

const SelectButton = ({ children, selected, onClick }) => {
  const useStyles = makeStyles((theme) => ({
    selectButton: {
      border: `1px solid ${myAccentColor}`,
      borderRadius: 5,
      padding: 10,
      fontFamily: 'Montserrat',
      cursor: 'pointer',
      backgroundColor: selected ? myAccentColor : '',
      color: selected ? 'black' : '',
      fontWeight: selected ? 700 : 500,
      '&:hover': {
        backgroundColor: myAccentColor,
        color: 'black',
      },
      width: '22%',
      margin: 5,
    },
  }));

  const classes = useStyles();

  return (
    <span className={classes.selectButton} onClick={onClick}>
      {children}
    </span>
  );
};

export default SelectButton;
