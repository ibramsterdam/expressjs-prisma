import * as argon from "argon2";
import { prisma } from "../index";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as dotenv from "dotenv";
const jwt = require("jsonwebtoken");
dotenv.config();

export async function loginService(
  email: string,
  password: string
): Promise<{ access_token?: string; error?: string }> {
  console.log("Loggin in with email: ", email, "\n and password: ", password);
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) return { error: "Can't find user" };

  const isMatch = await argon.verify(user.hash, password);

  if (!isMatch) return { error: "Wrong password" };

  return signToken(user.id, user.email);
}

export async function getUserService({
  email,
}: {
  email: string;
}): Promise<{ user?: {}; error?: string }> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        email: true,
        firstName: true,
        lastName: true,
        hash: false,
      },
    });

    if (!user) return { error: "Can't find user" };

    return { user: user };
  } catch (error) {
    console.log(error);
    return { error: "Error in getUserService" };
  }
}

export async function getUserByEmailService(
  email: string
): Promise<{ user?: {}; error?: string }> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        email: true,
        firstName: true,
        lastName: true,
        hash: false,
      },
    });

    if (!user) return { error: "Can't find user" };

    return { user: user };
  } catch (error) {
    console.log(error);
    return { error: "Error in getUserService" };
  }
}

export async function registerService(
  email: string,
  password: string
): Promise<{ access_token?: string; error?: string }> {
  console.log("Registering with email: ", email, "\n and password: ", password);

  try {
    const hash = await argon.hash(password);
    const user = await prisma.user.create({
      data: {
        email: email,
        hash,
      },
    });
    return signToken(user.id, user.email);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { error: "Credentials taken" };
      }
    }
    return { error: "Error in registerService" };
  }
}

async function signToken(
  userId: number,
  email: string
): Promise<{ access_token: string }> {
  const payload = {
    sub: userId,
    email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "43200000",
  });

  return {
    access_token: token,
  };
}
