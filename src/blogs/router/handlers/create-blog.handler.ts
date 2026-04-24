import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { BlogCreateInputDto } from "../../dto/blog.input-dto";
import { blogRepository } from "../../repositories/blog-repository";
import { Blog } from "../../types/blog.types";
import { mapToBlogViewModel } from "../mappers/map-to-blog-view-model.util";

export const createBlogHandler = async (req: Request<{}, {}, BlogCreateInputDto>, res: Response<Blog>) => {
  try {
    const newBlog: Blog = {
      name: req.body.name,
      description: req.body.description,
      websiteUrl: req.body.websiteUrl,
      createdAt: new Date().toISOString(),
      isMembership: false,
    };

    const createdBlog = await blogRepository.create(newBlog);
    const blogViewModel = mapToBlogViewModel(createdBlog);

    res.status(HttpStatus.Created).send(blogViewModel);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
