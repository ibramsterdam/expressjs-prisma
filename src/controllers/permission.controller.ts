import express from "express";
import {
  createPermissionService,
  deletePermissionService,
  readPermissionService,
  updatePermissionService,
} from "../services/permission.service";

export async function createPermissionController(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const newPermission = await createPermissionService(req.body);

    res.status(200).send(newPermission);
  } catch (err: any) {
    console.error(`Err while getting`, err.message);
    next(err);
  }
}

export async function readPermissionController(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const foundPermission = await readPermissionService(Number(req.params.id));

    res.status(200).send(foundPermission);
  } catch (err: any) {
    console.error(`Err while getting`, err.message);
    next(err);
  }
}

export async function updatePermissionController(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const updatedPermission = await updatePermissionService(
      Number(req.params.id),
      req.body
    );

    res.status(200).send(updatedPermission);
  } catch (err: any) {
    console.error(`Err while getting`, err.message);
    next(err);
  }
}

export async function deletePermissionController(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const deletedPermission = await deletePermissionService(
      Number(req.params.id)
    );

    res.status(200).send(deletedPermission);
  } catch (err: any) {
    console.error(`Err while getting`, err.message);
    next(err);
  }
}
