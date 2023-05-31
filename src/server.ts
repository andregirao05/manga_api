import { app } from "./app";
import { getEnv } from "./configs";
import { connect } from "mongoose";

async function main() {
  try {
    await connect(getEnv("MONGO_URI"));

    const port = getEnv("PORT");

    app.listen(port, () =>
      console.log(`Sever running on port http://localhost:${port}`)
    );
  } catch (error) {
    console.log(error);
  }
}

main();
