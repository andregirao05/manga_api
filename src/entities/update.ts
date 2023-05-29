export interface IUpdate {
  origin: string;
  language: string;
  populars: string[];
  latest_updates: string[];
}

export class Update implements IUpdate {
  origin: string;
  language: string;
  populars: string[];
  latest_updates: string[];

  constructor(origin: string, populars: string[], latest_updates: string[]) {
    this.origin = origin;
    this.populars = populars;
    this.latest_updates = latest_updates;
  }
}
