// import ElementLibraryModel from "../models/element_library.model";
import { createElementResponse, getElementResponses } from "../models/elements.model";
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
      const resultModified: getElementResponses[] = elementlist.map(dataElement => ({
        id: Number(dataElement.id),
        type: dataElement.elementLibrary_element.type,
        data: {
          title: dataElement.title,
          description: dataElement.description,
          icon: dataElement.elementLibrary_element.icon,
          key: dataElement.elementLibrary_element.unique_key
        },
        position: {
          x: Number(dataElement.position_x),
          y: Number(dataElement.position_y)
        },
        height: dataElement.height,
        width: dataElement.width,
        elementlib_id: dataElement.elementLibrary_element.id,
        uuid:dataElement.elementLibrary_element.uuid,
      }));
      return resultModified;
    }
 
    public async getElementsById(id: number): Promise<ElementSequelize | null> {
      return await elementRepository.findById((id));
    }
  
    public async createElements(element: Omit<createElementResponse, "id">): Promise<ElementSequelize> {
      return await elementRepository.create(element);
    }

    public async createElementList(element: createElementResponse[]): Promise<ElementSequelize> {
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