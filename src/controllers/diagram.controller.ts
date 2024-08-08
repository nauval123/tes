import { NextFunction, Request,Response } from "express";
import { logger } from "../application/logging";
import { ResponseError } from "../response/error/error_response";
import { updateDiagramRequestDTO } from "../models/diagram.model";
import DiagramService from "../services/diagram.service";

const getAllDiagram = async (req: Request, res: Response, errors:NextFunction) => {
    try {
        const result = await DiagramService.getAllDiagram();
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

// const createDiagram = async (req: Request, res: Response, next:NextFunction) => {
//     try {
//         console.log("\n");
//         console.log("makeConnection connection");
//         console.log("\n");
//         const connection : createConnectionResponse = {
//             diagram_id:req.body.diagram_id,
//             source: req.body.source,
//             source_handle: req.body.sourceHandle,
//             target: req.body.target,
//             target_handle: req.body.targetHandle,
//             uuid: req.body.data.uuid,
//             label: req.body.data.label,
//             type: req.body.data.type
//         };
//         const result = await ConnectionService.createConnection(connection);
//         logger.debug("response:" + JSON.stringify(result));
//         res.status(200).json({ 
//             status:"success",
//             code: 200,
//             data: result.data, 
//         });
//     } catch (error) {
//         next(error);
//     }
// }

const updateDiagram = async (req: Request, res: Response, next:NextFunction) => {
    console.log(req.params.id);
    try {
        const diagramData : updateDiagramRequestDTO = {
            id: req.body.id,
            name: req.body.data.name,
            diagram_type: req.body.data.diagram_type,
        };

        const result = await DiagramService.updateDiagramById(Number(req.params.id),diagramData);
        logger.debug("response:" + JSON.stringify(result));
        res.status(200).json({
            status:"success",
            code: 200,
            elementList: result });
    } catch (error) {
        next(error);
    }
}


const getDiagramById = async (req: Request, res: Response,next:NextFunction) => {
  try {
        const result = await  DiagramService.getDiagramById(Number(req.params.id));
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

// const deleteDiagram = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         await checkConnectionIfExistById(Number(req.params.id),next);
//         const result = ConnectionService.deleteConnection(Number(req.params.id));
//         logger.debug("response:" + JSON.stringify(result));
//         res.status(200).json({ 
//             status:"success",
//             code: 200,
//         });
//     } catch (error) {
//         // console.log(error);
//         next(error);
//     }
// }


// const deleteBulkDiagram = async (req: Request, res: Response, next: NextFunction) => {
//     try {

//         console.log("\n");
//         console.log(" element controller deleteBulkConnection");
//         console.log(req.body);
//         console.log("\n");

//         const connectionsToDelete = req.body.data;
//         const connectionsToDeleteIds : number [] = connectionsToDelete.map((connection : deleteConnectionDTO) => connection.id);
//         const result = ConnectionService.deleteBulkConnection(connectionsToDeleteIds);
//         logger.debug("response:" + JSON.stringify(result));
//         res.status(200).json({ 
//             status:"success",
//             code: 200,
//         });
//     } catch (error) {
//         // console.log(error);
//         next(error);
//     }
// }


export default {
    getDiagramById,updateDiagram,getAllDiagram

};

