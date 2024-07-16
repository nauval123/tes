// import ElementLibraryModel from "../models/element_library.model";
import ElementModel, { createElementResponse } from "../models/elements.model";
import elementRepository from "../repositories/elementRepository";
import ElementSequelize from "../sequelize/elements.seq";

class ElementService {
  
    public async getAllelements(): Promise<ElementSequelize[]> {
        return await elementRepository.findAllElement();
    }
 
    public async getElementsById(id: number): Promise<ElementSequelize | null> {
      return await elementRepository.findById((id));
    }
  
    public async createElements(element: Omit<createElementResponse, "id">): Promise<ElementSequelize> {
      return await elementRepository.create(element);
    }
  
    public async updateElements(id: number, element: Partial<createElementResponse>): Promise<[number, ElementSequelize[]]> {
      return await elementRepository.update(id, element);
    }
  
    public async deleteElements(id: number): Promise<number> {
      return await elementRepository.delete(id);
    }
}

export default new ElementService;