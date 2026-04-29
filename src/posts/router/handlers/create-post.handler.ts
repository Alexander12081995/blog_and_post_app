import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { ValidationErrorsMessagesType } from "../../../core/types/validationErrors";
import { postsService } from "../../application/posts.service";
import { PostCreateInputDto } from "../../dto/post.input-dto";
import { Post } from "../../types/post.types";
import { mapToPostViewModel } from "../mappers/map-to-post-view-model.util";

export const createPostHandler = async (
  req: Request<{}, {}, PostCreateInputDto>,
  res: Response<Post | ValidationErrorsMessagesType>,
) => {
  try {
    const post = await postsService.create(req.body);
    const postViewModel = mapToPostViewModel(post);
    res.status(HttpStatus.Created).send(postViewModel);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
