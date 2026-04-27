import { Router } from "express";
import { cleanDBHandler } from "./handlers/cleanDB-handler";

export const testingRouter = Router({});

testingRouter.delete("", cleanDBHandler);
