import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { CryptoState } from '../../CryptoContext';
import { Avatar } from '@material-ui/core';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { myAccentColor, numberWithCommas } from '../../config/helpers';
import { AiFillDelete } from 'react-icons/ai';
import { doc, setDoc } from 'firebase/firestore';

const useStyles = makeStyles({
  container: {
    width: 350,
    padding: 25,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'monospace',
  },
  avatar: {
    height: 38,
    width: 38,
    cursor: 'pointer',
    backgroundColor: myAccentColor,
  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    gap: '20px',
    height: '92%',
  },
  picture: {
    width: 100,
    heigt: 100,
    cursor: 'pointer',
    backgroundColor: myAccentColor,
    objectFit: 'contain',
  },
  userName: {
    width: '100%',
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bolder',
    wordWrap: 'break-word',
  },
  logout: {
    height: '8%',
    width: '100%',
    marginTop: 20,
    backgroundColor: myAccentColor,
    fontWeight: 'bold',
  },
  watchlist: {
    flex: 1,
    width: '100%',
    backgroundColor: 'grey',
    borderRadius: 10,
    padding: 15,
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    overflowY: 'scroll',
  },
  watchlistTitle: {
    fontSize: 15,
    textShadow: '0 0 5px black',
  },
  coin: {
    padding: 10,
    borderRadius: 5,
    color: 'black',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: myAccentColor,
    boxShadow: '0 0 3px black',
  },
});

export default function UserSidebar() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const { user, setAlert, watchlist, coins, symbol } = CryptoState();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const removeFromWatchlist = async function (coin) {
    const coinRef = doc(db, 'watchlist', user.uid);

    try {
      await setDoc(
        coinRef,
        {
          coins: watchlist.filter((watch) => watch !== coin?.id),
        },
        { merge: 'true' }
      );

      setAlert({
        open: true,
        message: `${coin.name} removed from the Watchlist!`,
        type: 'success',
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error',
      });
    }
  };

  const logOut = function () {
    signOut(auth);

    setAlert({ open: true, type: 'success', message: 'Logout successful.' });

    toggleDrawer();
  };

  return (
    <div>
      <React.Fragment key={'right'}>
        <Avatar
          onClick={toggleDrawer('right', true)}
          className={classes.avatar}
          src={user.photoURL}
          alt={user.displayName || user.email}
        />
        <Drawer
          anchor={'right'}
          open={state['right']}
          onClose={toggleDrawer('right', false)}>
          <div className={classes.container}>
            <div className={classes.profile}>
              <Avatar
                className={classes.picture}
                src={user.photoURL}
                alt={user.displayName || user.email}
              />
              <span className={classes.userName}>
                {user.displayName || user.email}
              </span>
              <div className={classes.watchlist}>
                <span className={classes.watchlistTitle}>Watchlist</span>

                {coins.map((coin) => {
                  if (watchlist.includes(coin.id))
                    return (
                      <div className={classes.coin} key={coin.id}>
                        <span>{coin.name}</span>
                        <span style={{ display: 'flex', gap: 8 }}>
                          {symbol}
                          {numberWithCommas(coin.current_price.toFixed(2))}
                          <AiFillDelete
                            style={{ cursor: 'pointer' }}
                            fontSize="16"
                            onClick={() => removeFromWatchlist(coin)}
                          />
                        </span>
                      </div>
                    );
                  return null;
                })}
              </div>
            </div>
            <Button
              variant="contained"
              className={classes.logout}
              onClick={logOut}>
              Log Out
            </Button>
          </div>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
