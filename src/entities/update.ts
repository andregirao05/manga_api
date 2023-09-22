export interface IUpdate {
  origin: string;
  language: string;
  populars: string[];
}

export class Update implements IUpdate {
  origin: string;
  language: string;
  populars: string[];

  constructor(origin: string, populars: string[]) {
    this.origin = origin;
    this.populars = populars;
  }
}
