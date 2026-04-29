import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { blogsService } from "../../application/blog.service";

export const deleteBlogHandler = async (req: Request<{ id: string }>, res: Response) => {
  try {
    await blogsService.delete(req.params.id);

    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
