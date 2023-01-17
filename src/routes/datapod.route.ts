import express from "express";
import { validateToken } from "../middleware/authentication.middleware";

import {
  addUserToDatapodController,
  createDatapodController,
  deleteUserOnDatapodController,
  getMyDatapodsController,
  getOneDatapodController,
  getSharedDatapodsController,
  getUsersFromDatapodController,
  searchMyDatapodsController,
  searchSharedDatapodsController,
  updateRoleOfUserOnDatapodController,
  uploadBackgroundPhotoController,
  deleteDatapodController,
} from "../controllers/datapod.controller";

export const datapodRouter = express.Router();

datapodRouter.post("/create-datapod", validateToken, createDatapodController);

datapodRouter.get(
  "/get-one-datapod/:id",
  validateToken,
  getOneDatapodController
);

datapodRouter.get("/get-my-datapods", validateToken, getMyDatapodsController);

datapodRouter.get(
  "/get-shared-datapods",
  validateToken,
  getSharedDatapodsController
);

datapodRouter.get(
  "/search-my-datapods",
  validateToken,
  searchMyDatapodsController
);

datapodRouter.get(
  "/search-shared-datapods",
  validateToken,
  searchSharedDatapodsController
);

datapodRouter.post(
  "/add-user/:datapodId",
  validateToken,
  addUserToDatapodController
);

datapodRouter.get(
  "/get-users/:datapodId",
  validateToken,
  getUsersFromDatapodController
);

datapodRouter.put(
  "/update-user/:datapodId",
  validateToken,
  updateRoleOfUserOnDatapodController
);

datapodRouter.delete(
  "/delete-user/:datapodId",
  validateToken,
  deleteUserOnDatapodController
);

datapodRouter.delete("/delete-datapod", validateToken, deleteDatapodController);

const upload = require("../utils/multer");

datapodRouter.post(
  "/upload-background-photo/:datapodId",
  upload.single("file"),
  validateToken,
  uploadBackgroundPhotoController
);
