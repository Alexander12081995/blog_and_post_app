import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { blogsService } from "../../application/blog.service";
import { BlogUpdateInputDto } from "../../dto/blog.input-dto";
export const updateBlogHandler = async (req: Request<{ id: string }, {}, BlogUpdateInputDto>, res: Response) => {
  try {
    await blogsService.update(req.params.id, req.body);
    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
