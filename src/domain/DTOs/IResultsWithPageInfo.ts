import { IResults } from "./IResults";

export interface IResultsWithPageInfo<T> extends IResults<T> {
  currentPage: number;
  totalPages: number;
}
