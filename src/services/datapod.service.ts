import {prisma} from "../index";
import * as dotenv from "dotenv";
import { Prisma } from "@prisma/client";

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


export async function addMemberOnDatapodService(datapodId: number, body: {
    userId: number,
    permissionId: number
}): Promise<{ datapodMember?: {}; error?: string }> {
    try {

        // create datapod
        const datapodMember = await prisma.usersOnDatapods.create({
            data: {
                datapodId: datapodId,
                userId: body.userId,
                permissionId: body.permissionId
            }
        });

        return {datapodMember: datapodMember};
    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if(error.code === 'P2003'){
                console.log(error);
                return {error: "Cannot find user or datapod."};
            }else if(error.code === 'P2002'){
                console.log(error);
                return {error: "This user already has a permission on this datapod."};
            }
        }
        console.log(error);
        return {error: "Error in addMemberOnDatapod"};
    }
}

export async function readMembersOnDatapodService(datapodId: number):
    Promise<{ datapodMember?: {}; error?: string }> {
    try {

        const foundMembers = await prisma.usersOnDatapods.findMany({
            where: {
                datapodId: datapodId,
            },
            include: {
                user: true,
                datapod: true,
                permission: true
            }
        })

        if (!foundMembers[0]) return {error: "Can't find members on this datapod"};

        return {datapodMember: foundMembers};
    } catch (error) {
        console.log(error);
        return {error: "Error in readMembersOnDatapod"};
    }
}

export async function readDatapodsOnMemberService(id: number):
    Promise<{ datapodMember?: {}; error?: string }> {
    try {

        const foundDatapods = await prisma.usersOnDatapods.findMany({
            where: {
                userId: id,
            },
            include: {
                user: true,
                datapod: true,
                permission: true
            }
        })

        if (!foundDatapods[0]) return {error: "Can't find datapods shared with this user"};

        return {datapodMember: foundDatapods};
    } catch (error) {
        console.log(error);
        return {error: "Error in readDatapodsOnMember"};
    }
}

export async function deleteMemberOnDatapodService(datapodId: number, userId: number):
    Promise<{ datapodMember?: {}; error?: string }> {
    try {

        const deletedDatapod = await prisma.usersOnDatapods.delete({
            where: {
                userId_datapodId: {datapodId, userId}
            }
        })

        if (!deletedDatapod) return {datapodMember: {}, error: "Can't delete datapod because it doesn't exist"};

        return {datapodMember: deletedDatapod};
    } catch (error) {
        console.log(error);
        return {error: "Error in deleteDatapod"};
    }
}



