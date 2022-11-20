import express from "express";
import {validateToken} from "../middleware/authentication.middleware";

import {
    createPermissionController,
    deletePermissionController,
    readPermissionController,
    updatePermissionController
} from "../controllers/permission.controller";

export const permissionRouter = express.Router();


permissionRouter.post("/create-permission", validateToken, createPermissionController);

permissionRouter.get("/read-permission/:id", validateToken, readPermissionController);

permissionRouter.put("/update-permission/:id", validateToken, updatePermissionController);

permissionRouter.delete("/delete-permission/:id", validateToken, deletePermissionController);
