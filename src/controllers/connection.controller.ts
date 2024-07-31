import { NextFunction, Request,Response } from "express";
import { logger } from "../application/logging";
import { ResponseError } from "../response/error/error_response";
import ConnectionService from "../services/connections.service";
import { ConnectionValidation } from "../validation/connection_validation";
import { createConnectionResponse, updateConnectionResponse } from "../models/connections.model";

// format data :
//{
//     id: "e1-2",
//     source: "1",
//     target: "2",
//     type:"smoothstep",
//     label: "this is an edge label",
//     markerEnd: {
//       type: MarkerType.ArrowClosed
//     }
//   }

const get = async (req: Request, res: Response, errors:NextFunction) => {
    try {
        const result = await ConnectionService.getAllConnection();
        logger.debug("response:" + JSON.stringify(result));
        res.status(200).json({ 
            status:"success",
            code: 200,
            elementList: result
         });
    } catch (error : any) {
        errors(error);
    }
}

const post = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const to_send : createConnectionResponse = {
           source  :req.body.source,
           target:req.body.target,
           label: req.body.label,
        };
        ConnectionValidation.CREATE.safeParse(to_send);
        const result = ConnectionService.createConnection(to_send);
        logger.debug("response:" + JSON.stringify(result));
        res.status(200).json({ 
            status:"success",
            code: 200, 
        });
    } catch (error) {
        next(error);
    }
}

const update = async (req: Request, res: Response, next:NextFunction) => {
    console.log(req.params.id);
    try {
        const newElement : updateConnectionResponse = {
            id: req.body.id,
            source: req.body.type,
            target: req.body.icon,
            // tanda relasis
            label: "berelasi",
        };
        await checkIfExistById(Number(req.params.id),next);
        ConnectionValidation.UPDATE.safeParse(newElement);
        const result = ConnectionService.updateConnection(Number(req.params.id),newElement);
        logger.debug("response:" + JSON.stringify(result));
        res.status(200).json({
            status:"success",
            code: 200,
            elementList: result });
    } catch (error) {
        next(error);
    }
}


const getById = async (req: Request, res: Response,next:NextFunction) => {
  try {
        const result = await  ConnectionService.getConnectionById(Number(req.params.id));
        logger.debug("response:" + JSON.stringify(result));
        res.status(200).json({ 
            status:"success",
            code: 200,
            elementList: result
        });
    } catch (error) {
        // console.log(error);
        next(error);
    }
}

const checkIfExistById = async (id:number, next:NextFunction) => {
    try {
        const check = await  ConnectionService.getConnectionById(id);
        if(!check){
            throw new ResponseError(404,"Element not found");
        }
        return check;
    } catch (error) {
        next(error);
    }
}

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await checkIfExistById(Number(req.params.id),next);
        const result = ConnectionService.deleteConnection(Number(req.params.id));
        logger.debug("response:" + JSON.stringify(result));
        res.status(200).json({ 
            status:"success",
            code: 200,
        });
    } catch (error) {
        // console.log(error);
        next(error);
    }
}

export default {get,deleteById,getById,post,update};

