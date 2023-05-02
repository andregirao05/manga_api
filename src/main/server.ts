import dotenv from "dotenv";
import { app } from "./app";
import { db } from "../database";

dotenv.config();

db.connect(process.env.MONGO_URI as string)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Sever running on port ${process.env.PORT}`)
    );
  })
  .catch(console.log);
