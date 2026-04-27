import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { postRepository } from "../../../posts/repositories/post-repository";
import { blogRepository } from "../../repositories/blog-repository";

export const deleteBlogHandler = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const blog = await blogRepository.findById(req.params.id);

    if (!blog) {
      res.sendStatus(HttpStatus.NotFound);
      return;
    }

    await blogRepository.delete(req.params.id);
    await postRepository.deleteByBlogId(req.params.id);

    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
