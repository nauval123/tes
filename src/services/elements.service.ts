// import ElementLibraryModel from "../models/element_library.model";
import { bulkCreateElementResponse, createElementResponse, getElementResponse, getElementResponses } from "../models/elements.model";
import elementRepository from "../repositories/elementRepository";
import ElementSequelize from "../sequelize/elements.seq";

class ElementService {
  
    // public async getAllelements(): Promise<ElementSequelize[]> {
    //     return await elementRepository.findAllElement();
    // }

    public async getAllelements
    // Test
    (): Promise<getElementResponses[]> {
      const elementlist = await elementRepository.findAllElement();
      const resultModified : any= elementlist.map(dataElement => ({
        id: Number(dataElement.id),
        type: dataElement.elemen_elementLibrary?.type,
        data: {
          title: dataElement.title,
          description: dataElement.description,
          icon: dataElement.elemen_elementLibrary?.icon,
          key: dataElement.elemen_elementLibrary?.unique_key
        },
        position: {
          x: Number(dataElement.position_x),
          y: Number(dataElement.position_y)
        },
        height: dataElement.height,
        width: dataElement.width,
        elementlib_id: dataElement.id,
        // uuid:dataElement.uuid,
      }));
      return resultModified;
    }
 
    public async getElementsById(id: number): Promise<ElementSequelize | null> {
      return await elementRepository.findById((id));
    }

    public async getElementsInDiagramByIdDiagram(diagram_id:number): Promise<getElementResponse[] | null>{
      const elementInDiagram = await elementRepository.getAllElementRelatedDiagram(diagram_id);
      const elementInDiagramTransform : any[] =   elementInDiagram.map(element => ({
        id: element.element_elementDiagram!.id, 
        type:element.elemen_elementLibrary?.type,
        position:{
            x:element.position_x,
            y:element.position_y,
          },
        elementlib_id:element.elementlib_id,
        uuid:element.uuid,
        data: {
            title:element.title,
            key:element.elemen_elementLibrary?.unique_key,
            type_icon:element.icon,
            description:element.description,
            icon:element.icon
          },
        width:element.width,
        height:element.height
      }));

      return elementInDiagramTransform;
    }
  
    public async createElements(element: Omit<createElementResponse, "id">): Promise<ElementSequelize> {
      return await elementRepository.create(element);
    }

    public async createElementList(element: bulkCreateElementResponse[]): Promise<ElementSequelize[]> {
      return await elementRepository.createBatch(element);
    }
  
    public async updateElements(id: number, element: Partial<createElementResponse>): Promise<[number, ElementSequelize[]]> {
      return await elementRepository.update(id, element);
    }
  
    public async deleteElements(id: number): Promise<number> {
      return await elementRepository.delete(id);
    }
}

export default new ElementService;