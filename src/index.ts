import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";
import { authenticationRouter } from "./routes/authentication.route";
import { datapodRouter } from "./routes/datapod.route";
import { permissionRouter } from "./routes/permission.route";

import * as dotenv from "dotenv";
dotenv.config();

export const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use("/auth", authenticationRouter);
app.use("/datapod", datapodRouter);
app.use("/permission", permissionRouter);

app.listen(process.env.PORT, () =>
  console.log(`
🚀 Server ready at: http://localhost:${process.env.PORT}`)
);
