import ElementLibraryModel from "../models/element_library.model";
import { createElementResponse } from "../models/elements.model";
// import ElementlibJuncAttribModel from "../models/elementlib_attribute.model";
import ElementLibrarySequelize from "../sequelize/element_library.seq";
import ElementSequelize from "../sequelize/elements.seq";


class ElementRepository{
    
    public async findAllElement(): Promise<ElementSequelize[]>{
        console.log('data terpanggil');
        return await ElementSequelize.findAll();
    }
    
    public async findAllElementRelated(): Promise<ElementSequelize[]>{
        console.log('data terpanggil');
        return await ElementSequelize.findAll({include:'element_junction_fk'});        
    }

    public async findById(id: number): Promise<ElementSequelize | null> {
        return await ElementSequelize.findByPk(Number(id));
    }

    public async create(element: Omit<createElementResponse,"id">): Promise<ElementSequelize> {
        return await ElementSequelize.create(element);
    }

    public async update(id:number,data : Partial<ElementSequelize>): Promise<[number,ElementSequelize[]]>{
        return await ElementSequelize.update(data, { where: { id }, returning: true });
    }
    
    public async delete(id: number): Promise<number> {
    return await ElementSequelize.destroy({ where: { id } });
    }
}

export default new ElementRepository();
