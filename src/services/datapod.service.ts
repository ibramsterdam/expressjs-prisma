import {prisma} from "../index";
import * as dotenv from "dotenv";
import {Payload} from "../middleware/authentication.middleware";
import {getUserByEmailService} from "./user.service";
import {User} from "@prisma/client";
import {v2 as cloudinary} from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

dotenv.config();

export interface GetUserResponse {
    userId: number;
    datapodId: number;
    role_name: string;
    roleExpireDate: null | Date;
    user: User;
}

export async function createDatapodService(
    {title, description}: { title: string; description: string },
    jtwPayload: Payload
): Promise<{
    datapod?: any;
    error?: string;
}> {
    try {
        // create datapod
        const datapod = await prisma.datapod.create({
            data: {
                title: title,
                description: description,
            },
        });

        // Make connection
        await prisma.userOnDatapodwithRole.create({
            data: {
                datapodId: datapod.id,
                userId: jtwPayload.sub,
                role_name: "Owner",
            },
        });

        return {datapod: datapod};
    } catch (error) {
        console.log(error);
        return {error: "Error in createDatapod"};
    }
}

export async function getOneDatapodService(
    id: number,
    jtwPayload: Payload
): Promise<{ datapod?: {}; error?: string }> {
    try {
        const datapod = await prisma.userOnDatapodwithRole.findUnique({
            where: {
                userId_datapodId: {userId: jtwPayload.sub, datapodId: id},
            },
            include: {
                datapod: true,
            },
        });

        if (!datapod)
            return {error: "Can't find a datapod that matches your stuff"};

        return {datapod: datapod};
    } catch (error) {
        console.log(error);
        return {error: "Error in getOneDatapodService"};
    }
}

export async function getMyDatapodsService(
    jtwPayload: Payload
): Promise<{ datapods?: {}; error?: string }> {
    try {
        const datapods = await prisma.datapod.findMany({
            where: {
                users_on_datapod_with_role: {
                    some: {userId: jtwPayload.sub, role_name: {contains: "Owner"}},
                },
            },
        });

        if (!datapods) return {error: "Can't find a single datapod"};

        return {datapods: datapods};
    } catch (error) {
        console.log(error);
        return {error: "Error in getMyDatapodsService"};
    }
}

export async function getSharedDatapodsService(
    jtwPayload: Payload
): Promise<{ datapods?: {}; error?: string }> {
    try {
        const datapods = await prisma.datapod.findMany({
            where: {
                users_on_datapod_with_role: {
                    some: {
                        userId: jtwPayload.sub,
                        roleExpireDate: {gt: new Date()},
                        NOT: {role_name: "Owner"},
                    },
                },
            },
        });

        if (!datapods) return {error: "Can't find a single datapod"};

        return {datapods: datapods};
    } catch (error) {
        console.log(error);
        return {error: "Error in getSharedDatapodsService"};
    }
}


export async function searchMyDatapodsService(
    jtwPayload: Payload,
    query?: string
): Promise<{ datapods?: {}; error?: string }> {
  try {
    const datapods = await prisma.datapod.findMany({
      where: {
        title: {
          contains: query
        },
        users_on_datapod_with_role: {
          some: { userId: jtwPayload.sub, role_name: { contains: "Owner" } },
        },
      },
    });

    if (!datapods) return { datapods: [] };

    return { datapods: datapods };
  } catch (error) {
    console.log(error);
    return { error: "Error in searchMyDatapodsService" };
  }
}

export async function searchSharedDatapodsService(
    jtwPayload: Payload,
    query?: string
): Promise<{ datapods?: {}; error?: string }> {
  try {
    const datapods = await prisma.datapod.findMany({
      where: {
        title: {
          contains: query
        },
        users_on_datapod_with_role: {
          some: {
            userId: jtwPayload.sub,
            roleExpireDate: { gt: new Date() },
            NOT: { role_name: "Owner" },
          },
        },
      },
    });

    if (!datapods) return { datapods: [] };

    return { datapods: datapods };
  } catch (error) {
    console.log(error);
    return { error: "Error in searchSharedDatapodsService" };
  }
}


export async function getUsersFromDatapodService(
    datapodId: number,
    jtwPayload: Payload
): Promise<{ users?: {}; error?: string }> {
    try {
        const users = await prisma.userOnDatapodwithRole.findMany({
            where: {
                OR: [
                    {
                        datapodId: datapodId,
                        roleExpireDate: {
                            gt: new Date(),
                        },
                    },
                    {
                        datapodId: datapodId,
                        roleExpireDate: null,
                    },
                ],
            },
            include: {
                user: true,
            },
        });

        // Make sure the first user in the list is the user that is requesting the list
        const _users: GetUserResponse[] = users.reduce(
            (accumulator: GetUserResponse[], user: GetUserResponse) => {
                if (user.userId === jtwPayload.sub) {
                    accumulator.unshift(user);
                } else {
                    accumulator.push(user);
                }

                return accumulator;
            },
            []
        );

        if (!users) return {error: "Can't find a users for some reason"};

        return {users: _users};
    } catch (error) {
        console.log(error);
        return {error: "Error in getUsersFromDatapodService"};
    }
}

