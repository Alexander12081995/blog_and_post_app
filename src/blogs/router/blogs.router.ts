import { Router } from "express";
import { superAdminGuardMiddleware } from "../../auth/middlewares/super-admin.guard-middleware";
import { inputValidationResultMiddleware } from "../../core/middlewares/validation/input-validation-result.middleware";
import { idValidation } from "../../core/middlewares/validation/params-id.validation-middleware";
import { blogInputDtoValidation } from "../validation/blog.input-dto-validation-middleware";
import { createBlogHandler } from "./handlers/create-blog.handler";
import { deleteBlogHandler } from "./handlers/delete-blog.handler";
import { getBlogHandler } from "./handlers/get-blog.handler";
import { getListBlogsHandler } from "./handlers/get-list-blogs.handler";
import { updateBlogHandler } from "./handlers/update-blog.handler";

export const blogsRouter = Router({});

blogsRouter
  .get("", getListBlogsHandler)
  .get("/:id", idValidation, inputValidationResultMiddleware, getBlogHandler)
  .post("", superAdminGuardMiddleware, blogInputDtoValidation, inputValidationResultMiddleware, createBlogHandler)
  .put(
    "/:id",
    superAdminGuardMiddleware,
    idValidation,
    blogInputDtoValidation,
    inputValidationResultMiddleware,
    updateBlogHandler,
  )
  .delete("/:id", superAdminGuardMiddleware, idValidation, inputValidationResultMiddleware, deleteBlogHandler);
