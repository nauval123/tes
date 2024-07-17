import database from "../database";
import User, { UserMap } from "../models/users.model";
import { NextFunction, Request,Response } from "express";
import { logger } from "../application/logging";
import { ElementValidation } from "../validation/element_validation";
import ElementService from "../services/elements.service";
import { ResponseError } from "../response/error/error_response";
import { createElementResponse, updateElementResponse } from "../models/elements.model";

// format data


const get = async (req: Request, res: Response, errors:NextFunction) => {
    try {
        const result = await ElementService.getAllelements();
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

const update = async (req: Request, res: Response, next:NextFunction) => {
    console.log(req.params.id);
    try {
        const newElement: updateElementResponse = {
            title: req.body.data.title,
            description: req.body.data.description,
            position_x : req.body.position.x,
            position_y : req.body.position.x,
            diagram_id : 1,
            elementlib_id: req.body.elementlib_id
        };
        const validationResult = ElementValidation.UPDATE.safeParse(newElement);
        await checkIfExistById(Number(req.params.id),next);
        const result = await ElementService.updateElements(Number(req.params.id),validationResult.data);
        logger.debug("response:" + JSON.stringify(result));
        res.status(200).json({
            status:"success",
            code: 200,
            elementList: result });
    } catch (error) {
        next(error);
    }
}

const post = async (req: Request, res: Response, next:NextFunction) => {
    // format data
    try {
        const data_to_validate = {
            description: req.body.data.description,
            title: req.body.data.title,
            position_x: req.body.position.x,
            position_y: req.body.position.y,
            diagram_id: 1,
            elementlib_id : req.body.element_lib,
            width:req.body.width,
            height: req.body.height
        };
        const dataResult = ElementValidation.CREATE.safeParse(data_to_validate);
        const result = await ElementService.createElements(dataResult.data);
        logger.debug("response:" + JSON.stringify(result));
        res.status(200).json({ 
            status:"success",
            code: 200, 
        });
    } catch (error) {
        next(error);
    }
}

const postList = async (req: Request, res: Response, next:NextFunction) => {
    // format data
    try {
        console.log('data from react js req');
        console.log(req.body);
        console.log('============');
        const data_to_validate: createElementResponse[] = req.body.data.map((elementData: createElementResponse) => ({
            // id: 1,
            description: elementData.data.description,
            title: elementData.data.title,
            position_x: elementData.position.x,
            position_y: elementData.position.y,
            diagram_id: 1,
            elementlib_id: elementData.elementlib_id,
            width: elementData.width,
            height: elementData.height,
            uuid: elementData.uuid
          }));
        console.log('data from react js');
        console.log(data_to_validate);
        console.log('============');
        // const dataResult = ElementValidation.CREATE.safeParse(data_to_validate);
        const result = await ElementService.createElementList(data_to_validate);
        logger.debug("response:" + JSON.stringify(result));
        res.status(200).json({ 
            status:"success data from react js",
            code: 200, 
        });
    } catch (error) {
        next(error);
    }
}

const getById = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const result = await  ElementService.getElementsById(Number(req.params.id));
        logger.debug("response:" + JSON.stringify(result));
        res.status(200).json({ 
            status:"success",
            code: 200,
            element: result
        });
    } catch (error) {
        next(error);
    }
}

const deleteById = async (req: Request, res: Response, next:NextFunction) => {
    try {
        await checkIfExistById(Number(req.params.id),next);
        const result = ElementService.deleteElements(Number(req.params.id));
        logger.debug("response:" + JSON.stringify(result));
        res.status(200).json({ 
            status:"success",
            code: 200,
        });
    } catch (error) {
        next(error);
    }
}

const checkIfExistById = async (id:number,next:NextFunction) => {
    try {
        const check = await  ElementService.getElementsById(id);
        if(!check){
            throw new ResponseError(404,"Element not found");
        }
        return check;
    } catch (error) {
        next(error);
    }
    
}

export default {get,getById,update,post,deleteById,postList};