export async function addUserToDatapodService(
    email: string,
    datapodId: number,
    jtwPayload: Payload
): Promise<{ users?: {}; error?: string }> {
    try {
        const invitingUser = await prisma.userOnDatapodwithRole.findUnique({
            where: {
                userId_datapodId: {userId: jtwPayload.sub, datapodId},
            },
        });

        if (
            invitingUser?.role_name === "Owner" ||
            invitingUser?.role_name === "Manager"
        ) {
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

            if (user) {
                const date = new Date();
                date.setDate(date.getDate() + 7);

                const users = await prisma.userOnDatapodwithRole.create({
                    data: {
                        datapodId: datapodId,
                        userId: user.id,
                        role_name: "Reader",
                        roleExpireDate: date,
                    },
                });

                if (!users) return {error: "Can't find a users for some reason"};

                return {users: users};
            }

            return {error: "Cant find user by email"};
        }

        return {error: "User is not allowed to update"};
    } catch (error) {
        console.log(error);
        return {error: "Error in addUserToDatapodService"};
    }
}

export async function updateRoleOfUserOnDatapodService(
    userId: number,
    role_name: string,
    expiration_date: Date,
    datapodId: number,
    jtwPayload: Payload
): Promise<{ user?: {}; error?: string }> {
    try {
        const user = await prisma.userOnDatapodwithRole.findUnique({
            where: {
                userId_datapodId: {userId: jtwPayload.sub, datapodId},
            },
        });

        if (user) {
            if (user.role_name == "Manager" || user.role_name == "Owner") {
                const userToBeUpdated = await prisma.userOnDatapodwithRole.findUnique({
                    where: {
                        userId_datapodId: {userId, datapodId},
                    },
                });

                if (userToBeUpdated) {
                    if (
                        userToBeUpdated.role_name === "Owner" &&
                        user.role_name === "Manager"
                    ) {
                        return {error: "Can't update an Owner as a Manager"};
                    }

                    if (user.role_name === "Manager" && role_name === "Owner") {
                        return {
                            error: "Can't update someone to Owner status as a Manager",
                        };
                    }

                    const convertExpirationDate = new Date(expiration_date)

                    const updatedUser = await prisma.userOnDatapodwithRole.update({
                        where: {
                            userId_datapodId: {userId, datapodId},
                        },
                        data: {
                            role_name: role_name,
                            roleExpireDate: role_name === "Owner" ? null : convertExpirationDate,
                        },
                    });

                    if (!updatedUser)
                        return {error: "Can't update a user for some reason"};

                    return {user: updatedUser};
                }
                return {error: "Can't update a user for some reason"};
            }
            return {error: "You don't have permission"};
        }
        return {error: "Can't find a user in this datapod"};
    } catch (error) {
        console.log(error);
        return {error: "Error in updateRoleOfUserOnDatapodService"};
    }
}

export async function deleteUserOnDatapodService(
    userId: number,
    datapodId: number,
    jtwPayload: Payload
): Promise<{ user?: {}; error?: string }> {
    try {
        const user = await prisma.userOnDatapodwithRole.findUnique({
            where: {
                userId_datapodId: {userId: jtwPayload.sub, datapodId},
            },
        });
        const targetUser = await prisma.userOnDatapodwithRole.findUnique({
            where: {
                userId_datapodId: {userId, datapodId},
            },
        });
        const ownerCountInDatapod = await prisma.userOnDatapodwithRole.count({
            where: {
                datapodId: datapodId,
                role_name: "Owner",
            },
        });

        if (user && targetUser) {
            if (targetUser.role_name == "Owner" && ownerCountInDatapod === 1)
                return {error: "There should be one owner in the Datapod at least"};
            if (targetUser.role_name == "Owner" && user.role_name === "Manager")
                return {error: "Manager can't delete an Owner"};

            if (user.role_name == "Owner") {
                const deletedUser = await prisma.userOnDatapodwithRole.delete({
                    where: {
                        userId_datapodId: {userId, datapodId},
                    },
                });
                if (!deletedUser)
                    return {error: "Can't delete a user for some reason"};

                return {user: deletedUser};
            }

            if (user.role_name == "Manager") {
                const deletedUser = await prisma.userOnDatapodwithRole.delete({
                    where: {
                        userId_datapodId: {userId, datapodId},
                    },
                });
                if (!deletedUser)
                    return {error: "Can't delete a user for some reason"};
                return {user: deletedUser};
            }

            //When the requesting user is neither Manager or Owner
            return {error: "You don't have permission"};
        }
        return {error: "Can't find a user"};
    } catch (error) {
        console.log(error);
        return {error: "Error in deleteUserOnDatapodService"};
    }
}

export async function uploadBackgroundPhotoService(
    req: any,
    datapodId: number,
    res: any,
    jwtPayload: Payload
): Promise<{ backgroundPhoto?: {}; error?: string }> {
    try {
        const user = await prisma.userOnDatapodwithRole.findUnique({
            where: {
                userId_datapodId: {userId: jwtPayload.sub, datapodId},
            },
        });

        if (user) {
            if (user.role_name == "Manager" || user.role_name == "Owner") {
                const uploadedFile = await cloudinary.uploader.upload(
                    req.file.path,
                    {
                        overwrite: true,
                        invalidate: true,
                    },
                    function (error: any, result: any) {
                        return {backgroundPhoto: {}, error: "Can't upload item"};
                    }
                );

                const uploadedBackgroundPhoto = await prisma.datapod.update({
                    where: {
                        id: datapodId,
                    },
                    data: {
                        backgroundPhoto: uploadedFile.secure_url,
                    },
                });

                return {backgroundPhoto: uploadedBackgroundPhoto};
            }
            return {error: "You don't have permission"};
        }
        return {error: "Can't find a user in this datapod"};
    } catch (error) {
        console.log(error);
        return {error: "Error during upload"};
    }
}
