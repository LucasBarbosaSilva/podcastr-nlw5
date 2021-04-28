import { createContext } from 'react';

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
  play: (episode: Episode) => void,
  tooglePlay: () => void,
  setStatePlaying: (state: boolean) => void,
}

export const PlayerContext = createContext({} as EpisodeContextData);