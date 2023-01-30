import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HistoricalChart } from '../config/api';
import { chartDays } from '../config/data';
import { CryptoState } from '../CryptoContext';
import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import SelectButton from './SelectButton';
import { myAccentColor } from '../config/helpers';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '75%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
  timeframeOptions: {
    display: 'flex',
    marginTop: 20,
    justifyContent: 'space-around',
    width: '100%',
  },
}));

const CoinInfo = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);

  const { currency } = CryptoState();
  const classes = useStyles();

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const fetchHistoricalData = async () => {
      try {
        const { data } = await axios.get(
          HistoricalChart(coin.id, days, currency),
          {
            cancelToken: source.token,
          }
        );
        setHistoricalData(data.prices);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('line 61 CoinInfo for Chart: ', 'Successfully aborted');
        } else {
          console.error('Fetching Historical Data for Chart failed.');
        }
      }
    };

    fetchHistoricalData();

    return () => {
      // cancel the request before component unmounts
      source.cancel();
    };
  }, [currency, days, coin.id]);

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
      <div className={classes.container}>
        {!historicalData ? (
          <CircularProgress
            style={{ color: myAccentColor }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            {/* chart */}
            <Line
              style={{ minHeight: '220px' }}
              data={{
                labels: historicalData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;

                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historicalData.map((coin) => coin[1]),
                    label: `Price (Past ${days} Days) in ${currency}`,
                    borderColor: myAccentColor,
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            {/* buttons */}
            <div className={classes.timeframeOptions}>
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => setDays(day.value)}
                  selected={day.value === days}>
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
