export interface Track {
  id?: number;
  title: string;
  artist: string;
  description?: string; // Zdna hada
  album?: string;
  category: string;
  file: Blob;
  cover?: Blob | null;  // <-- Hada howa li kan na9ss
  duration: number;
  dateAdded: Date;
}
