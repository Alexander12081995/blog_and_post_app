import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { testingRepository } from "../../repositories/testing-repository";

export const cleanDBHandler = async (req: Request, res: Response) => {
  testingRepository.cleanDB();
  res.sendStatus(HttpStatus.NoContent);
};
