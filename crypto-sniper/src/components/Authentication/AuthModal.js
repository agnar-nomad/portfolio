import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { AppBar, Box, Button, Tab, Tabs } from '@material-ui/core';
import Login from './Login';
import Signup from './Signup';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { CryptoState } from '../../CryptoContext';
import { myAccentColor } from '../../config/helpers';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    width: 400,
    color: 'white',
    borderRadius: 10,
  },
  tabsContainer: {
    backgroundColor: 'transparent',
    color: 'white',
  },
  loginButton: {
    width: 85,
    height: 40,
    backgroundColor: myAccentColor,
  },
  google: {
    padding: 24,
    paddingTop: 0,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
    gap: 20,
    fontSize: 20,
  },
}));

export default function AuthModal() {
  const { setAlert } = CryptoState();

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = function () {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setAlert({
          open: true,
          message: `Sign In successful! Welcome ${result.user.email}!`,
          type: 'success',
        });

        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: 'error',
        });
        return;
      });
  };

  return (
    <div>
      <Button
        variant="contained"
        className={classes.loginButton}
        onClick={handleOpen}>
        Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <div className={classes.paper}>
            <AppBar position="static" className={classes.tabsContainer}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
                variant="fullWidth"
                style={{ borderRadius: 10 }}>
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
            </AppBar>
            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <Signup handleClose={handleClose} />}

            <Box className={classes.google}>
              <span>OR</span>
              <GoogleButton
                style={{ width: '100%', outline: 'none' }}
                onClick={signInWithGoogle}></GoogleButton>
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
