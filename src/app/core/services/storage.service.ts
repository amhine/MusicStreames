import { Injectable } from '@angular/core';
import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Track } from '../models/track';

interface MusicDB extends DBSchema {
  tracks: {
    key: number;
    value: Track;
  };
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private dbPromise: Promise<IDBPDatabase<MusicDB>>;

  constructor() {
    this.dbPromise = openDB<MusicDB>('MusicStreamDB', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('tracks')) {
          db.createObjectStore('tracks', { keyPath: 'id', autoIncrement: true });
        }
      },
    });
  }

  async addTrack(track: Track): Promise<number> {
    const db = await this.dbPromise;
    return db.add('tracks', track);
  }

  async getAllTracks(): Promise<Track[]> {
    const db = await this.dbPromise;
    return db.getAll('tracks');
  }

  async getTrack(id: number): Promise<Track | undefined> {
    const db = await this.dbPromise;
    return db.get('tracks', id);
  }

  async deleteTrack(id: number): Promise<void> {
    const db = await this.dbPromise;
    return db.delete('tracks', id);
  }
  async updateTrack(track: Track): Promise<number> {
    const db = await this.dbPromise;
    return db.put('tracks', track);
  }

}
