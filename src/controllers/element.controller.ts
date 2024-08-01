import database from "../database";
import User, { UserMap } from "../models/users.model";
import { NextFunction, Request,Response } from "express";
import { logger } from "../application/logging";
import { ElementValidation } from "../validation/element_validation";
import ElementService from "../services/elements.service";
import { ResponseError } from "../response/error/error_response";
import { bulkCreateElementResponse, createElementResponse, updateElementResponse, updateElementResponseTest } from "../models/elements.model";
import ElementSequelize from "../sequelize/elements.seq";
import elementRepository from "../repositories/elementRepository";

// format data

const get = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const result = await ElementService.getAllelements();
        logger.debug("response:" + JSON.stringify(result));
        res.status(200).json({ 
            status:"success",
            code: 200,
            elements: result
         });
    } catch (error : any) {
        next(error);
    }
}

const getElementindDiagram = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const result = await ElementService.getElementsInDiagramByIdDiagram(Number(req.params.diagram_id));
        res.status(200).json({
        status:"success",
        code: 200,
        elements: result });
    } catch (error) {
        next(error);
    }
};

// getelementdiagram
const getElementindDiagramTest = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const result = await ElementService.getElementsInDiagramByIdDiagram(Number(req.params.diagram_id));
        res.status(200).json({
        status:"success",
        code: 200,
        elements: result });
    } catch (error) {
        next(error);
    }
};

const updateTest = async (req: Request, res: Response, next:NextFunction) => {
    console.log(req.params.uuid);
    try {
        const updateElement: updateElementResponseTest = {
            type:req.body.type,
            title: req.body.title,
            description: req.body.description,
            icon: req.body.icon,
            position_x:req.body.position_x, 
            position_y:req.body.position_y,
            uuid: req.body.uuid,
            diagram_id: req.body.diagram_id,
            elementlib_id : req.body.elementlib_id,
            width:req.body.width,
            height: req.body.height,
            type_f: req.body.type_f
        };
        // const validationResult = ElementValidation.UPDATE.safeParse(newElement);
        // await checkIfExistById(Number(req.params.id),next);
        const result = await ElementService.updateElementsTest(req.params.uuid,updateElement);
        logger.debug("response:" + JSON.stringify(result));
        res.status(200).json({
            status:"success",
            code: 200,
            elementList: result });
    } catch (error) {
        next(error);
    }
}
// update occurence test
const updateOccurenceTest = async (req: Request, res: Response, next:NextFunction) => {
    // id nya adalah id dari element di element-diagram
    console.log(req.params.id);
    try {
        const updateElement: updateElementResponseTest = {
            type:req.body.type,
            title: req.body.title,
            description: req.body.description,
            icon: req.body.icon,
            position_x:req.body.position_x, 
            position_y:req.body.position_y,
            uuid: req.body.uuid,
            diagram_id: req.body.diagram_id,
            elementlib_id : req.body.elementlib_id,
            width:req.body.width,
            height: req.body.height,
            type_f:req.body.type_f
        };
        // const validationResult = ElementValidation.UPDATE.safeParse(newElement);
        // await checkIfExistById(Number(req.params.id),next);
        const checkOccurence = await checkifOccurenceOrNew(updateElement.uuid,updateElement.title, updateElement.type_f,next);
        // check if definition
        if(checkOccurence?.status_check === "definition"){
            console.log(checkOccurence?.status_check);
            const result = await ElementService.updateElementsTest(req.params.id,updateElement);
            logger.debug("response:" + JSON.stringify(result));
            res.status(200).json({
                status:"success",
                code: 200,
                elements: result });
        }else if(checkOccurence?.status_check === "occurence"){
            console.log(checkOccurence?.status_check);
            const result = await ElementService.updateElementsOccuresOrNewTest(req.params.id,updateElement.diagram_id,updateElement);
            logger.debug("response:" + JSON.stringify(result));
            res.status(200).json({
                status:"success",
                code: 200,
                elements: result });
        }
    } catch (error) {
        next(error);
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

// create ketika dari element list ke canvas ==test==
const testCreate = async (req:Request, res: Response, next : NextFunction) => {
    try {
        console.log('ini adalah test create');
        console.log('ini valuenya',req.body);
        const data_to_validate = {
            id:req.body.id,
            type:req.body.type,
            title: "",
            description: "",
            icon: "",
            key: req.body.uuid,
            position_x:req.body.position_x, 
            position_y:req.body.position_y,
            uuid: req.body.uuid,
            diagram_id: req.body.diagram_id,
            elementlib_id : req.body.elementlib_id,
            width:req.body.width,
            height: req.body.height
        };
        // const dataResult = ElementValidation.CREATE.safeParse(data_to_validate);
        // const result = await ElementService.createElements(dataResult.data);
        const result = await ElementService.createTest(data_to_validate);
        logger.debug("response:" + JSON.stringify(result));
        res.status(200).json({ 
            status:"success",
            code: 200, 
        });
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
        const data_to_validate: bulkCreateElementResponse[] = req.body.data.map((elementData: createElementResponse) => ({
            description: elementData.data.description,
            title: elementData.data.title,
            position_x: elementData.position.x,
            position_y: elementData.position.y,
            diagram_id: 1,
            elementlib_id: elementData.elementlib_id,
            width: elementData.width,
            height: elementData.height,
            uuid: elementData.uuid,
            elementLibrary_element:{}
          }));
        console.log('data from react js');
        console.log(data_to_validate);
        console.log('============');
        // const dataResult = ElementValidation.CREATE.safeParse(data_to_validate);
        const result = await ElementService.createElementList(data_to_validate);
        // logger.debug("response:" + JSON.stringify(result));
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

// delete test sesuai skenario 

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

const checkIfExistByTitle = async (title:string,next:NextFunction) => {
    try {
        const check = await  ElementService.getElementsTitle(title);

       if(!check){
            return {status_check:"fail"};
        }
        return {status_check:"succes",result:check}
    } catch (error) {
        next(error);
    }
}

const checkifOccurenceOrNew = async (uuid:string, title:string, type_f:string, next:NextFunction) => {
    try {
        const check = ElementService.getElementsByUUIDandTitleTest(uuid,title,type_f);
        if(!check){
            return {status_check:"definition"}
        }
        return {status_check:"occurence"};
    } catch (error) {
        
    }
}

export default {
    get,getById,getElementindDiagram,update,
    post,deleteById,postList,testCreate,updateTest,
    updateOccurenceTest
};
