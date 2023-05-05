import { Chapter } from "./chapter";
import { IManga } from "./interfaces";

export class Manga implements IManga {
  title: string;
  alternative_title: string;
  author: string;
  artist: string;
  status: string;
  rating: number | null;
  url: string;
  origin: string;
  language: "english" | "portuguese";
  thumbnail: string;
  genres: string[];
  summary: string;
  chapters: Chapter[];

  constructor(
    title: string,
    alternative_title: string,
    author: string,
    artist: string,
    status: string,
    rating: number | null,
    url: string,
    origin: string,
    language: "english" | "portuguese",
    thumbnail: string,
    genres: string[],
    summary: string,
    chapters: Chapter[]
  ) {
    this.title = title;
    this.alternative_title = alternative_title;
    this.author = author;
    this.artist = artist;
    this.status = status;
    this.rating = rating;
    this.url = url;
    this.origin = origin;
    this.language = language;
    this.thumbnail = thumbnail;
    this.genres = genres;
    this.summary = summary;
    this.chapters = chapters;
  }
}
