import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { postsService } from "../../application/posts.service";

export const updatePostHandler = async (req: Request<{ id: string }>, res: Response) => {
  try {
    await postsService.update(req.params.id, req.body);
    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
