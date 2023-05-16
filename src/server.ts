import { app } from "./app";
import { mangaRespository } from "./repositories";
import { getEnv } from "./configs";

async function main() {
  try {
    await mangaRespository.connect(getEnv("MONGO_URI"));
    console.log("Database connected!");

    const port = getEnv("PORT");

    app.listen(port, () =>
      console.log(`Sever running on port http://localhost:${port}`)
    );
  } catch (error) {
    console.log(error);
  }
}

main();
