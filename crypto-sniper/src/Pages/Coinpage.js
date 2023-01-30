import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SingleCoin } from '../config/api';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import {
  Button,
  LinearProgress,
  makeStyles,
  Typography,
} from '@material-ui/core';
import CoinInfo from '../components/CoinInfo';
import { myAccentColor, numberWithCommas } from '../config/helpers.js';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase.js';

const Coinpage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol, user, watchlist, setAlert } = CryptoState();

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const fetchSingleCoin = async () => {
      try {
        const { data } = await axios.get(SingleCoin(id), {
          cancelToken: source.token,
        });
        setCoin(data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('line 35 CoinPage: ', 'Successfully aborted');
        } else {
          console.error('Fetching SingleCoin data failed.');
        }
      }
    };

    fetchSingleCoin();

    return () => {
      // cancel the request before component unmounts
      source.cancel();
    };
  }, []);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
    sidebar: {
      width: '30%',
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 25,
      borderRight: '2px solid grey',
    },
    heading: {
      fontWeight: 'bold',
      marginBottom: 20,
      fontFamily: 'Montserrat',
    },
    description: {
      width: '100%',
      fontFamily: 'Montserrat',
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: 'justify',
    },
    marketData: {
      alignSelf: 'start',
      padding: 25,
      paddingTop: 10,
      width: '100%',
      [theme.breakpoints.down('md')]: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
      },
      [theme.breakpoints.down('xs')]: {
        alignItems: 'start',
      },
    },
  }));

  const inWatchlist = watchlist.includes(coin?.id);

  const addToWatchlist = async function () {
    const coinRef = doc(db, 'watchlist', user.uid);
    try {
      await setDoc(coinRef, {
        coins: watchlist ? [...watchlist, coin?.id] : [coin?.id],
      });

      setAlert({
        open: true,
        message: `${coin.name} added to the Watchlist!`,
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

  const removeFromWatchlist = async function () {
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

  const classes = useStyles();

  if (!coin)
    return <LinearProgress style={{ backgroundColor: myAccentColor }} />;

  return (
    <div className={classes.container}>
      {/* sidebar */}
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {ReactHtmlParser(coin?.description.en.split('. ')[0])}
          {'. '}
          {ReactHtmlParser(coin?.description.en.split('. ')[1])}
          {'. '}
          {ReactHtmlParser(coin?.description.en.split('. ')[2])}
          {'. '}
          {ReactHtmlParser(coin?.description.en.split('. ')[3])}
          {'. '}
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: 'flex' }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5">{coin?.market_cap_rank}</Typography>
          </span>
          <span style={{ display: 'flex' }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5">
              {symbol}{' '}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: 'flex' }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5">
              {symbol}{' '}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}{' '}
              M
            </Typography>
          </span>

          {user && (
            <Button
              variant="outlined"
              style={{
                width: '100%',
                height: 40,
                backgroundColor: inWatchlist ? '#ff0000' : myAccentColor,
              }}
              onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}>
              {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </Button>
          )}
        </div>
      </div>
      {/* chart */}
      <CoinInfo coin={coin} />
    </div>
  );
};

export default Coinpage;
