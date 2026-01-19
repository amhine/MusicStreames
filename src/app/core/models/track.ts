export interface Track {
  id?: number;
  title: string;
  artist: string;
  description?: string;
  album?: string;
  category: string;
  file: Blob;
  cover?: Blob | null;
  duration: number;
  dateAdded: Date;
}
