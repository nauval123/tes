import sequelize from "sequelize";
import { bulkCreateElementResponse, createElementResponse, createElementResponseResult, testCreateElement } from "../models/elements.model";
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
        console.log("halo ini terpanggil find element by id element");
        return await ElementSequelize.findByPk(Number(id),{include:'elementLibrary_element'});
    }

    // test
    public async findByUUIDTittleTest(uuid: string,tittle:string,type_f:string): Promise<ElementSequelize | null> {
        console.log("halo ini terpanggil find elemnet by id element");
        return await ElementSequelize.findOne({where:{title:tittle,type_f:type_f},
            include:[{model:ElementDiagramSequelize,as:"element_diagrams",where:[{element_id:uuid,}]}]
        });
    }

    public async findByTittle(tittle:string): Promise<ElementSequelize | null> {
        console.log("halo ini terpanggil find element by title");
        return await ElementSequelize.findOne({where:{title:tittle},include:[{model:ElementDiagramSequelize,as:"element_diagram"}]});
    }    

    public async create(element: Omit<createElementResponse,"id">): Promise<ElementSequelize> {
        return await ElementSequelize.create(element);
    }

    public async createTest (element: Omit<testCreateElement,"id">):Promise<createElementResponseResult>{
        console.log("create");
        console.log(element);
        const newElement = await ElementSequelize.create(element);
        const elementDiagram = await  ElementDiagramSequelize.create(
            {
                diagram_id : element.diagram_id,
                element_id : element.uuid,
                occurence : false
            },
        );
        
        const createdElement = await ElementSequelize.findOne({where:{uuid:element.uuid}});
        return {
            status:"test",
            data: createdElement
        }
    }

    public async createBatch(element: bulkCreateElementResponse[]): Promise<ElementSequelize[]> {
        return await ElementSequelize.bulkCreate(element);
    }

    public async update(id:number,data : Partial<ElementSequelize>): Promise<[number,ElementSequelize[]]>{
        return await ElementSequelize.update(data, { where: { id }, returning: true });
    }

    // 
    public async updateTest(id:string,data : Partial<ElementSequelize>): Promise<[number,ElementSequelize[]]>{
        return await ElementSequelize.update(data, { where: { uuid: id }, returning: true });
    }

    public async updateOccurencesTest(id:string,diagram_id:number, element: Partial<ElementSequelize>): Promise<[number,ElementSequelize[]]>{
        console.log("ini update occurence test");
        console.log(element);
        // const dataResult = await ElementSequelize.update(data, { where: { uuid: data.uuid }, returning: true });
        const updateElemenDiagram =  await ElementDiagramSequelize.update({id:id,diagram_id:diagram_id,element_id:element.id, occurence: true},{where:{id:id}});
       console.log("aman lanjut",updateElemenDiagram);
        return  await ElementSequelize.update(element, { where: { uuid: element.uuid }, returning: true });   
    }
    
    public async delete(id: number): Promise<number> {
    return await ElementSequelize.destroy({ where: { id } });
    }
}

export default new ElementRepository();
