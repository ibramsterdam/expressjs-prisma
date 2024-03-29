import express from "express";
import {
  createDatapodService,
  getOneDatapodService,
  getMyDatapodsService,
  getSharedDatapodsService,
  getUsersFromDatapodService,
  addUserToDatapodService,
  updateRoleOfUserOnDatapodService,
  deleteUserOnDatapodService,
  uploadBackgroundPhotoService,
  searchSharedDatapodsService,
  searchMyDatapodsService,
  deleteDatapodService,
} from "../services/datapod.service";

export async function createDatapodController(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const result = await createDatapodService(req.body, res.locals.jwt);

  if (result.error) return res.status(400).send(result.error);
  if (result.datapod) return res.status(200).send(result.datapod);
}

export async function getOneDatapodController(
  req: express.Request,
  res: express.Response
) {
  const result = await getOneDatapodService(
    Number(req.params.id),
    res.locals.jwt
  );

  if (result.error) return res.status(400).send(result.error);
  if (result.datapod) return res.status(200).send(result.datapod);
}

export async function getMyDatapodsController(
  req: express.Request,
  res: express.Response
) {
  const result = await getMyDatapodsService(res.locals.jwt);

  if (result.error) return res.status(400).send(result.error);
  if (result.datapods) return res.status(200).send(result.datapods);
}
export async function getSharedDatapodsController(
  req: express.Request,
  res: express.Response
) {
  const result = await getSharedDatapodsService(res.locals.jwt);

  if (result.error) return res.status(400).send(result.error);
  if (result.datapods) return res.status(200).send(result.datapods);
}

export async function searchMyDatapodsController(
  req: express.Request,
  res: express.Response
) {
  const result = await searchMyDatapodsService(
    res.locals.jwt,
    String(req.query.query)
  );

  if (result.error) return res.status(400).send(result.error);
  if (result.datapods) return res.status(200).send(result.datapods);
}

export async function searchSharedDatapodsController(
  req: express.Request,
  res: express.Response
) {
  const result = await searchSharedDatapodsService(
    res.locals.jwt,
    String(req.query.query)
  );

  if (result.error) return res.status(400).send(result.error);
  if (result.datapods) return res.status(200).send(result.datapods);
}

export async function getUsersFromDatapodController(
  req: express.Request,
  res: express.Response
) {
  const result = await getUsersFromDatapodService(
    Number(req.params.datapodId),
    res.locals.jwt
  );

  if (result.error) return res.status(400).send(result.error);
  if (result.users) return res.status(200).send(result.users);
}

export async function addUserToDatapodController(
  req: express.Request,
  res: express.Response
) {
  const _email: string = req.body.email;
  const email = _email.toLowerCase().trim();
  const result = await addUserToDatapodService(
    email,
    Number(req.params.datapodId),
    res.locals.jwt
  );

  if (result.error) return res.status(400).send(result.error);
  if (result.users) return res.status(200).send(result.users);
}

export async function updateRoleOfUserOnDatapodController(
  req: express.Request,
  res: express.Response
) {
  const result = await updateRoleOfUserOnDatapodService(
    Number(req.body.userId),
    req.body.role_name,
    req.body.expiration_date,
    Number(req.params.datapodId),
    res.locals.jwt
  );

  if (result.error) return res.status(400).send(result.error);
  if (result.user) return res.status(200).send(result.user);
}

export async function deleteUserOnDatapodController(
  req: express.Request,
  res: express.Response
) {
  const result = await deleteUserOnDatapodService(
    Number(req.body.userId),
    Number(req.params.datapodId),
    res.locals.jwt
  );

  if (result.error) return res.status(400).send(result.error);
  if (result.user) return res.status(200).send(result.user);
}

export async function deleteDatapodController(
  req: express.Request,
  res: express.Response
) {
  const result = await deleteDatapodService(
    Number(req.body.datapodId),
    res.locals.jwt
  );

  if (result.error) return res.status(400).send(result.error);
  if (result.datapod) return res.status(200).send(result.datapod);
}

export async function uploadBackgroundPhotoController(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const result = await uploadBackgroundPhotoService(
    req,
    Number(req.params.datapodId),
    res,
    res.locals.jwt
  );

  if (result.error) return res.status(400).send(result.error);
  if (result.backgroundPhoto)
    return res.status(200).send(result.backgroundPhoto);
}
