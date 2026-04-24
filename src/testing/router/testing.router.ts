import { Router } from "express";
import { superAdminGuardMiddleware } from "../../auth/middlewares/super-admin.guard-middleware";
import { inputValidationResultMiddleware } from "../../core/middlewares/validation/input-validation-result.middleware";
import { cleanDBHandler } from "./handlers/cleanDB-handler";

export const testingRouter = Router({});

testingRouter.delete("", superAdminGuardMiddleware, inputValidationResultMiddleware, cleanDBHandler);
