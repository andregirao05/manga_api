import { IChapter } from "./interfaces";

export class Chapter implements IChapter {
  name: string;
  pages: string[];

  constructor(name: string, pages: string[]) {
    this.name = name;
    this.pages = pages;
  }
}
