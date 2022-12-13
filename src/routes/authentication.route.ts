import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/authentication.controller";
import { validateToken } from "../middleware/authentication.middleware";

export const authenticationRouter = express.Router();

authenticationRouter.post("/login", loginController);

authenticationRouter.post("/register", registerController);
