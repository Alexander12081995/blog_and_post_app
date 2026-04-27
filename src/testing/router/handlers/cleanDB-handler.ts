import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { testingRepository } from "../../repositories/testing-repository";

export const cleanDBHandler = async (req: Request, res: Response) => {
  try {
    await testingRepository.cleanDB();
    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
