import {prisma} from "../index";

const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function getItemsService(
    datapodId: number
): Promise<{ items?: {}; error?: string }> {
    try {
        const items = await prisma.item.findMany({
            where: {
                datapodId: datapodId,
            },
        });

        if (!items) return {error: "Can't find items for some reason"};

        return {items: items};
    } catch (error) {
        console.log(error);
        return {error: "Error in getItemsService"};
    }
}

export async function uploadItemService(
    req: any,
    res: any
): Promise<{ item?: {}; error?: string }> {
    try {

        let resource_type = "";

        if (req.file["originalname"].endsWith(".jpg") || req.file["originalname"].endsWith("jpeg") || req.file["originalname"].endsWith(".png")) {
            resource_type = "image";
        }

        if (req.file["originalname"].endsWith(".mov") || req.file["originalname"].endsWith(".mp4")) {
            resource_type = "video";
        }

        if (req.file["originalname"].endsWith(".pdf")) {
            resource_type = "raw";
        }

        const uploadedVideo = await cloudinary.uploader.upload(
            req.file.path,
            {
                resource_type: resource_type,
                overwrite: true,
                invalidate: true,
            },
            function (error: any, result: any) {
                return {item: {}, error: "Can't upload item"};
            }
        );

        const uploadedItem = await prisma.item.create({
            data: {
                filename: req.query.filename,
                mimetype: req.query.mimetype,
                storageService: "Cloudinary",
                fileId: uploadedVideo.public_id,
                fileUrl: uploadedVideo.secure_url,
                datapodId: Number(req.query.datapodId),
            },
        });

        return {item: uploadedItem};
    } catch (error) {
        console.log(error);
        return {error: "Error during upload"};
    }
}

export async function deleteItemService(
    id: number
): Promise<{ item?: {}; error?: string }> {
    try {
        const itemToDelete = await prisma.item.findUnique({
            where: {
                id: id,
            },
        });

        if (!itemToDelete)
            return {error: "Can't delete item because it doesn't exist"};

        const cloudinaryId = itemToDelete.fileId;

        const cloudinaryDeleteResponse = await cloudinary.uploader.destroy(
            cloudinaryId
        );

        if (cloudinaryDeleteResponse.result == "ok") {
            const deletedItem = await prisma.item.delete({
                where: {
                    id: id,
                },
            });
            if (!deletedItem) return {item: {}, error: "Can't delete item"};

            return {item: deletedItem};
        }

        if (cloudinaryDeleteResponse.result == "not found") {
            const deletedItem = await prisma.item.delete({
                where: {
                    id: id,
                },
            });
            if (!deletedItem) return {item: {}, error: "Can't delete item"};

            return {item: deletedItem};
        }

        return {item: {}, error: "Can't delete item"};
    } catch (error) {
        console.log(error);
        return {error: "Error during upload"};
    }
}
