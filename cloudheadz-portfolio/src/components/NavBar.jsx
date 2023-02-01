import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import cloudHeadzLogo from '../assets/logos/cloudheadz-Logo.jpeg';

export default function NavBar() {
  return (
    <header>
      <nav>
        <ul className="navbar">
          <li className="nav-item">
            <Link to="/">
              <img
                src={cloudHeadzLogo}
                alt="Logo of the Cloudheadz project"
                height="50"
                width="50"
                className="logo"
              />
            </Link>
          </li>
          <li>
            <Link to="/portfolio" className="white">
              NFT <br />
              Portfolio
            </Link>
          </li>
          <li>
            <Link to="/user" className="white">
              User
              <br /> Portfolio
            </Link>
          </li>
          <li>
            <Link to="#">Collections</Link>
          </li>
          <li>
            <Link to="#">Auctions</Link>
          </li>
          <li>
            <Link to="#">Treasury</Link>
          </li>
          {/* <li>
            <Link to="#">Team</Link>
          </li>
          <li>
            <Link to="#">Roadmap</Link>
          </li>
          <li>
            <Link to="#">Artist</Link>
          </li>
          <li>
            <Link to="#">Gallery</Link>
          </li>
          <li>
            <Link to="#">Merch</Link>
          </li> */}
          <li>
            <Link to="#">Wallet</Link>
          </li>
          <li>
            <Link to="#">Connect</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
