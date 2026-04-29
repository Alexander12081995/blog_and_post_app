import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { blogsService } from "../../application/blog.service";
import { BlogCreateInputDto } from "../../dto/blog.input-dto";
import { Blog } from "../../types/blog.types";
import { mapToBlogViewModel } from "../mappers/map-to-blog-view-model.util";

export const createBlogHandler = async (req: Request<{}, {}, BlogCreateInputDto>, res: Response<Blog>) => {
  try {
    const createdBlog = await blogsService.create(req.body);

    const blogViewModel = mapToBlogViewModel(createdBlog);

    res.status(HttpStatus.Created).send(blogViewModel);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
