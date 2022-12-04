import express from "express";
import {
  editUserController,
  getUserByEmailController,
  getUserController,
  loginController,
  registerController,
} from "../controllers/authentication.controller";
import { validateToken } from "../middleware/authentication.middleware";

export const authenticationRouter = express.Router();

authenticationRouter.get("/get-user", validateToken, getUserController);

authenticationRouter.post("/edit-user", validateToken, editUserController);

authenticationRouter.get(
  "/get-user-by-email/:email",
  validateToken,
  getUserByEmailController
);

authenticationRouter.post("/login", loginController);

authenticationRouter.post("/register", registerController);
