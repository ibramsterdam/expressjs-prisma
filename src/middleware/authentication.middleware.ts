const jwt = require("jsonwebtoken");
import Express from "express";
import * as dotenv from "dotenv";
dotenv.config();

export const validateToken = (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const token = req.header("authorization")?.slice(7);

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.jwt = decodedJWT;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export interface Payload {
  sub: number;
  email: string;
  iat: number;
  exp: number;
}
