import { IResultsDTO } from "./IResultsDTO";

export interface IResultsWithPageInfoDTO extends IResultsDTO {
  currentPage: number;
  totalPages: number;
}
