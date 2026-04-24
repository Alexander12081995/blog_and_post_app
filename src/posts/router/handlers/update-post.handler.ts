import { Request, Response } from "express";
import { blogRepository } from "../../../blogs/repositories/blog-repository";
import { HttpStatus } from "../../../core/types/http-statuses";
import { postRepository } from "../../repositories/post-repository";

export const updatePostHandler = (req: Request<{ id: string }>, res: Response) => {
  const blog = blogRepository.findById(req.body.blogId);
  if (!blog) {
    res.status(HttpStatus.NotFound).send({ errorsMessages: [{ field: "blogId", message: "Blog does not exist" }] });
    return;
  }
  const post = postRepository.findById(req.params.id);
  if (!post) {
    res.sendStatus(HttpStatus.NotFound);
    return;
  }

  postRepository.update(req.params.id, req.body, blog.name);
  res.sendStatus(HttpStatus.NoContent);
};
