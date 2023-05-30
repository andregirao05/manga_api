import { IResults } from "./IResults";

export interface IResultsWithAuthTokens<T> extends IResults<T> {
  token: string;
}
