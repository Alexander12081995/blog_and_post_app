import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { postsService } from "../../application/posts.service";

export const deletePostHandler = async (req: Request<{ id: string }>, res: Response) => {
  try {
    await postsService.delete(req.params.id);
    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
