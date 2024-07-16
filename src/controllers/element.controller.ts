import database from "../database";
import User, { UserMap } from "../models/users.model";
import { NextFunction, Request,Response } from "express";
import { Validation } from "../validation/validation";
import { logger } from "../application/logging";
import { ElementValidation } from "../validation/element_validation";
import ElementService from "../services/elements.service";
import { ResponseError } from "../response/error/error_response";

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


const get = async (req: Request, res: Response, errors:NextFunction) => {
    try {
        UserMap(database);
        const result = await User.findByPk(1);
        res.status(200).json({ users: result });
    } catch (error : any) {
        // Error(error);
       errors(error)
    }
}

const update = async (req: Request, res: Response, next:NextFunction) => {

}

const post = async (req: Request, res: Response, next:NextFunction) => {
    // format data
//     type:element.type,
//     data: {
//       title: element.data.title, 
//       key:element.data.key,
//       type_icon: element.data.type_icon,
//       description:element.data.description,
//       icon:element.data.icon, 
//     },
//     element_lib: id,
//     position: {x:randomIntFromInterval(100,300),y:randomIntFromInterval(100,300)}

    const data_to_validate = {
        description: req.body.data.description,
        title: req.body.data.title,
        position_x: req.body.position.x,
        position_y: req.body.position.y,
        diagram_id: 1,
        elementlib_id : req.body.element_lib,
    };
    Validation.validate(ElementValidation.CREATE,data_to_validate);
    const result = ElementService.createElements(data_to_validate);
    logger.debug("response:" + JSON.stringify(result));
    res.status(200).json({ 
        status:"success",
        code: 200, 
    });
}

const getById = async (req: Request, res: Response, next:NextFunction) => {

}

const deleteById = async (req: Request, res: Response, next:NextFunction) => {
    
}

const checkIfExistById = async (id:number) => {
    const check = await  ElementService.getElementsById(id);
    if(!check){
        throw new ResponseError(404,"Element not found");
    }
    return check;
}

export default {get,getById,update,post,deleteById,};
