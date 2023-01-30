import { Box, Button, TextField } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { CryptoState } from '../../CryptoContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { myAccentColor } from '../../config/helpers';

const Signup = ({ handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { setAlert } = CryptoState();

  const handleSubmit = async function () {
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: 'Passwords do not match',
        type: 'error',
      });
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      setAlert({
        open: true,
        message: `Sign Up successful. Welcome, ${result.user.email}`,
        type: 'success',
      });

      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error',
      });
      return;
    }
  };

  return (
    <Box
      p={3}
      style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <TextField
        variant="outlined"
        type="email"
        label="Enter e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth></TextField>
      <TextField
        variant="outlined"
        label="Enter password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth></TextField>
      <TextField
        variant="outlined"
        label="Confirm password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth></TextField>
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: myAccentColor }}
        onClick={handleSubmit}>
        Sign Up
      </Button>
    </Box>
  );
};

export default Signup;
