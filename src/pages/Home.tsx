import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Services from '../components/Services';
import Stats from '../components/Stats';

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Services />
      <Stats />
    </>
  );
}