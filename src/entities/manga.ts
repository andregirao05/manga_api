export interface IManga {
  id: string;
  title: string;
  alternative_title: string;
  author: string;
  artist: string;
  status: string;
  rating: number | null;
  url: string;
  origin: string;
  language: string;
  thumbnail: string;
  genres: string[];
  summary: string;
}

export class Manga implements IManga {
  id: string;
  title: string;
  alternative_title: string;
  author: string;
  artist: string;
  status: string;
  rating: number | null;
  url: string;
  origin: string;
  language: string;
  thumbnail: string;
  genres: string[];
  summary: string;

  constructor(data: IManga, id: string = null) {
    this.title = data.title;
    this.alternative_title = data.alternative_title;
    this.author = data.author;
    this.artist = data.artist;
    this.status = data.status;
    this.rating = data.rating;
    this.url = data.url;
    this.origin = data.origin;
    this.language = data.language;
    this.thumbnail = data.thumbnail;
    this.genres = data.genres;
    this.summary = data.summary;
    this.id = id;
  }
}
