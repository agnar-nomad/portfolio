import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import { TrendingCoins } from '../../config/api';
import { CryptoState } from '../../CryptoContext';
import { numberWithCommas } from '../../config/helpers';

const useStyles = makeStyles((theme) => ({
  carousel: {
    height: '50%',
    display: 'flex',
    alignItems: 'center',
  },
  carouselItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    textTransform: 'uppercase',
    color: 'white',
  },
}));

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const classes = useStyles();

  const { currency, symbol } = CryptoState();

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const fetchTrendingCoins = async () => {
      try {
        const { data } = await axios.get(TrendingCoins(currency), {
          cancelToken: source.token,
        });
        setTrending(data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('line 45 Carousel: ', 'Successfully aborted');
        } else {
          console.error('Fetching carousel data failed.');
        }
      }
    };

    fetchTrendingCoins();

    return () => {
      // cancel the request before component unmounts
      source.cancel();
    };
  }, [currency]);

  const items = trending.map((coin) => {
    let isPositive = coin.price_change_percentage_24h >= 0;

    return (
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span style={{ color: isPositive ? 'rgb(14,203,129)' : 'red' }}>
            {isPositive && '+'} {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
