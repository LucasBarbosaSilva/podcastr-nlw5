import '../styles/global.scss';

import { useState } from 'react';

import { Player } from '../components/Player';
import { Header } from '../components/Header';
import { PlayerContext } from '../contexts/PlayerContext';

import styles from '../styles/app.module.scss';

function MyApp({ Component, pageProps }) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  function play(episode){
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function tooglePlay(){
    setIsPlaying(!isPlaying)
  }

  function setStatePlaying(state: boolean){
    setIsPlaying(state);
  }

  return (
    <PlayerContext.Provider value={{episodeList, currentEpisodeIndex, play, isPlaying, tooglePlay, setStatePlaying}}>
      <div className={styles.wrapper}>
        <main >
          <Header/>
          <Component {...pageProps} />
        </main>
        <Player/>
      </div>
    </PlayerContext.Provider>
  );
}

export default MyApp;