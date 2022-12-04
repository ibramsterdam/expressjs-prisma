import { PrismaClient } from "@prisma/client";
import express from "express";
import { authenticationRouter } from "./routes/authentication.route";
import { datapodRouter } from "./routes/datapod.route";
import { roleRouter } from "./routes/role.route";

import * as dotenv from "dotenv";
import { itemRouter } from "./routes/item.route";
dotenv.config();

export const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use("/auth", authenticationRouter);
app.use("/datapod", datapodRouter);
app.use("/role", roleRouter);
app.use("/item", itemRouter);

app.listen(process.env.PORT, () =>
  console.log(`
🚀 Server ready at: http://localhost:${process.env.PORT}`)
);
