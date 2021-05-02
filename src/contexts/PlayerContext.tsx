import { createContext, ReactNode, useContext, useState } from 'react';
import Episode from '../pages/episodes/[slug]';

type Episode = {
  title: string,
  members: string,
  thumbnail: string,
  duration: number,
  url: string
}

type EpisodeContextData = {
  episodeList: Episode[],
  currentEpisodeIndex: number,
  isPlaying: boolean,
  isLooping: boolean,
  isShuflleing: boolean,
  play: (episode: Episode) => void,
  playList: (episode: Episode[], index: number) => void,
  playNext: () => void,
  playPrevious: () => void,
  tooglePlay: () => void,
  toogleLoop: () => void,
  toogleShuflle: () => void,
  clearPlayerState: () => void,
  setStatePlaying: (state: boolean) => void,
  hasNext: boolean,
  hasPrevious: boolean
}

type PlayerProviderProps = {
  children: ReactNode
}
export const PlayerContext = createContext({} as EpisodeContextData);

export function PlayerContextProvider({ children})  {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuflleing, setIsShuffleing] = useState(false);
  
  
  function play(episode: Episode){
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], index: number ){
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  const hasNext = isShuflleing || (currentEpisodeIndex + 1) < episodeList.length;
  const hasPrevious = currentEpisodeIndex > 0;

  function playNext(){
    if(isShuflleing){ 
      const nextRandomIndex = Math.floor(Math.random() * episodeList.length);
      setCurrentEpisodeIndex(nextRandomIndex);
    }else if(hasNext){
      const numberNextIndex = currentEpisodeIndex + 1;
      setCurrentEpisodeIndex(numberNextIndex);
    }
  }

  function playPrevious(){
    if (hasPrevious){
      setCurrentEpisodeIndex(currentEpisodeIndex -1);
    }
  }

  function tooglePlay(){
    setIsPlaying(!isPlaying)
  }

  function toogleLoop(){
    setIsLooping(!isLooping)
  }

  function toogleShuflle(){
    setIsShuffleing(!isShuflleing);
  }

  function setStatePlaying(state: boolean){
    setIsPlaying(state);
  }

  function clearPlayerState(){
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }

  return (
    <PlayerContext.Provider 
      value={{
        episodeList, 
        currentEpisodeIndex, 
        play, 
        playNext,
        playPrevious,
        isPlaying, 
        isLooping,
        isShuflleing,
        tooglePlay, 
        toogleLoop,
        toogleShuflle,
        setStatePlaying,
        playList,
        hasNext,
        hasPrevious,
        clearPlayerState
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => {
  return useContext(PlayerContext);
}