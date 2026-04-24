import { Request, Response } from "express";
import { blogRepository } from "../../../blogs/repositories/blog-repository";
import { HttpStatus } from "../../../core/types/http-statuses";
import { ValidationErrorsMessagesType } from "../../../core/types/validationErrors";
import { PostCreateInputDto } from "../../dto/post.input-dto";
import { postRepository } from "../../repositories/post-repository";
import { Post } from "../../types/post.types";

export const createPostHandler = (
  req: Request<{}, {}, PostCreateInputDto>,
  res: Response<Post | ValidationErrorsMessagesType>,
) => {
  const blog = blogRepository.findById(req.body.blogId);
  if (!blog) {
    res.status(HttpStatus.NotFound).send({ errorsMessages: [{ field: "blogId", message: "Blog does not exist" }] });
    return;
  }

  const post = postRepository.create(req.body, blog.name);
  res.status(HttpStatus.Created).send(post);
};
