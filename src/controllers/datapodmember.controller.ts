import express from "express";
import {
    addMemberOnDatapodService,
    readDatapodsOnMemberService,
    readMembersOnDatapodService,
    deleteMemberOnDatapodService
} from "../services/datapodmember.service";

export async function addMemberOnDatapodController(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    try {

        const result = await addMemberOnDatapodService(Number(req.params.datapodId), req.body)
        if (result.error) return res.status(400).send(result);
        if (result.datapodMember) return res.status(200).send(result);
        
    } catch (err: any) {
        console.error(`Err while getting`, err.message);
        next(err);
    }
}

export async function readMembersOnDatapodController(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    try {

        const result = await readMembersOnDatapodService(Number(req.params.datapodId))
        if (result.error) return res.status(400).send(result);
        if (result.datapodMember) return res.status(200).send(result);

    } catch (err: any) {
        console.error(`Err while getting`, err.message);
        next(err);
    }
}

export async function readDatapodsOnUserController(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    try {

        const result = await readDatapodsOnMemberService(Number(req.params.userId))
        if (result.error) return res.status(400).send(result);
        if (result.datapodMember) return res.status(200).send(result);
        
    } catch (err: any) {
        console.error(`Err while getting`, err.message);
        next(err);
    }
}

export async function deleteMemberOnDatapodController(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    try {
        const deletedMemberOnDatapod = await deleteMemberOnDatapodService(Number(req.params.datapodId), Number(req.query.userId))
            if (deletedMemberOnDatapod.error){
                res.status(400).send(deletedMemberOnDatapod);
            }else{
                res.status(200).send(deletedMemberOnDatapod);
            }
    } catch (err: any) {
        console.error(`Err while getting`, err.message);
        next(err);
    }
}

