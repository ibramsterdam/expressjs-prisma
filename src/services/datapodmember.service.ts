import {prisma} from "../index";
import { Prisma, PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
import { userInfo } from "os";

dotenv.config();


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
            }
        })

        if (!foundMembers[0]) return {error: "Can't find members on this datapod"};

        return {datapodMember: foundMembers};
    } catch (error) {
        console.log(error);
        return {error: "Error in readMembersOnDatapod"};
    }
}

export async function readDatapodsOnMemberService(userId: number):
 Promise<{ datapodMember?: {}; error?: string }> {
    try {

        const foundDatapods = await prisma.usersOnDatapods.findMany({
            where: {
                userId: userId,
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

