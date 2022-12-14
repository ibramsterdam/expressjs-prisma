import express from "express";
import { createRoleService, getRoleService, getRolesService } from "../services/role.service";

export async function createRoleController(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const result = await createRoleService(req.body);

    if (result.error) return res.status(400).send(result.error);
    if (result.role) return res.status(200).send(result.role);

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
    const result = await getRoleService(req.body);

    if (result.error) return res.status(400).send(result.error);
    if (result.role) return res.status(200).send(result.role);
  } catch (err: any) {
    console.error(`Err while getting`, err.message);
    next(err);
  }
}

export async function getRolesController(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
  try {
    const result = await getRolesService();

    if (result.error) return res.status(400).send(result.error);
    if (result.roles) return res.status(200).send(result.roles);
  } catch (err: any) {
    console.error(`Err while getting`, err.message);
    next(err);
  }
}

