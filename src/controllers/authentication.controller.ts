import express from "express";
import {
  loginService,
  registerService,
  getUserService,
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

  try {
    const result = await loginService(email, password);

    if (result.error) {
      res.status(400).send(result.error);
    }
    if (result.access_token) res.status(200).send(result);
  } catch (err: any) {
    console.error(`Err while getting`, err.message);
    next(err);
  }
}

export async function getUserController(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const result = await getUserService(res.locals.jwt);

    if (result.error) {
      res.status(400).send(result.error);
    }
    if (result.user) res.status(200).send(result.user);
  } catch (err: any) {
    console.error(`Err while getting`, err.message);
    next(err);
  }
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

  console.log(password);

  try {
    const result = await registerService(email, password);
    if (result.error) {
      res.status(400).send("Bad Request");
    }
    if (result.access_token) res.status(200).send(result);
  } catch (err: any) {
    console.error(`Err while getting`, err.message);
    next(err);
  }
}
