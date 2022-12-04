import express from "express";
import {
  loginService,
  registerService,
  getUserService,
  getUserByEmailService,
  editUserService,
} from "../services/authentication.service";
import { validateEmail } from "../helpers/validateEmail";
import { isValidPassword } from "../helpers/validatePassword";

export async function loginController(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const _email: string = req.body.email;
  const email = _email.toLowerCase(); // make email always lowercase

  const password: string = req.body.password;

  if (
    email === undefined ||
    password === undefined ||
    validateEmail(email) !== undefined ||
    !isValidPassword(password)
  ) {
    return res.status(400).send("Bad Request!");
  }

  const result = await loginService(email, password);

  if (result.error) {
    res.status(400).send(result.error);
  }
  if (result.access_token) res.status(200).send(result);
}

export async function getUserController(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const result = await getUserService(res.locals.jwt);

  if (result.error) {
    res.status(400).send(result.error);
  }
  if (result.user) res.status(200).send(result.user);
}

export async function getUserByEmailController(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const result = await getUserByEmailService(req.params.email);

  if (result.error) {
    res.status(400).send(result.error);
  }
  if (result.user) res.status(200).send(result.user);
}

export async function registerController(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const _email: string = req.body.email;
  const email = _email.toLowerCase(); // make email always lowercase
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  if (
    password !== confirmPassword ||
    email === undefined ||
    password === undefined ||
    confirmPassword === undefined ||
    validateEmail(email) !== undefined ||
    !isValidPassword(password)
  ) {
    return res.status(400).send("Bad Request!");
  }

  const result = await registerService(email, password);
  if (result.error) {
    res.status(400).send(result.error);
  }
  if (result.access_token) res.status(200).send(result);
}

export async function editUserController(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const result = await getUserService(res.locals.jwt);

  try {
    const updatedUser = await editUserService(req.body, res.locals.jwt);
    res.status(200).send(updatedUser);
  } catch (err: any) {
    console.error(`Err while getting`, err.message);
    next(err);
  }
}
