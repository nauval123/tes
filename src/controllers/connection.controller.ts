import { NextFunction, Request,Response } from "express";
import { logger } from "../application/logging";
import { ResponseError } from "../response/error/error_response";
import ConnectionService from "../services/connections.service";
import { ConnectionValidation } from "../validation/connection_validation";
import { createConnectionResponse, deleteConnectionDTO, updateConnectionResponse } from "../models/connections.model";

// format data :
// {
//     "source": "a030a83d-624a-48c2-aecb-7912f3e37e6b",
//     "sourceHandle": "b",
//     "target": "ab29db7b-3101-4d6b-a97f-e3ad7d0bd6a5",
//     "targetHandle": "a",
//     "data": {
//         "id": "31ab4846-aa11-486f-bf66-7c5b2e962d43",
//         "label": "terdefinisi",
//         "type": "step"
//     },
//     "type": "step"
// }

const getAllConnectionInDiagram = async (req: Request, res: Response, errors:NextFunction) => {
    try {
        const result = await ConnectionService.getAllConnection(Number(req.params.diagram_id));
        logger.debug("response:" + JSON.stringify(result));
        res.status(200).json({ 
            status:"success",
            code: 200,
            data: result
         });
    } catch (error : any) {
        errors(error);
    }
}

const makeConnection = async (req: Request, res: Response, next:NextFunction) => {
    try {
        console.log("\n");
        console.log("makeConnection connection");
        console.log("\n");
        const connection : createConnectionResponse = {
            diagram_id:req.body.diagram_id,
            source: req.body.source,
            source_handle: req.body.sourceHandle,
            target: req.body.target,
            target_handle: req.body.targetHandle,
            uuid: req.body.data.uuid,
            label: req.body.data.label,
            type: req.body.data.type
        };
        const result = await ConnectionService.createConnection(connection);
        logger.debug("response:" + JSON.stringify(result));
        res.status(200).json({ 
            status:"success",
            code: 200,
            data: result.data, 
        });
    } catch (error) {
        next(error);
    }
}

const updateAttributeConnection = async (req: Request, res: Response, next:NextFunction) => {
    console.log(req.params.id);
    try {
        const connectionData : updateConnectionResponse = {
            diagram_id: req.body.diagram_id,
            uuid: req.body.data.uuid,
            label: req.body.data.label,
        };
        await checkConnectionIfExistById(Number(req.params.id),next);
        const result = await ConnectionService.updateConnection(Number(req.params.id),connectionData);
        logger.debug("response:" + JSON.stringify(result));
        res.status(200).json({
            status:"success",
            code: 200,
            elementList: result });
    } catch (error) {
        next(error);
    }
}


const getConnectionById = async (req: Request, res: Response,next:NextFunction) => {
  try {
        const result = await  ConnectionService.getConnectionById(Number(req.params.id));
        logger.debug("response:" + JSON.stringify(result));
        res.status(200).json({ 
            status:"success",
            code: 200,
            elementList: result
        });
    } catch (error) {
        next(error);
    }
}

const checkConnectionIfExistById = async (id:number, next:NextFunction) => {
    try {
        const check = await ConnectionService.getConnectionById(id);
        if(!check){
            throw new ResponseError(404,"Connection not found");
        }
        return check;
    } catch (error) {
        next(error);
    }
}

const deleteConnectionById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await checkConnectionIfExistById(Number(req.params.id),next);
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


const deleteBulkConnection = async (req: Request, res: Response, next: NextFunction) => {
    try {

        console.log("\n");
        console.log(" element controller deleteBulkConnection");
        console.log(req.body);
        console.log("\n");

        const connectionsToDelete = req.body.data;
        const connectionsToDeleteIds : number [] = connectionsToDelete.map((connection : deleteConnectionDTO) => connection.id);
        const result = ConnectionService.deleteBulkConnection(connectionsToDeleteIds);
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


export default {getAllConnectionInDiagram,deleteConnectionById,getConnectionById,makeConnection,updateAttributeConnection,deleteBulkConnection};

