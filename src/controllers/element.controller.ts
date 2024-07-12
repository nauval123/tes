import database from "../database";
import User, { UserMap } from "../models/users.model";
import { Request,Response } from "express";

// format data :
// node 
// {
//     id: "2",
//     type:"node",
//     position:{x:150,y:100},
//     data: { 
//       key:"12314",
//       title:"heart",
//       type_icon:"heart",
//       description:"heart",
//       icon:'Hearticon',
//     },
//   },


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

const update = async (req: Request, res: Response) => {}

const post = async (req: Request, res: Response) => {}

const getById = async (req: Request, res: Response) => {}

const deleteById = async (req: Request, res: Response) => {}

export default {get,getById,update,post,deleteById,};
