// this file checks for user token presence and if it's valid credentials
// is meant to protect all route from not logged user

import jwt from 'jsonwebtoken';
import express from 'express';
import { SERVER_SECRET_KEY } from '../configuration/configuration';

export function AuthGuard(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const authorization = req.headers.authorization || "";
        const token = authorization.split(" ")[1];
        const decodedToken: any = jwt.verify(token, SERVER_SECRET_KEY);

        req["userData"] = { userName: decodedToken.userName, userId: decodedToken.userId };

        next();
    } catch (error) {
        if (error.message === `jwt expired`) {
            return res.status(403).json({
                message: `Your session has expired. Please log in again!`
            })
        }
        
        if (error.message === `invalid signature`) {
            return res.status(403).json({
                message: `Invalid authentication signature!`
            })
        }

        res.status(403).json({
            message: `You are not logged in!`
        })

    }
};