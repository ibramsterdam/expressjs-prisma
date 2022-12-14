import express from "express";
import { validateToken } from "../middleware/authentication.middleware";

import {
  createRoleController,
  getRoleController,
    getRolesController
} from "../controllers/role.controller";

export const roleRouter = express.Router();

roleRouter.post("/create-role", validateToken, createRoleController);

roleRouter.get("/get-role/", validateToken, getRoleController);

roleRouter.get("/get-roles/", validateToken, getRolesController);
