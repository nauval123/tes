import database from "../database";
import User, { UserMap } from "../models/users.model";
import { Request,Response } from "express";

const get = async (req: Request, res: Response) => {
    try {
        UserMap(database);
        const result = await User.findByPk(1);
        res.status(200).json({ users: result });
    } catch (error : any) {
        // Error(error);
        console.log(error);
    }
}

export default {get};