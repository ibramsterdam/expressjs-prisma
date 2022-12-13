import express from "express";
import { validateToken } from "../middleware/authentication.middleware";
import {
    editUserController,
    getUserByEmailController,
    getUserController,
    uploadProfilePictureController
} from "../controllers/user.controller";

export const userRouter = express.Router();

const upload = require("../utils/multer");

userRouter.get("/get-user", validateToken, getUserController);

userRouter.get(
    "/get-user-by-email/:email",
    validateToken,
    getUserByEmailController
);

userRouter.post("/edit-user", validateToken, editUserController);

userRouter.post("/upload-profile-picture/", upload.single("file"), validateToken, uploadProfilePictureController);