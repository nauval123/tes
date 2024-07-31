import {createElementLibResponse } from "../models/element_library.model";
// import ElementlibJuncAttribModel from "../models/elementlib_attribute.model";
import ElementLibrarySequelize from "../sequelize/element_library.seq";
import { ResponseError } from "../response/error/error_response";
import ElementDiagramSequelize from "../sequelize/element_diagram.seq";


class diagramRepository{
    
    public async findAllElementLib(): Promise<ElementDiagramSequelize[]>{
        console.log('data terpanggil');
        return await ElementDiagramSequelize.findAll({include:''});
    }
    
    public async findAllElementLibRelated(): Promise<ElementDiagramSequelize[]>{
        console.log('data terpanggil');
        return await ElementDiagramSequelize.findAll({include:'element_junction_fk'});        
    }

    public async findById(id: number): Promise<ElementDiagramSequelize | null> {
        return await ElementDiagramSequelize.findByPk(Number(id));
    }

    public async findByUniqueKey(id: number): Promise<ElementDiagramSequelize | null> {
        return await ElementDiagramSequelize.findOne({where:{unique_key:id}});
    }

    public async create(elementlib: Omit<createElementLibResponse,"id">): Promise<ElementDiagramSequelize> {
        const to_send = {
            name : elementlib.name,
            type : elementlib.type,
            icon : elementlib.icon,
            default_width : elementlib.default_width,
            default_height: elementlib.default_height,
            unique_key:elementlib.unique_key,
        };
        return await ElementDiagramSequelize.create(to_send).catch(function (error){
            throw new ResponseError(400, "error sequelize");
        });
    }

    public async update(id:number,data_to_update : Partial<createElementLibResponse>): Promise<[number,ElementDiagramSequelize[]]>{
        // const to_send = {
        //     name : data_to_update.data?.title,
        //     type : data_to_update.type,
        //     icon : data_to_update.data?.icon,
        //     default_width : 0,
        //     default_height: 0,
        //     unique_key:data_to_update.data?.key,
        // };
        return await ElementDiagramSequelize.update(data_to_update, { where: { id }, returning: true });
    }
    
    public async delete(id: number): Promise<number> {
    return await ElementDiagramSequelize.destroy({ where: { id } });
    }
}

export default new diagramRepository();
