import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { blogRepository } from "../../repositories/blog-repository";
import { mapToBlogViewModel } from "../mappers/map-to-blog-view-model.util";

export const getListBlogsHandler = async (req: Request, res: Response) => {
  try {
    const blogs = await blogRepository.findAll();
    const blogsViewModel = blogs.map(mapToBlogViewModel);
    res.send(blogsViewModel);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
