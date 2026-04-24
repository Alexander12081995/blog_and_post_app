import { Router } from "express";
import { superAdminGuardMiddleware } from "../../auth/middlewares/super-admin.guard-middleware";
import { inputValidationResultMiddleware } from "../../core/middlewares/validation/input-validation-result.middleware";
import { idValidation } from "../../core/middlewares/validation/params-id.validation-middleware";
import { postInputDtoValidation } from "../validation/post.input-dto-validation-middleware";
import { createPostHandler } from "./handlers/create-post.handler";
import { deletePostHandler } from "./handlers/delete-post.handler";
import { getListPostsHandler } from "./handlers/get-list-posts.handler";
import { getPostHandler } from "./handlers/get-post.handler";
import { updatePostHandler } from "./handlers/update-post.handler";

export const postsRouter = Router({});

postsRouter
  .get("", getListPostsHandler)
  .get("/:id", idValidation, inputValidationResultMiddleware, getPostHandler)
  .post("", superAdminGuardMiddleware, postInputDtoValidation, inputValidationResultMiddleware, createPostHandler)
  .put(
    "/:id",
    superAdminGuardMiddleware,
    idValidation,
    postInputDtoValidation,
    inputValidationResultMiddleware,
    updatePostHandler,
  )
  .delete("/:id", superAdminGuardMiddleware, idValidation, deletePostHandler);
