import { prisma } from "../index";
import * as dotenv from "dotenv";

dotenv.config();

export async function createRoleService(body: {
  name: string;
  description: string;
}): Promise<{ role?: {}; error?: string }> {
  try {
    // create permission
    const role = await prisma.role.create({
      data: {
        name: body.name,
        description: body.description,
      },
    });

    return { role: role };
  } catch (error) {
    console.log(error);
    return { error: "Error in createPermission" };
  }
}

export async function getRoleService({
  name,
}: {
  name: string;
}): Promise<{ role?: {}; error?: string }> {
  console.log(name);
  try {
    const foundRole = await prisma.role.findUnique({
      where: {
        name: name,
      },
    });

    if (!foundRole) return { role: {}, error: "Can't find permission" };

    return { role: foundRole };
  } catch (error) {
    console.log(error);
    return { error: "Error in readPermission" };
  }
}
