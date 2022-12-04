import express from "express";
import { validateToken } from "../middleware/authentication.middleware";

import {
  createDatapodController,
  getOneDatapodController,
  getMyDatapodsController,
  getSharedDatapodsController,
  getUsersFromDatapodController,
  addUserToDatapodController,
  updateRoleOfUserOnDatapodController,
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
