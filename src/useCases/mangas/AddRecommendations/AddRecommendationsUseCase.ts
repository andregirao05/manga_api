import { IUseCase } from "protocols";
import { IMangaRepository } from "repositories";
import { IAddRecommendationsDTO } from "./IAddRecommendationsDTO";

export class AddRecommendationsUseCase
  implements IUseCase<IAddRecommendationsDTO, boolean>
{
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(data: IAddRecommendationsDTO): Promise<boolean> {
    const { origin, ids } = data;

    const results = await this.mangaRepository.addRecommendations({
      origin,
      ids,
    });

    return results;
  }
}
