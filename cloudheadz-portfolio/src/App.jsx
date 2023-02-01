import './App.css';

import NftTreasury from './components/NftTreasury';
import UserPortfolio from './components/UserPortfolio/UserPortfolio';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';

// TODO lazy loading images - yt video - medium article
// TODO buy Aquire font?
// TODO try an IPFS gate to get images
// TODO
// TODO
// TODO

function App() {
  return (
    <div className="page">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/portfolio" element={<NftTreasury />} />
        <Route exact path="/user" element={<UserPortfolio />} />
      </Routes>
    </div>
  );
}

export default App;
