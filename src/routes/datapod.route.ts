import express from "express";
import {validateToken} from "../middleware/authentication.middleware";

import {
    createDatapodController,
    deleteDatapodController,
    readDatapodController,
    readDatapodsController,
    readMyDatapodsController,
    updateDatapodController,
} from "../controllers/datapod.controller";

export const datapodRouter = express.Router();


datapodRouter.post("/create-datapod", validateToken, createDatapodController);

datapodRouter.get("/read-datapod/:id", validateToken, readDatapodController);

datapodRouter.get("/read-datapods", validateToken, readDatapodsController);

datapodRouter.put("/update-datapod/:id", validateToken, updateDatapodController);

datapodRouter.delete("/delete-datapod/:id", validateToken, deleteDatapodController);

datapodRouter.get("/read-my-datapods/:id", validateToken, readMyDatapodsController);


// add-user-to datapod
// get-shared-datapods