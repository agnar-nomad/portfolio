import { Box, Button, TextField } from '@material-ui/core';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { myAccentColor } from '../../config/helpers';
import { CryptoState } from '../../CryptoContext';
import { auth } from '../../firebase';

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setAlert } = CryptoState();

  const handleSubmit = async function () {
    if (!email || !password) {
      setAlert({
        open: true,
        message: 'Please fill in all fields',
        type: 'error',
      });
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      setAlert({
        open: true,
        message: `Login successful. Welcome, ${result.user.email}`,
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
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: myAccentColor }}
        onClick={handleSubmit}>
        Log In
      </Button>
    </Box>
  );
};

export default Login;
