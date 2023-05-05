import { app } from "./app";
import { db } from "../database";
import { getEnv } from "./configs";

db.connect(getEnv("MONGO_URI", "") as string)
  .then(() => {
    const port = getEnv("PORT", "8000");
    app.listen(port, () =>
      console.log(`Sever running on port http://localhost:${port}`)
    );
  })
  .catch(console.log);
