import { Request, Response } from "express";
import { blogRepository } from "../../../blogs/repositories/blog-repository";
import { HttpStatus } from "../../../core/types/http-statuses";
import { ValidationErrorsMessagesType } from "../../../core/types/validationErrors";
import { PostCreateInputDto } from "../../dto/post.input-dto";
import { postRepository } from "../../repositories/post-repository";
import { Post } from "../../types/post.types";
import { mapToPostViewModel } from "../mappers/map-to-post-view-model.util";

export const createPostHandler = async (
  req: Request<{}, {}, PostCreateInputDto>,
  res: Response<Post | ValidationErrorsMessagesType>,
) => {
  try {
    const blog = await blogRepository.findById(req.body.blogId);
    if (!blog) {
      res.status(HttpStatus.NotFound).send({ errorsMessages: [{ field: "blogId", message: "Blog does not exist" }] });
      return;
    }

    const newPost: Post = {
      title: req.body.title,
      shortDescription: req.body.shortDescription,
      content: req.body.content,
      blogId: req.body.blogId,
      blogName: blog.name,
      createdAt: new Date().toISOString(),
    };

    const post = await postRepository.create(newPost);
    const postViewModel = mapToPostViewModel(post);
    res.status(HttpStatus.Created).send(postViewModel);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
