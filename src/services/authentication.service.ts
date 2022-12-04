import * as argon from "argon2";
import { prisma } from "../index";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as dotenv from "dotenv";
import { Payload } from "../middleware/authentication.middleware";

const jwt = require("jsonwebtoken");
dotenv.config();

export async function loginService(
  email: string,
  password: string
): Promise<{ access_token?: string; error?: string }> {
  console.log("Loggin in...\nemail: ", email, "\nPassword: ", password);

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) return { error: "Can't find user" };

    const isMatch = await argon.verify(user.hash, password);

    if (!isMatch) return { error: "Wrong password" };
    console.log("Successfull login!");

    return signToken(user.id, user.email);
  } catch (error) {
    return { error: "Error fetching" };
  }
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
        displayName: true,
        zip: true,
        city: true,
        state: true,
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
        displayName: true,
        zip: true,
        city: true,
        state: true,
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
  try {
    console.log("Register...\nemail: ", email, "\nPassword: ", password);

    const hash = await argon.hash(password);
    const user = await prisma.user.create({
      data: {
        email: email,
        hash,
      },
    });
    console.log("Successfull Register!");
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

export async function editUserService(
  body: {
    firstName: string;
    lastName: string;
    displayName: string;
    zip: string;
    city: string;
    state: string;
  },
  jtwPayload: Payload
): Promise<{ user?: {}; error?: string }> {
  try {
    console.log("Editing user...");

    const editedUser = await prisma.user.update({
      where: {
        email: jtwPayload.email,
      },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        displayName: body.displayName,
        zip: body.zip,
        city: body.city,
        state: body.state,
      },
    });

    return { user: editedUser };
  } catch (error) {
    console.log(error);
    return { error: "Error in updateUser" };
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
