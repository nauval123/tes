import database from "../database";
import User, { UserMap } from "../models/users.model";
import { NextFunction, Request,Response } from "express";
import { logger } from "../application/logging";
import { ElementValidation } from "../validation/element_validation";
import ElementService from "../services/elements.service";
import { ResponseError } from "../response/error/error_response";
import { bulkCreateElementResponse, createElementResponse, createElementResponseResult, transformElementBulkCreateData, updateElementIdentityDTO, updateElementResponse, updateElementStyleDTO } from "../models/elements.model";
import ElementSequelize from "../sequelize/elements.seq";
import elementRepository from "../repositories/elementRepository";
import { deleteElementDTO } from "../models/elements.model";

// mendapatkan element pada diagram dengan ID tertentu
const getElementindDiagram = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const result = await ElementService.getElementsInDiagramByIdDiagram(Number(req.params.diagram_id));
        res.status(200).json({
        status:"success",
        code: 200,
        data: result });
    } catch (error) {
        next(error);
    }
};


// update occurence dengan mengetikkan judul ()
// mendapatkan menentukan occurence 
const updateOccurence = async (req: Request, res: Response, next:NextFunction) => {
    // id nya adalah id dari tabel element_diagram
    console.log(req.params.id);
    try {
        const updateElement: updateElementIdentityDTO = {
            id : Number(req.params.id),
            type:req.body.type,
            title: req.body.data.title,
            description: req.body.data.description,
            icon: req.body.data.icon,
            position_x:req.body.position.x, 
            position_y:req.body.position.y,
            uuid: req.body.uuid,
            diagram_id: req.body.diagram_id,
            elementlib_id : req.body.elementlib_id,
            width:req.body.width,
            height: req.body.height,
            type_f:req.body.type_f
        };
        // const validationResult = ElementValidation.UPDATE.safeParse(newElement);
        // await checkIfExistById(Number(req.params.id),next);
        const checkOccurence = await checkifOccurenceOrNew(updateElement.title, updateElement.type_f,next);
        // check if definition
        if(checkOccurence?.status_check === "definition"){
            console.log(checkOccurence?.status_check);
            const result = await ElementService.updateElement(Number(req.params.id),updateElement);
            logger.debug("response:" + JSON.stringify(result));
            res.status(200).json({
                status:"success",
                code: 200,
                type_operation:"definition",
                elements: result });
        }else if(checkOccurence?.status_check === "occurence"){
            console.log(checkOccurence?.status_check);
            const result = await ElementService.updateElementsOccuresOrNew(req.params.id,updateElement.diagram_id,updateElement,checkOccurence?.data?.uuid);
            logger.debug("response:" + JSON.stringify(result));
            res.status(200).json({
                status:"success",
                code: 200,
                type_operation:"occurences",
                elements: result });
        }
    } catch (error) {
        next(error);
    }
}

// update node
const updateElementStyle = async (req: Request, res: Response, next:NextFunction) => {
    // id nya adalah id di tabel element_diagram
    try {
        const updateElement: updateElementStyleDTO = {
            style_id:req.body.position.style_id,
            position_x:req.body.position.x, 
            position_y:req.body.position.y,
            uuid: req.body.uuid,
            diagram_id: req.body.diagram_id,
            width:req.body.width,
            height: req.body.height,
        };        
        const result = await ElementService.updateElementStyle(req.params.id ,updateElement.style_id ,updateElement);
        logger.debug("response:" + JSON.stringify(result));
        res.status(200).json({
            status:"success",
            code: 200,
            elements: result });
    } catch (error) {
        next(error);
    }
}


