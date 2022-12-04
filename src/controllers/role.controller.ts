import express from "express";
import { createRoleService, getRoleService } from "../services/role.service";

export async function createRoleController(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const newRole = await createRoleService(req.body);

    res.status(200).send(newRole);
  } catch (err: any) {
    console.error(`Err while getting`, err.message);
    next(err);
  }
}

export async function getRoleController(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const foundRole = await getRoleService(req.body);

    res.status(200).send(foundRole);
  } catch (err: any) {
    console.error(`Err while getting`, err.message);
    next(err);
  }
}
