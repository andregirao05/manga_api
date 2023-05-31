import express from "express";
import { router } from "./router";
import { setupMiddleware } from "./configs";

const app = express();

setupMiddleware(app);
app.use(router);

export { app };
