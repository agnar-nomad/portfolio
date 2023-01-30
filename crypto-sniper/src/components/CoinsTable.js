import React, { useEffect, useState } from 'react';
import { CryptoState } from '../CryptoContext';
import {
  Container,
  createTheme,
  LinearProgress,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import { myAccentColor, numberWithCommas } from '../config/helpers';

const CoinsTable = () => {
  const { currency, symbol, coins, loading, fetchCoins } = CryptoState();

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [filteredResults, setFilteredResults] = useState(coins);

  const history = useHistory();

  useEffect(() => {
    fetchCoins();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      type: 'dark',
    },
  });

  useEffect(() => {
    setPage(1);
    const handleSearch = () => {
      const filteredArr = coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(search) ||
          coin.symbol.toLowerCase().includes(search)
      );
      // console.log('line 54 filtered: ', filteredArr);
      setFilteredResults(filteredArr);
    };

    handleSearch();
  }, [coins, search]);

  const useStyles = makeStyles(() => ({
    row: {
      backgroundColor: '#16171a',
      cursor: 'pointer',
      fontFamily: 'Montserrat',
      '&:hover': {
        backgroundColor: '#131111',
      },
    },
    tableHeader: {
      color: 'black',
      fontWeight: '700',
      fontFamily: 'Montserrat',
    },
    coinNameDiv: { display: 'flex', flexDirection: 'column' },
    coinSymbol: { textTransform: 'uppercase', fontSize: 22 },
    coinName: { color: 'darkgrey' },
    paginationDiv: {
      padding: 20,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    pagination: {
      '& MuiPaginationItem-root': {
        color: myAccentColor,
      },
    },
  }));

  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: 'center' }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: 'Montserrat' }}>
          Cryptocurrency Price by Market Cap
        </Typography>
        <TextField
          label="Search for a cryptocurrency.."
          variant="outlined"
          style={{ marginBottom: 20, width: '100%' }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: myAccentColor }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: myAccentColor }}>
                <TableRow>
                  {['Coin', 'Price', '24h Change', 'Market Cap'].map((head) => (
                    <TableCell
                      key={head}
                      className={classes.tableHeader}
                      align={head === 'Coin' ? 'left' : 'right'}>
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredResults
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const isPositive = row.price_change_percentage_24h >= 0;
                    return (
                      <TableRow
                        onClick={() => history.push(`/coins/${row.id}`)}
                        className={classes.row}
                        key={row.name}>
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ display: 'flex', gap: 15 }}>
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div className={classes.coinNameDiv}>
                            <span className={classes.coinSymbol}>
                              {row.symbol}
                            </span>
                            <span className={classes.coinName}>{row.name}</span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{' '}
                          {numberWithCommas(row?.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: isPositive ? 'rgb(14,203,129)' : 'red',
                          }}>
                          {isPositive && '+'}
                          {row?.price_change_percentage_24h?.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{' '}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          count={Number((filteredResults.length / 10).toFixed(0))}
          className={classes.paginationDiv}
          classes={{ ul: classes.pagination }}
          page={page}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
