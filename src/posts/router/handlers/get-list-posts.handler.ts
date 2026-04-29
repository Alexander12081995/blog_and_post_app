import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { postsService } from "../../application/posts.service";
import { Post } from "../../types/post.types";
import { mapToPostViewModel } from "../mappers/map-to-post-view-model.util";

export const getListPostsHandler = async (req: Request, res: Response<Post[]>) => {
  try {
    const posts = await postsService.findAll();
    const postsViewModel = posts.map(mapToPostViewModel);
    res.status(HttpStatus.Ok).send(postsViewModel);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
