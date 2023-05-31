export interface IChapter {
  name: string;
  pages: string[];
}

export class Chapter implements IChapter {
  name: string;
  pages: string[];

  constructor(data: IChapter) {
    this.name = data.name;
    this.pages = data.pages;
  }
}