// test
// create dari element list ke canvas
const CreateElementFromElementlist = async (req:Request, res: Response, next : NextFunction) => {
    try {
        console.log("\n");
        console.log(" controller CreateElementFromElementlist");
        console.log(req.body);
        console.log("\n");
        const data_to_validate = {
            // id:req.body.id, ===> tanpa id, karena di generate di back end
            diagram_id: req.body.diagram_id,
            type:req.body.type,
            title: "",
            description: req.body.data.description,
            icon: req.body.data.icon,
            key: req.body.data.key,
            position_x:req.body.position.x, 
            position_y:req.body.position.y,
            uuid: req.body.data.uuid,
            elementlib_id : req.body.elementlib_id,
            width:req.body.width,
            height: req.body.height,
            type_f: req.body.type_f
        };
        // const dataResult = ElementValidation.CREATE.safeParse(data_to_validate);
        // const result = await ElementService.createElements(dataResult.data);
        const result = await ElementService.createElementIntoCanvas(data_to_validate);
        logger.debug("response:" + JSON.stringify(result));
        console.log('hasil create', result);
        res.status(200).json({ 
            status:"success",
            code: 200, 
            data: result.data,
        });
    } catch (error) {
        next(error);
    }
}

// create bulk untuk paste feature
const CreateBulkElement = async (req:Request, res: Response, next : NextFunction) => {
    try {
        console.log("\n");
        console.log(" controller CreateBulkElement");
        console.log(req.body);
        console.log("\n");

        const elements = req.body.elements;
        if (!Array.isArray(elements)) {
            return res.status(400).json({ error: 'Invalid input. Expected an array of elements.' });
        }
        
        const transformedElements = elements.map(transformElementBulkCreateData);
        const result = await ElementService.createBulkElementIntoCanvas(req.body.diagram_id,transformedElements);
       
        logger.debug("response:" + JSON.stringify(result));
        res.status(200).json({ 
            status:"success",
            code: 200, 
            data: result,
        });
    } catch (error) {
        next(error);
    }
}

// test
// create dari element list ke canvas
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
        console.log("\n controller deleteById \n");
        await checkIfExistById(Number(req.params.id),next);
        const result = ElementService.deleteElement(Number(req.params.id));
        logger.debug("response:" + JSON.stringify(result));
        res.status(200).json({ 
            status:"success",
            code: 200,
        });
    } catch (error) {
        next(error);
    }
}

const deleteElementFromCanvas = async (req: Request, res: Response, next:NextFunction) => {
    try {
        console.log('deleteElementFromCanvas');
        console.log("\n",req.params.id);
        await checkIfExistById(Number(req.params.id),next);
        const result = ElementService.deleteElement(Number(req.params.id));
        logger.debug("response:" + JSON.stringify(result));
        res.status(200).json({ 
            status:"success",
            code: 200,
        });
    } catch (error) {
        next(error);
    }
}

const deleteBulkElementFromCanvas = async(req: Request, res: Response, next:NextFunction) => {
    try {
        console.log("\n");
        console.log(" element controller deleteBulkElementFromCanvas");
        console.log(req.body);
        console.log("\n");
        
        const elementsToDelete = req.body.data;
        const elementsToDeleteIds : number [] = elementsToDelete.map((element : deleteElementDTO) => element.id);

        // await checkIfExistById(Number(req.params.id),next);
        const result = ElementService.deleteBulkElement(elementsToDeleteIds);
        logger.debug("response:" + JSON.stringify(result));
        res.status(200).json({ 
            status:"success",
            code: 200,
            data: result,
        });
    } catch (error) {
        next(error);
    }
}

const checkIfExistById = async (id:number,next:NextFunction) => {
    try {
        console.log("\n Check id :",id);
        console.log("\n");
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

const checkifOccurenceOrNew = async (title:string, type_f:string, next:NextFunction) => {
    try {
        const check = await ElementService.getElementsByUUIDandTitle(title,type_f);
        if(!check){
            return {status_check:"definition"}
        }
        return {status_check:"occurence", data:check};
    } catch (error) {
        
    }
}

export default {
    getById,getElementindDiagram,post,testCreate,
    updateOccurence,CreateElementFromElementlist,deleteElementFromCanvas,
    updateElementStyle,deleteBulkElementFromCanvas,CreateBulkElement
};
