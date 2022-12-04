import express from "express";
import { validateToken } from "../middleware/authentication.middleware";
import {
  deleteItemController,
  getItemsController,
  uploadItemController,
} from "../controllers/item.controller";

const upload = require("../utils/multer");

export const itemRouter = express.Router();

itemRouter.get("/get-items/:datapodId", validateToken, getItemsController);

itemRouter.post("/upload-item/", upload.single("file"), uploadItemController);

itemRouter.delete("/delete-item/:id", validateToken, deleteItemController);
