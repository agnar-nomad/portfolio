import React from 'react';

const Hero = () => {
  return (
    <section className="hero h-screen grid items-center px-12">
      <div className="grid w-full gap-8 relative top-24">
        <a
          role="button"
          href="#mint"
          className="border-white bg-transparent p-4 border-2 inline-block max-w-fit mb-24">
          Mint!
        </a>
        <h1 className="text-5xl leading-snug">
          Retro <br />
          Baddies
        </h1>
        <p>[Working DEMO for client]</p>
        <p className="text-xl">Collection description</p>
      </div>
    </section>
  );
};

export default Hero;
