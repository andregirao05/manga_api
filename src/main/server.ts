import { app } from "./app";
import { db } from "../database";
import { getEnv } from "./configs";

async function main() {
  try {
    await db.connect(getEnv("MONGO_URI", ""));

    const port = getEnv("PORT", "8000");

    app.listen(port, () =>
      console.log(`Sever running on port http://localhost:${port}`)
    );
  } catch (error) {
    console.log(error);
  }
}

main();
