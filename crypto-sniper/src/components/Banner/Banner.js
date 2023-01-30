import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Carousel from './Carousel';

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: 'url(./banner4.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  bannerContent: {
    height: '400px',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 25,
    justifyContent: 'space-around',
  },
  tagline: {
    display: 'flex',
    height: '40%',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  },
  title: { fontWeight: 'bold', marginBottom: '15', fontFamily: 'Montserrat' },
  subtitle: {
    color: 'darkgrey',
    textTransform: 'capitalize',
    fontFamily: 'Montserrat',
  },
}));

const Banner = () => {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography variant="h2" className={classes.title}>
            Crypto Sniper
          </Typography>
          <Typography variant="subtitle2" className={classes.subtitle}>
            The universal source of info on your favourite cryptocurrencies in
            one location
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
