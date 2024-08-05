import { bulkCreateElementResponse, createElementResponse, createElementResponseResult, testCreateElement, updateElementStyleDTO } from "../models/elements.model";
import ElementDiagramSequelize from "../sequelize/element_diagram.seq";
// import ElementlibJuncAttribModel from "../models/elementlib_attribute.model";
import ElementLibrarySequelize from "../sequelize/element_library.seq";
import ElementSequelize from "../sequelize/elements.seq";
import ElementIdentitySequlize from "../sequelize/element_style";
import ElementStyleSequlize from "../sequelize/element_style";
import ElementStyleSequelize from "../sequelize/element_style";
import { title } from "process";
import { ResponseError } from "../response/error/error_response";
import database from "../database";
import { Transaction, where } from "sequelize";
import { response } from "express";


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
        
        console.log('\n');
        console.log('data terpanggil di fungsi getAllElementRelatedDiagram');
       
        
        const result = await ElementSequelize.findAll({
            include:[
            {
                model: ElementDiagramSequelize,
                as:'element_diagrams',
                where:{diagram_id:diagram_id,},
                include:[
                    {
                        model:ElementStyleSequelize,
                        as:'element_style',
                        required: true,
                    }
                ],
            },
            {
                model:ElementLibrarySequelize,
                as:"elements_library",
                 required: true,
            }
        ]    
        });       
      
          console.log("json data");
          console.log(JSON.stringify(result));
          console.log("json data");

        return result;
    }

    public async findById(id: number): Promise<ElementSequelize | null> {
        console.log("halo ini terpanggil find element by id element");
        return await ElementSequelize.findByPk(Number(id),{include:'elementLibrary_element'});
    }

    public async findElementById(id: number): Promise<ElementDiagramSequelize | null> {
        console.log("\n findElementById \n");
        return await ElementDiagramSequelize.findByPk(Number(id));
    }


    // test
    public async findByUUIDTittleTest(uuid: string,tittle:string,type_f:string): Promise<ElementSequelize | null> {
        console.log("halo ini terpanggil find elemnet by id element");
        return await ElementSequelize.findOne({where:{title:tittle,type_f:type_f},
            include:[{model:ElementDiagramSequelize,as:"element_diagrams",where:[{element_id:uuid,}]}]
        });
    }

    public async findByTittleandType_f(tittle:string,type_f:string): Promise<ElementSequelize | null> {
        console.log("\n findByUUIDTittle");
        const transaction = await database.transaction();
        try {
            const result = await ElementSequelize.findOne(
                {
                 where:{title:tittle,type_f:type_f},
                 transaction:transaction
                }
            );
            await transaction.commit();
            return result;
        } catch (error) {
            await transaction.rollback();
          throw new ResponseError(500,JSON.stringify(error));
        }
    }


    public async findByTittle(tittle:string): Promise<ElementSequelize | null> {
        console.log("halo ini terpanggil find element by title");
        return await ElementSequelize.findOne({where:{title:tittle},include:[{model:ElementDiagramSequelize,as:"element_diagram"}]});
    }    

    public async create(element: Omit<createElementResponse,"id">): Promise<ElementSequelize> {
        return await ElementSequelize.create(element);
    }

    public async createElementIntoCanvas (element: Omit<testCreateElement,"id">):Promise<createElementResponseResult>{
        console.log("== repository createElementIntoCanvas ==");
        console.log(element);
        console.log("\n");
        const transaction = await database.transaction();
        
        try {
            const newElementStyle = await ElementStyleSequelize.create(
                {
                    x : element.position_x,
                    y : element.position_y,
                    width : element.width,
                    height: element.height
                },
                {
                 returning:true,
                 transaction
                }
            );

            console.log("\n");
            console.log("hasil dari Element Style");
            console.log(newElementStyle);
            console.log("\n");

            const newElement = await ElementSequelize.create(
                element,
                {returning:true,transaction,
                    // include:[
                    //     {
                    //      model:ElementLibrarySequelize,
                    //      as:"elements_library"
                    //     }
                    // ]
                });  

            const elementDiagram = await  ElementDiagramSequelize.create(
                {
                    diagram_id : element.diagram_id,
                    element_id : element.uuid,
                    style_id : newElementStyle.id,
                    occurence : false
                },
                {returning:true,transaction}
            );

            console.log("\n");
            console.log("hasil dari Element Diagram");
            console.log(elementDiagram);
            console.log("\n");

            
            const ElementResult = await ElementSequelize.findByPk(
                newElement.id,
                {transaction,
                 include:[
                 {
                  model:ElementLibrarySequelize,
                  as:"elements_library"
                 }
                 ]
                },
            );

            console.log("\n");
            console.log("hasil dari Element ");
            console.log(newElement);
            console.log(ElementResult);
            console.log("\n");  

            await transaction.commit();

            return {
                status:"success",
                data: {
                    id: Number(elementDiagram.id),
                    diagram_id: elementDiagram.diagram_id,
                    type:ElementResult?.elements_library.type,
                    position:{
                        x: newElementStyle.x,
                        y: newElementStyle.y
                    },
                    elementlib_id: newElement.elementlib_id,
                    uuid: newElement.uuid,
                    type_f: newElement.type_f,
                    data:
                      {
                        id: Number(elementDiagram.id),
                        uuid : newElement.uuid,
                        title: newElement.title,
                        key : ElementResult?.elements_library.unique_key,
                        description: newElement.description,
                        icon : newElement.icon
                      },
                   width : newElementStyle.width,
                   height: newElementStyle.height
                  }
            }
        } catch (error) {
            console.log("\n");
            console.log(error);
            console.log("\n");
            await transaction.rollback();
            throw new ResponseError(500,JSON.stringify(error));
        }
        
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
 
    public async update(element_diagram_id:number, data : Partial<ElementSequelize>): Promise<[number,ElementSequelize[]]>{
       const transaction = await database.transaction();
       try {
        const elementIdentity = {
            title: data.title,
            description: data.description,
        };
        const elementDiagram = await ElementDiagramSequelize.findByPk(
            element_diagram_id,
            {
             transaction:transaction
            }
        );

        const  result =  await ElementSequelize.update(
            elementIdentity,
            { 
             where: { 
                     uuid: elementDiagram?.element_id 
                    }, 
             returning: true,
             transaction:transaction,
            }
        );
        await transaction.commit();
        return result ;
       } catch (error) {
        await transaction.rollback();
        throw new ResponseError(500,JSON.stringify(error));
       }
       
    }

    // 
    public async updateTest(id:number, data : Partial<ElementSequelize>): Promise<[number,ElementSequelize[]]>{
        return await ElementSequelize.update(data, { where: { uuid: id }, returning: true });
    }

    public async updateOccurences(id:string,diagram_id:number, element: Partial<ElementSequelize>,uuid_occurences:string|any): Promise<[number,ElementDiagramSequelize[]]>{
        console.log("\n repository updateOccurences \n");
        console.log(element);
        console.log('\n');

        const transaction = await database.transaction();
        try {
            const result = await ElementDiagramSequelize.update(
                {
                    element_id:uuid_occurences,
                    occurence: true
                },
                {
                 where:{
                        id:id,
                       }, 
                 returning:true,
                 transaction:transaction
                }
            );
            await transaction.commit();
            return result;
        } catch (error) {
            await transaction.rollback();
            throw new ResponseError(500,JSON.stringify(error));
        }
    }

    public async updateOccurencesTest(id:string,diagram_id:number, element: Partial<ElementSequelize>): Promise<[number,ElementSequelize[]]>{
        console.log("ini update occurence test");
        console.log(element);
        // const dataResult = await ElementSequelize.update(data, { where: { uuid: data.uuid }, returning: true });
        const updateElemenDiagram =  await ElementDiagramSequelize.update({element_id:element.id, occurence: true},{where:{id:id}});
       console.log("aman lanjut",updateElemenDiagram);
        return  await ElementSequelize.update(element, { where: { uuid: element.uuid }, returning: true });   
    }

    
    public async updateStyleElement(element_diagram_id:number, style_id:number, element: Partial<updateElementStyleDTO>): Promise<[number,ElementIdentitySequlize[]]>{
        const transaction= await database.transaction();
        try {
            console.log("\n");
            console.log("ini updatePositionElement");
            console.log(element);
            console.log("\n");
    
            const updateStyle={
                x:element.position_x,
                y:element.position_y,
                width:element.width,
                height:element.height,
            };
    
            const  result = await ElementStyleSequlize.update(
                updateStyle,
                { 
                 where: { 
                    id: style_id,                    
                  }, 
                 transaction: transaction,
                 returning: true, 
                },
            );   
            await transaction.commit();
            return result;
        } catch (error) {
            transaction.rollback();
            throw new ResponseError(500,JSON.stringify(error));
        }
     }
    
     public async deleteElement(element_diagram_id: number): Promise<number> {
        const transaction = await database.transaction();
        try {
          const elementDiagramInstance = await ElementDiagramSequelize.findByPk(element_diagram_id, { transaction });
          
          if (!elementDiagramInstance) {
            throw new ResponseError(404, "Element diagram not found");
          }
      
          await elementDiagramInstance.destroy({ transaction });
      
          await transaction.commit();
          return element_diagram_id;
        } catch (error) {
          await transaction.rollback();
          throw new ResponseError(500, JSON.stringify(error));
        }
      }      
}

export default new ElementRepository();
