# Crypto Sniper

This is a cryptocurrency tracking app project which is largely based on the Youtube tutorial from [Roadside Coder](https://www.youtube.com/@RoadsideCoder). More precisely, this project [Part 1](https://www.youtube.com/watch?v=QA6oTpMZp84) and [Part 2](https://www.youtube.com/watch?v=8NMJxyDwP6A). However, there are rather substantial improvements in how styling is written and organised, in error handling component life cycles and a modest change in design.

The project was built in React 17, with Material UI v4, a free tier version of [Firebase](https://firebase.google.com/) v9 and a suite of other third-party libraries that make development simpler and faster. Data is being feched from the free [Coingecko API](https://www.coingecko.com/en/api/documentation). This project helped me learn many new concepts (e.g. React context, advanced state management, ES6 import management, discovering new libraries, components in components in components...) but also that working with a UI library is sometimes like learning a new language.

#### The app is a list of cryptocurrencies (fetched from CoinGecko) shown in a paginated view, with the possibility of searching for particular coins. The app provides also more detailed info on single cryptocurrencies, including rank, description or historical charts. Users can also create an account with the app and use the tracker (or watchlist) feature while being signed in.

### Usage

- Browse the list of cryptocurrencies ordered by market cap, in a paginated list view
- View the currently top trending coins and their price in the top banner
- Change the currency in which to view crypto prices, using the available options in the top bar
- Clicking a cryptocurrency opens a details page with more data on them, including some history, rank, charts and the possibility to add to a watchlist
- Use the search bar to look up a favourite crypto coin from the list and display it immediately on the results
- Create an account on the app, using email/password or using GoogleAuth
- Authenticated users can use the Watchlist feature and save their favourite coins in their personal list
