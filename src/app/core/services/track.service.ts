import { Injectable, inject, signal } from '@angular/core';
import { StorageService } from './storage.service';
import { Track } from '../models/track';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private storage = inject(StorageService);

  // State
  tracks = signal<Track[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor() {
    this.loadTracks();
  }

  async loadTracks() {
    this.loading.set(true);
    try {
      const data = await this.storage.getAllTracks();
      this.tracks.set(data);
    } catch (err) {
      this.error.set("Erreur chargement");
    } finally {
      this.loading.set(false);
    }
  }

  async addTrack(track: Track) {
    this.loading.set(true);
    try {
      await this.storage.addTrack(track);
      await this.loadTracks();
    } catch (err) {
      console.error(err);
    }
  }

  async getTrackById(id: number): Promise<Track | undefined> {
    return this.storage.getTrack(id);
  }
  async updateTrack(track: Track) {
    this.loading.set(true);
    try {
      await this.storage.updateTrack(track);
      await this.loadTracks(); // Refresh la liste globale
    } catch (err) {
      console.error("Erreur update:", err);
      this.error.set("Impossible de modifier");
    } finally {
      this.loading.set(false);
    }
  }


  async deleteTrack(id: number) {
    this.loading.set(true);
    try {
      await this.storage.deleteTrack(id); // Supprimer mn DB
      await this.loadTracks(); // Refresh l-liste
    } catch (err) {
      console.error(err);
      this.error.set("Erreur lors de la suppression");
    } finally {
      this.loading.set(false);
    }
  }

}
