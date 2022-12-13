import {prisma} from "../index";
import * as dotenv from "dotenv";
import {Payload} from "../middleware/authentication.middleware";
import {v2 as cloudinary} from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const jwt = require("jsonwebtoken");
dotenv.config();

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
                zip: true,
                city: true,
                state: true,
                profilePicture: true,
            },
        });

        if (!user) return {error: "Can't find user"};

        return {user: user};
    } catch (error) {
        console.log(error);
        return {error: "Error in getUserService"};
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
                zip: true,
                city: true,
                state: true,
                profilePicture: true,
            },
        });

        if (!user) return {error: "Can't find user"};

        return {user: user};
    } catch (error) {
        console.log(error);
        return {error: "Error in getUserService"};
    }
}

export async function uploadProfilePictureService(
    req: any,
    res: any,
    jtwPayload: Payload
): Promise<{ profilePicture?: {}; error?: string }> {
    try {
        const uploadedFile = await cloudinary.uploader.upload(
            req.file.path,
            {
                overwrite: true,
                invalidate: true,
            },
            function (error: any, result: any) {
                return {profilePicture: {}, error: "Can't upload item"};
            }
        );

        const uploadedProfilePicture = await prisma.user.update({
            where: {
                email: jtwPayload.email,
            },
            data: {
                profilePicture: uploadedFile.secure_url,
            },
        });

        return {profilePicture: uploadedProfilePicture};
    } catch (error) {
        console.log(error);
        return {error: "Error during upload"};
    }
}

export async function editUserService(
    body: {
        firstName: string;
        lastName: string;
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
                zip: body.zip,
                city: body.city,
                state: body.state,
            },
        });

        return {user: editedUser};
    } catch (error) {
        console.log(error);
        return {error: "Error in updateUser"};
    }
}