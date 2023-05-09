import { app } from "./app";
import { mangaRespository } from "../repositories";
import { getEnv } from "./configs";

async function main() {
  try {
    await mangaRespository.connect(getEnv("MONGO_URI", ""));

    const port = getEnv("PORT", "8000");

    app.listen(port, () =>
      console.log(`Sever running on port http://localhost:${port}`)
    );
  } catch (error) {
    console.log(error);
  }
}

main();
