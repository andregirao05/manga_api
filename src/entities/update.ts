export interface IUpdate {
  origin: string;
  populars: string[];
  latest_updates: string[];
}

export class Update {
  origin: string;
  populars: string[];
  latest_updates: string[];

  constructor(origin: string, populars: string[], latest_updates: string[]) {
    this.origin = origin;
    this.populars = populars;
    this.latest_updates = latest_updates;
  }
}
