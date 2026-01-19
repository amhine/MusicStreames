import { Injectable, signal } from '@angular/core';
import { Track } from '../models/track';
import { AudioState, PlayerState } from '../models/player-state';

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService {
  private audio = new Audio();

  state = signal<AudioState>('stopped');
  currentTrack = signal<Track | null>(null);
  currentTime = signal<number>(0);
  duration = signal<number>(0);
  volume = signal<number>(1);
  playlist = signal<Track[]>([]);
  constructor() {
    this.initAudioEvents();
  }

  private initAudioEvents() {
    this.audio.ontimeupdate = () => this.currentTime.set(this.audio.currentTime);
    this.audio.onended = () => {
      this.state.set('stopped');
      this.currentTime.set(0);
    };
    this.audio.onloadedmetadata = () => this.duration.set(this.audio.duration);
    this.audio.onplaying = () => this.state.set('playing');
    this.audio.onpause = () => this.state.set('paused');
  }

  playTrack(track: Track) {
    this._playFile(track);
  }

  private _playFile(track: Track) {
    if (!track.file) return;
    const url = URL.createObjectURL(track.file);
    this.audio.src = url;
    this.audio.load();
    this.audio.play().then(() => {
      this.currentTrack.set(track);
      this.state.set('playing');
    }).catch(e => console.error(e));
  }

  togglePlay() {
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }
  setPlaylist(tracks: Track[]) {
    this.playlist.set(tracks);
  }
  next() {
    const current = this.currentTrack();
    const list = this.playlist();
    if (!current || list.length === 0) return;

    const currentIndex = list.findIndex(t => t.id === current.id);
    const nextIndex = (currentIndex + 1) % list.length;

    this._playFile(list[nextIndex]);
  }

  previous() {
    const current = this.currentTrack();
    const list = this.playlist();
    if (!current || list.length === 0) return;

    const currentIndex = list.findIndex(t => t.id === current.id);
    const prevIndex = (currentIndex - 1 + list.length) % list.length;

    this._playFile(list[prevIndex]);
  }

  seekTo(seconds: number) {
    this.audio.currentTime = seconds;
  }

  setVolume(vol: number) {
    this.audio.volume = vol;
    this.volume.set(vol);
  }
}
