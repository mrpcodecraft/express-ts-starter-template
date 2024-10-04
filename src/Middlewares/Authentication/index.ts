import { Request, Response, NextFunction } from "express";

export default function AuthenticationMiddleware (req: Request, res: Response, next: NextFunction) {
    const headers = req.headers;

    if (headers.authorization) {
        const token = headers.authorization.split(" ")[1];

        if (token === "valid_token") {
            next();
        } else {
            res.status(401).send({ message: "Invalid token" });
        }
    } else {
        res.status(401).send({ message: "Invalid token" });
    }
}