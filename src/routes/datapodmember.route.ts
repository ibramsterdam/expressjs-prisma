import express from "express";
import {validateToken} from "../middleware/authentication.middleware";

import {
    addMemberOnDatapodController,
    readMembersOnDatapodController,
    readDatapodsOnUserController,
    deleteMemberOnDatapodController
} from "../controllers/datapodmember.controller";

export const datapodMemberRouter = express.Router();


datapodMemberRouter.post("/add-member/:datapodId", validateToken, addMemberOnDatapodController);

datapodMemberRouter.get("/read-members/:datapodId", validateToken, readMembersOnDatapodController);

datapodMemberRouter.get("/read-shared-datapods/:userId", validateToken, readDatapodsOnUserController);

datapodMemberRouter.delete("/delete-member/:datapodId", validateToken, deleteMemberOnDatapodController);
