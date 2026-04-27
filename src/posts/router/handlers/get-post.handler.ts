import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { postRepository } from "../../repositories/post-repository";
import { Post } from "../../types/post.types";
import { mapToPostViewModel } from "../mappers/map-to-post-view-model.util";

export const getPostHandler = async (req: Request<{ id: string }>, res: Response<Post | HttpStatus.BadRequest>) => {
  try {
    const post = await postRepository.findById(req.params.id);
    if (!post) {
      res.sendStatus(HttpStatus.NotFound);
      return;
    }

    const postViewModel = mapToPostViewModel(post);
    res.status(HttpStatus.Ok).send(postViewModel);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
