import { IUpdate } from "entities";
import { IAddUpdateDTO, IGetUpdateDTO, ISetUpdateDTO } from "useCases";
import { UpdateSchema } from "./schemas";
import { model, Model } from "mongoose";
import { IInformationsRepository } from "./interfaces/IInfomationsRepository";

class InfomationsRepository implements IInformationsRepository {
  private UpdateModel: Model<IUpdate>;

  constructor() {
    this.UpdateModel = model<IUpdate>("Update", UpdateSchema);
  }

  async add(data: IAddUpdateDTO): Promise<string> {
    const { origin, language, latest_updates, populars } = data;
    const results = await this.UpdateModel.collection.insertOne({
      origin,
      language,
      latest_updates,
      populars,
    });
    return results.insertedId.toString();
  }

  async get(data: IGetUpdateDTO): Promise<IUpdate> {
    const { origin } = data;
    const results = await this.UpdateModel.findOne({ origin });
    return results;
  }

  async set(data: ISetUpdateDTO): Promise<boolean> {
    const { origin, language, latest_updates, populars } = data;

    const results = await this.UpdateModel.collection.updateOne(
      {
        origin,
      },
      {
        $set: {
          origin,
          language,
          latest_updates,
          populars,
        },
      }
    );

    return results.modifiedCount > 0;
  }

  async exists(origin: string): Promise<boolean> {
    const results = await this.UpdateModel.findOne(
      {
        origin: origin,
      },
      { projection: { _id: 1 } }
    );

    return results !== null;
  }
}

export const informationsRespository = new InfomationsRepository();
