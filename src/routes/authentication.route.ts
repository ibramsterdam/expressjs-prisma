import express from "express";
import {getUserController, loginController, registerController,} from "../controllers/authentication.controller";
import {validateToken} from "../middleware/authentication.middleware";

export const authenticationRouter = express.Router();

authenticationRouter.get("/get-user", validateToken, getUserController);

authenticationRouter.post("/login", loginController);

authenticationRouter.post("/register", registerController);
