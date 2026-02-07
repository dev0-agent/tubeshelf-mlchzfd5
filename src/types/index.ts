export interface Note {
  id: string;
  content: string;
  createdAt: number;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail?: string;
  description?: string;
  tags: string[]; // Array of Tag IDs
  notes: Note[];
  createdAt: number;
  updatedAt: number;
}