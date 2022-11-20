import {prisma} from "../index";
import * as dotenv from "dotenv";

dotenv.config();


export async function createDatapodService(body: {
    title: string,
    description: string,
    userId: number
}): Promise<{ datapod?: {}; error?: string }> {
    try {

        // create datapod
        const datapod = await prisma.datapod.create({
            data: {
                title: body.title,
                description: body.description,
                userId: body.userId
            }
        });


        return {datapod: datapod};
    } catch (error) {
        console.log(error);
        return {error: "Error in createDatapod"};
    }
}

export async function readDatapodService(id: number): Promise<{ datapod?: {}; error?: string }> {
    try {

        const foundDatapod = await prisma.datapod.findUnique({
            where: {
                id: id,
            }
        })

        if (!foundDatapod) return {datapod: {}, error: "Can't find datapod"};

        return {datapod: foundDatapod};
    } catch (error) {
        console.log(error);
        return {error: "Error in readDatapod"};
    }
}

export async function readDatapodsService(): Promise<{ datapod?: {}; error?: string }> {
    try {

        const foundDatapod = await prisma.datapod.findMany();

        if (!foundDatapod) return {datapod: {}, error: "Can't find datapod"};

        return {datapod: foundDatapod};
    } catch (error) {
        console.log(error);
        return {error: "Error in readDatapod"};
    }
}

export async function updateDatapodService(id: number, body: {
    title: string,
    description: string,
    userId: number
}): Promise<{ datapod?: {}; error?: string }> {
    try {

        const updatedDatapod = await prisma.datapod.update({
            where: {
                id: id,
            },
            data: {
                title: body.title,
                description: body.description,
                updated_at: new Date(),
                userId: body.userId
            },
        })


        return {datapod: updatedDatapod};
    } catch (error) {
        console.log(error);
        return {error: "Error in updateDatapod"};
    }
}


export async function deleteDatapodService(id: number): Promise<{ datapod?: {}; error?: string }> {
    try {

        const deletedDatapod = await prisma.datapod.delete({
            where: {
                id: id,
            }
        })

        if (!deletedDatapod) return {datapod: {}, error: "Can't delete datapod because it doesn't exist"};

        return {datapod: deletedDatapod};
    } catch (error) {
        console.log(error);
        return {error: "Error in deleteDatapod"};
    }
}

export async function readMyDatapodsService(id: number): Promise<{ datapods?: {}; error?: string }> {
    try {

        const foundDatapods = await prisma.datapod.findMany({
            where: {
                userId: id
            }
        });

        if (!foundDatapods) return {datapods: {}, error: "Can't find datapod"};

        return {datapods: foundDatapods};
    } catch (error) {
        console.log(error);
        return {error: "Error in readMyDatapods"};
    }
}



