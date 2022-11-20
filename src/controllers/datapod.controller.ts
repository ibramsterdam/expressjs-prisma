import express from "express";
import {
    createDatapodService,
    deleteDatapodService,
    readDatapodService,
    readDatapodsService,
    updateDatapodService,
    readMyDatapodsService,
    addMemberOnDatapodService,
    readMembersOnDatapodService,
    readDatapodsOnMemberService,
    deleteMemberOnDatapodService
} from "../services/datapod.service";

export async function createDatapodController(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    try {

        const newDatapod = await createDatapodService(req.body)

        res.status(200).send(newDatapod);
    } catch (err: any) {
        console.error(`Err while getting`, err.message);
        next(err);
    }
}

export async function readDatapodController(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    try {

        const foundDatapod = await readDatapodService(Number(req.params.id))

        res.status(200).send(foundDatapod);
    } catch (err: any) {
        console.error(`Err while getting`, err.message);
        next(err);
    }
}

export async function readDatapodsController(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    try {

        const foundDatapod = await readDatapodsService()

        res.status(200).send(foundDatapod);
    } catch (err: any) {
        console.error(`Err while getting`, err.message);
        next(err);
    }
}

export async function updateDatapodController(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    try {
        const updatedDatapod = await updateDatapodService(Number(req.params.id), req.body)

        res.status(200).send(updatedDatapod);
    } catch (err: any) {
        console.error(`Err while getting`, err.message);
        next(err);
    }
}

export async function deleteDatapodController(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    try {
        const deletedDatapod = await deleteDatapodService(Number(req.params.id))

        res.status(200).send(deletedDatapod);
    } catch (err: any) {
        console.error(`Err while getting`, err.message);
        next(err);
    }
}

export async function readMyDatapodsController(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    try {

        const foundDatapods = await readMyDatapodsService(Number(req.params.id))

        res.status(200).send(foundDatapods);
    } catch (err: any) {
        console.error(`Err while getting`, err.message);
        next(err);
    }
}


// member controllers

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

        const result = await readDatapodsOnMemberService(Number(req.params.id))
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
