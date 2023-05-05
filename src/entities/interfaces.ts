export interface IChapter {
  name: string;
  pages: string[];
}

export interface IManga {
  title: string;
  alternative_title: string;
  author: string;
  artist: string;
  status: string;
  url: string;
  origin: string;
  language: "english" | "portuguese";
  thumbnail: string;
  genres: string[];
  summary: string;
  chapters: IChapter[];
}

export interface IUpdate {
  origin: string;
  populars: string[];
  latest_updates: string[];
}
