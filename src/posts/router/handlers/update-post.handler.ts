import { Request, Response } from "express";
import { blogRepository } from "../../../blogs/repositories/blog-repository";
import { HttpStatus } from "../../../core/types/http-statuses";
import { postRepository } from "../../repositories/post-repository";

export const updatePostHandler = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const post = await postRepository.findById(req.params.id);
    if (!post) {
      res.status(HttpStatus.NotFound).send({ errorsMessages: [{ field: "id", message: "Post does not exist" }] });
      return;
    }
    const blog = await blogRepository.findById(req.body.blogId);
    if (!blog) {
      res.status(HttpStatus.NotFound).send({ errorsMessages: [{ field: "blogId", message: "Blog does not exist" }] });
      return;
    }

    await postRepository.update(req.params.id, req.body, blog.name);
    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
