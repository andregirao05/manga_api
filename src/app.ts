import express, { json } from "express";
import { router } from "./router";

const app = express();

app.use(json());
app.use(router);

export { app };
