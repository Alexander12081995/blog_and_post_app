import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { postRepository } from "../../repositories/post-repository";

export const deletePostHandler = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const post = await postRepository.findById(req.params.id);
    if (!post) {
      res.sendStatus(HttpStatus.NotFound);
      return;
    }

    await postRepository.delete(req.params.id);
    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
