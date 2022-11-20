import { prisma } from "../index";
import * as dotenv from "dotenv";

dotenv.config();

export async function createPermissionService(body: {
  name: string;
  description: string;
}): Promise<{ permission?: {}; error?: string }> {
  try {
    // create permission
    const permission = await prisma.permission.create({
      data: {
        name: body.name,
        description: body.description,
      },
    });

    return { permission: permission };
  } catch (error) {
    console.log(error);
    return { error: "Error in createPermission" };
  }
}

export async function readPermissionService(
  id: number
): Promise<{ permission?: {}; error?: string }> {
  try {
    const foundPermission = await prisma.permission.findUnique({
      where: {
        id: id,
      },
    });

    if (!foundPermission)
      return { permission: {}, error: "Can't find permission" };

    return { permission: foundPermission };
  } catch (error) {
    console.log(error);
    return { error: "Error in readPermission" };
  }
}

export async function updatePermissionService(
  id: number,
  body: {
    name: string;
    description: string;
  }
): Promise<{ permission?: {}; error?: string }> {
  try {
    const updatedPermission = await prisma.permission.update({
      where: {
        id: id,
      },
      data: {
        name: body.name,
        description: body.description,
      },
    });

    return { permission: updatedPermission };
  } catch (error) {
    console.log(error);
    return { error: "Error in updatePermission" };
  }
}

export async function deletePermissionService(
  id: number
): Promise<{ permission?: {}; error?: string }> {
  try {
    const deletedPermission = await prisma.permission.delete({
      where: {
        id: id,
      },
    });

    if (!deletedPermission)
      return {
        permission: {},
        error: "Can't delete permission because it doesn't exist",
      };

    return { permission: deletedPermission };
  } catch (error) {
    console.log(error);
    return { error: "Error in deletePermission" };
  }
}
