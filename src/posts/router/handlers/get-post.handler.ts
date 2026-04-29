import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { postsService } from "../../application/posts.service";
import { Post } from "../../types/post.types";
import { mapToPostViewModel } from "../mappers/map-to-post-view-model.util";

export const getPostHandler = async (req: Request<{ id: string }>, res: Response<Post | HttpStatus.BadRequest>) => {
  try {
    const post = await postsService.findById(req.params.id);
    const postViewModel = mapToPostViewModel(post);
    res.status(HttpStatus.Ok).send(postViewModel);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
