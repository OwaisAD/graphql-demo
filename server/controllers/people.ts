import express from "express";
const personRouter = express.Router();
import { Request, Response } from "express";
import PersonModel from "../models/Person.model";
import { Person } from "../utils/types";

personRouter.get("/", async (req: Request, res: Response) => {
  try {
    const people = await PersonModel.find({});
    res.status(200).json(people);
  } catch (error: any) {
    res.status(400).json({
      status: "Something went wrong",
      message: error.message,
    });
  }
});

personRouter.get("/:id", async (req: Request, res: Response) => {
  const person = await PersonModel.findById(req.params.id);
  if (person) {
    res.status(200).json(person);
  } else {
    res.status(404).end();
  }
});

export default personRouter;
