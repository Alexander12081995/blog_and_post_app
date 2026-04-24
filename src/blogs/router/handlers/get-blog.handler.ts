import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { blogRepository } from "../../repositories/blog-repository";
import { mapToBlogViewModel } from "../mappers/map-to-blog-view-model.util";

export const getBlogHandler = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const blog = await blogRepository.findById(req.params.id);

    if (!blog) {
      res.sendStatus(HttpStatus.NotFound);
      return;
    }

    const blogViewModel = mapToBlogViewModel(blog);
    res.status(HttpStatus.Ok).send(blogViewModel);
  } catch (e) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
