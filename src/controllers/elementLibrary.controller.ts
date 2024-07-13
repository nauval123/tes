import database from "../database";
import ElementLibraryModel, { ElementLibraryMap } from "../models/element_library.model";
import { Request,Response } from "express";
import elementLibraryRepository from "../repositories/elementLibraryRepository";
import ElementLibraryService from "../services/elementslibrary.service";
import ElementlibJuncAttribModel from "../models/elementlib_attribute.model";

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

const testing = async (req: Request, res : Response) => {
    try {
        const result = await ElementLibraryService.testing();
        
        res.status(200).json({message: result}); 
    } catch (error) {
        console.log("error");
        console.log(error);   
    }
}


const get = async (req: Request, res: Response) => {
    try {
        const result = await ElementLibraryService.getAllelementsOnLibrary();
        res.status(200).json({ elementList: result });
    } catch (error : any) {
        res.status(500).json({ error: error.message });
    }
}

// const update = async (req: Request, res: Response) => {
//     console.log(req.params);
//     try {
//         ElementLibraryMap(database);
//         const result = ElementLibraryService.updateElementsLib(Number(req.params.id));
//         res.status(200).json({ elementList: result });
//     } catch (error : any) {
//         // console.log(error);
//         res.status(500).json({ error: error.message });
//     }
// }

// const post = async (req: Request, res: Response) => {
//     try {
//         // ElementLibraryMap(database);
//         const result = elementLibraryRepository.create(req.params as ElementLibraryModel);
//         res.status(200).json({ elementList: result });
//     } catch (error : any) {
//         console.log(error);
//     }
// }

const getById = async (req: Request, res: Response) => {
  try {
        // ElementLibraryMap(database);
        const result = await  ElementLibraryService.getElementsLibById(Number(req.params.id));
        res.status(200).json({ elementList: result });
    } catch (error : any) {
        // console.log(error);
        res.status(500).json({ error: error.message });
    }
}

const deleteById = async (req: Request, res: Response) => {
    try {
        // ElementLibraryMap(database);
        const result = elementLibraryRepository.delete(Number(req.params.id));
        res.status(200).json({ elementList: result });
    } catch (error : any) {
        // console.log(error);
        res.status(500).json({ error: error.message });
    }
}

export default {get,testing,deleteById,getById};

