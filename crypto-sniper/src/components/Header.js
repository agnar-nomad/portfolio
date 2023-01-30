import React from 'react';
import {
  AppBar,
  Container,
  createTheme,
  makeStyles,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import AuthModal from './Authentication/AuthModal';
import UserSidebar from './Authentication/UserSidebar';
import { myAccentColor } from '../config/helpers';

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: myAccentColor,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  selectField: {
    width: 90,
    height: 40,
    marginRight: 15,
  },
}));

const Header = () => {
  const classes = useStyles();

  const history = useHistory();

  const { currency, setCurrency, user } = CryptoState();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      type: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={() => history.push('/')}
              className={classes.title}
              variant="h6">
              Crypto Sniper
            </Typography>
            <Select
              variant="outlined"
              className={classes.selectField}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}>
              <MenuItem value={'USD'}>USD</MenuItem>
              <MenuItem value={'CZK'}>CZK</MenuItem>
              <MenuItem value={'EUR'}>EUR</MenuItem>
              <MenuItem value={'GBP'}>GBP</MenuItem>
            </Select>
            {user ? <UserSidebar /> : <AuthModal />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
