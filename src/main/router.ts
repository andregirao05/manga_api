import { Router } from "express";

const router = Router();

router.get("/", (request, response) => {
  console.log(request.query);
  response.status(200).json(request.body);
});

export { router };
