import { where } from "sequelize";
import { logger } from "../application/logging";
import {createElementLibResponse } from "../models/element_library.model";
// import ElementlibJuncAttribModel from "../models/elementlib_attribute.model";
import ElementLibrarySequelize from "../sequelize/element_library.seq";
import { ElementLibValidation } from "../validation/elementlib_validation";
import { Validation } from "../validation/validation";


class elementLibraryRepository{
    
    public async findAllElementLib(): Promise<ElementLibrarySequelize[]>{
        console.log('data terpanggil');
        return await ElementLibrarySequelize.findAll();
    }
    
    public async findAllElementLibRelated(): Promise<ElementLibrarySequelize[]>{
        console.log('data terpanggil');
        return await ElementLibrarySequelize.findAll({include:'element_junction_fk'});        
    }

    public async findById(id: number): Promise<ElementLibrarySequelize | null> {
        return await ElementLibrarySequelize.findByPk(Number(id));
    }

    public async findByUniqueKey(id: number): Promise<ElementLibrarySequelize | null> {
        return await ElementLibrarySequelize.findOne({where:{unique_key:id}});
    }

    public async create(elementlib: Omit<createElementLibResponse,"id">): Promise<ElementLibrarySequelize> {
        // const to_send = {
        //     name : elementlib.data.title,
        //     type : elementlib.type,
        //     icon : elementlib.data.icon,
        //     default_width : 0,
        //     default_height: 0,
        //     unique_key:elementlib.data.key,
        // };
        const validate_request = Validation.validate(ElementLibValidation.CREATE,elementlib);
        logger.debug("record : " + JSON.stringify(validate_request));
        return await ElementLibrarySequelize.create(elementlib);
    }

    public async update(id:number,data_to_update : Partial<createElementLibResponse>): Promise<[number,ElementLibrarySequelize[]]>{
        // const to_send = {
        //     name : data_to_update.data?.title,
        //     type : data_to_update.type,
        //     icon : data_to_update.data?.icon,
        //     default_width : 0,
        //     default_height: 0,
        //     unique_key:data_to_update.data?.key,
        // };
        return await ElementLibrarySequelize.update(data_to_update, { where: { id }, returning: true });
    }
    
    public async delete(id: number): Promise<number> {
    return await ElementLibrarySequelize.destroy({ where: { id } });
    }
}

export default new elementLibraryRepository();
