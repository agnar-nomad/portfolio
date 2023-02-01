import React from 'react';
import './NftCard.css';
import campfireLogo from '../../assets/logos/campfire-logo.png';

export default function NftCard({ nft, image }) {
  return (
    <article //container for an nft tile
      className="gallery-card"
      style={{ opacity: nft.owner ? 1 : 0.3 }}>
      {/* container for the card head */}
      <section className="gallery-card__head">
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://campfire.exchange/collections/${nft.address}`}>
          <img className="gallery-card__head__logo" src={campfireLogo} />
        </a>
        <span className="gallery-card__head__counter">{nft.count}</span>
      </section>

      {/* container for card main content */}
      <section className="gallery-card__bottom">
        <img
          className="gallery-card__nft-image"
          src={image}
          data-contractadd={nft.address}
        />
        <p className="gallery-card__nft-text">{nft.name}</p>
      </section>
    </article>
  );
}
