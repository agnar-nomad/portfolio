import { ConnectButton } from '@rainbow-me/rainbowkit';
import React from 'react';

const NavBar = () => {
  return (
    <section className="navbar w-full fixed top-0 left-0 h-10 z-10">
      <nav className="flex items-center justify-between px-12 py-2 text-sm">
        <div>
          Retro <br /> Baddies
        </div>
        <ul className="flex items-center gap-6">
          <li>Mint</li>
          <li>Twitter</li>

          <li>
            <ConnectButton />
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default NavBar;
