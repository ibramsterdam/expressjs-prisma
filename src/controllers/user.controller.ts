import express from "express";
import {
    editUserService,
    getUserByEmailService,
    getUserService,
    uploadProfilePictureService
} from "../services/user.service";

export async function getUserController(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    const result = await getUserService(res.locals.jwt);

    if (result.error) {
        res.status(400).send(result.error);
    }
    if (result.user) res.status(200).send(result.user);
}

export async function editUserController(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    const result = await getUserService(res.locals.jwt);

    try {
        const updatedUser = await editUserService(req.body, res.locals.jwt);
        res.status(200).send(updatedUser);
    } catch (err: any) {
        console.error(`Err while getting`, err.message);
        next(err);
    }
}

export async function getUserByEmailController(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    const result = await getUserByEmailService(req.params.email);

    if (result.error) {
        res.status(400).send(result.error);
    }
    if (result.user) res.status(200).send(result.user);
}

export async function uploadProfilePictureController(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    const result = await uploadProfilePictureService(req, res, res.locals.jwt);

    if (result.error) return res.status(400).send(result.error);
    if (result.profilePicture) return res.status(200).send(result.profilePicture);
}
