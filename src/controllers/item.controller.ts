import express from "express";
import {
  deleteItemService,
  uploadItemService,
  getItemsService,
} from "../services/item.service";

export async function getItemsController(
  req: express.Request,
  res: express.Response
) {
  const result = await getItemsService(Number(req.params.datapodId));

  if (result.error) return res.status(400).send(result.error);
  if (result.items) return res.status(200).send(result.items);
}

export async function uploadItemController(
  req: express.Request,
  res: express.Response
) {
  const result = await uploadItemService(req, res);

  if (result.error) return res.status(400).send(result.error);
  if (result.item) return res.status(200).send(result.item);
}

export async function deleteItemController(
  req: express.Request,
  res: express.Response
) {
  const result = await deleteItemService(Number(req.params.id));
  if (result.error) return res.status(400).send(result.error);
  if (result.item) return res.status(200).send(result.item);
}
