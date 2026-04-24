import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { BlogUpdateInputDto } from "../../dto/blog.input-dto";
import { blogRepository } from "../../repositories/blog-repository";

export const updateBlogHandler = async (req: Request<{ id: string }, {}, BlogUpdateInputDto>, res: Response) => {
  try {
    const blog = await blogRepository.findById(req.params.id);

    if (!blog) {
      res.sendStatus(HttpStatus.NotFound);
      return;
    }

    await blogRepository.update(req.params.id, req.body);

    // postRepository.updateBlogNameForPosts(req.params.id, req.body.name);

    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
