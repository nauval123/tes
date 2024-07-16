import database from "../database";
// import ElementLibraryModel, { ElementLibraryMap } from "../models/element_library.model";
import { NextFunction, Request,Response } from "express";
import elementLibraryRepository from "../repositories/elementLibraryRepository";
import ElementLibraryService from "../services/elementslibrary.service";
import { createElementLibResponse } from "../models/element_library.model";
import { logger } from "../application/logging";
import { Json } from "sequelize/types/utils";
import { ResponseError } from "../response/error/error_response";
import { Validation } from "../validation/validation";
import { ElementLibValidation } from "../validation/elementlib_validation";

const testing = async (req: Request, res : Response, errors: NextFunction) => {
    try {
        const result = await ElementLibraryService.testing();
        logger.debug("response:" + JSON.stringify(result));
        res.status(200).json({
            status:"success",
            code: 200,
            data: result
        }); 
    } catch (error) {
        errors(error);
    }
}


const get = async (req: Request, res: Response, errors:NextFunction) => {
    try {
        const result = await ElementLibraryService.getAllelementsOnLibrary();
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
        // const { name, type, icon, position, data } = req.body;

        // Menginisialisasi variabel dengan tipe `CreateElementLib`
        // const newElement: createElementLib = {
        //     name: req.body.data.title,
        //     type: req.body.type,
        //     icon: req.body.icon,
        //     default_width: 0,
        //     default_height: 0,
        //     position: req.body.position,
        //     data: req.body.data,
        // };
        const to_send = {
            name : req.body.data.title,
            type : req.body.type,
            icon : req.body.data.icon,
            default_width : 0,
            default_height: 0,
            position: req.body.position,
            unique_key:req.body.data.key,
        };
        checkIfExistByUniqueKey(req.body.data.key);
        Validation.validate(ElementLibValidation.CREATE,to_send);
        const result = ElementLibraryService.createElementsLib(to_send);
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
        const newElement: createElementLibResponse = {
            name: req.body.data.title,
            type: req.body.type,
            icon: req.body.icon,
            default_width: 0,
            default_height: 0,
            unique_key:req.body.data.key
        };
        checkIfExistById(Number(req.params.id));
        Validation.validate(ElementLibValidation.UPDATE,newElement);
        const result = ElementLibraryService.updateElementsLib(Number(req.params.id),newElement);
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
        const result = await  ElementLibraryService.getElementsLibById(Number(req.params.id));
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

const checkIfExistById = async (id:number) => {
    const check = await  ElementLibraryService.getElementsLibById(id);
    if(!check){
        throw new ResponseError(404,"Element not found");
    }
    return check;
}

const checkIfExistByUniqueKey = async (unique_key:number) => {
    const check = await  ElementLibraryService.getElementsLibByUniqueKey(unique_key);
    if(check){
        throw new ResponseError(403,"Element already exist!");
    }
    return check;
}

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        checkIfExistById(Number(req.params.id));
        const result = ElementLibraryService.deleteElementsLib(Number(req.params.id));
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

export default {get,testing,deleteById,getById,post,update};

