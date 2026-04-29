import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { blogsService } from "../../application/blog.service";
import { mapToBlogViewModel } from "../mappers/map-to-blog-view-model.util";

export const getBlogHandler = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const blog = await blogsService.findById(req.params.id);
    const blogViewModel = mapToBlogViewModel(blog);
    res.status(HttpStatus.Ok).send(blogViewModel);
  } catch (e) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
