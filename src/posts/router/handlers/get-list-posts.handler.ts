import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { postRepository } from "../../repositories/post-repository";
import { Post } from "../../types/post.types";
import { mapToPostViewModel } from "../mappers/map-to-post-view-model.util";

export const getListPostsHandler = async (req: Request, res: Response<Post[]>) => {
  try {
    const posts = await postRepository.findAll();
    const postsViewModel = posts.map(mapToPostViewModel);
    res.status(HttpStatus.Ok).send(postsViewModel);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
