import { bulkCreateElementResponse, createElementResponse } from "../models/elements.model";
import DiagramSequelize from "../sequelize/diagrams.seq";
import ElementDiagramSequelize from "../sequelize/element_diagram.seq";
// import ElementlibJuncAttribModel from "../models/elementlib_attribute.model";
import ElementLibrarySequelize from "../sequelize/element_library.seq";
import ElementSequelize from "../sequelize/elements.seq";


class ElementRepository{
    
    public async findAllElement(): Promise<ElementSequelize[]>{
        console.log('data terpanggil');
        return await ElementSequelize.findAll({include:'elementLibrary_element'});
    }
    
    public async findAllElementRelated(): Promise<ElementSequelize[]>{
        console.log('data terpanggil');
        return await ElementSequelize.findAll({include:'element_junction_fk'});        
    }

    public async getAllElementRelatedDiagram(diagram_id: number): Promise<ElementSequelize[]>{
        console.log('data terpanggil di fungsi getAllElementRelatedDiagram');
        return await ElementSequelize.findAll({
            include:[{
                model: ElementDiagramSequelize,
                as:'element_elementDiagram',
                where:{diagram_id:diagram_id},
            },
            {
                model:ElementLibrarySequelize,
                as:"elemen_elementLibrary",
            }
        
        ]    
        });        
    }

    public async findById(id: number): Promise<ElementSequelize | null> {
        console.log("halo ini terpanggil find by id element");
        return await ElementSequelize.findByPk(Number(id),{include:'elementLibrary_element'});
    }

    public async create(element: Omit<createElementResponse,"id">): Promise<ElementSequelize> {
        return await ElementSequelize.create(element);
    }

    public async createBatch(element: bulkCreateElementResponse[]): Promise<ElementSequelize[]> {
        return await ElementSequelize.bulkCreate(element);
    }

    public async update(id:number,data : Partial<ElementSequelize>): Promise<[number,ElementSequelize[]]>{
        return await ElementSequelize.update(data, { where: { id }, returning: true });
    }
    
    public async delete(id: number): Promise<number> {
    return await ElementSequelize.destroy({ where: { id } });
    }
}

export default new ElementRepository();
