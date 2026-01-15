import { Track } from './track';

export type AudioState = 'playing' | 'paused' | 'stopped' | 'buffering';

export interface PlayerState {

  state: AudioState;
  currentTrack: Track | null;
  currentTime: number;
  duration: number;
  volume: number;

}
