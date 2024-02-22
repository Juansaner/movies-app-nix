import React, { useState } from 'react'
import MoviesGrid from '../components/MoviesGrid'
import Navbar from '../components/Navbar';
import RandomMovie from '../components/RandomMovie';
import requests from '../utils/Request'
import Footer from '../components/Footer';

export function LandingPage() {

  return (
    <div>
      <Navbar />
      <RandomMovie />
      <MoviesGrid key={`nowplaying`} title='Now playing' fetchURL={requests.requestNowPlaying} />
      <MoviesGrid key={`upcoming`} title='Upcoming' fetchURL={requests.requestUpComing} />
      <MoviesGrid key={`popular`} title='Popular' fetchURL={requests.requestPopular} />
      <MoviesGrid key={`toprated`} title='Top rated' fetchURL={requests.requestTopRated} />
      <MoviesGrid key={`airing`} title='Airing today (series)' fetchURL={requests.requestAiring} />
      <MoviesGrid key={`onair`} title='On the air (series)' fetchURL={requests.requestOnAir} />
      <MoviesGrid key={`tvpopular`} title='Popular series' fetchURL={requests.requestTvPopular} />
      <Footer />
    </div>
  )
}



