import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { blogsService } from "../../application/blog.service";
import { mapToBlogViewModel } from "../mappers/map-to-blog-view-model.util";

export const getListBlogsHandler = async (req: Request, res: Response) => {
  try {
    const items = await blogsService.findAll();
    const blogsViewModel = items.map(mapToBlogViewModel);
    res.send(blogsViewModel);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
