interface IChapter extends Chapter {}

export class Chapter {
  name: string;
  pages: string[];

  constructor(data: IChapter) {
    this.name = data.name;
    this.pages = data.pages;
  }
}
