import { Chapter } from "./chapter";
import { IManga } from "./interfaces";

export class Manga implements IManga {
  title: string;
  alternative_title: string;
  author: string;
  artist: string;
  status: string;
  url: string;
  origin: string;
  language: "english" | "portuguse";
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
    url: string,
    origin: string,
    language: "english" | "portuguse",
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
    this.url = url;
    this.origin = origin;
    this.language = language;
    this.thumbnail = thumbnail;
    this.genres = genres;
    this.summary = summary;
    this.chapters = chapters;
  }
}
