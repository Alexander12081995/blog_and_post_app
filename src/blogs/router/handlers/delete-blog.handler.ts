import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { blogRepository } from "../../repositories/blog-repository";

export const deleteBlogHandler = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const blog = await blogRepository.findById(req.params.id);

    if (!blog) {
      res.sendStatus(HttpStatus.NotFound);
      return;
    }

    await blogRepository.delete(req.params.id);
    res.sendStatus(HttpStatus.NoContent);

    // db.posts = db.posts.filter((p) => p.blogId !== db.blogs[blogIndex].id);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
