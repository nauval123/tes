// import ElementLibraryModel from "../models/element_library.model";
import ElementLibraryModel, { createElementLibResponse } from "../models/element_library.model";
import ElementModel, { createElementResponse } from "../models/elements.model";
import elementLibraryRepository from "../repositories/elementLibraryRepository";
import ElementLibrarySequelize from "../sequelize/element_library.seq";
import { ElementLibValidation } from "../validation/elementlib_validation";
import { Validation } from "../validation/validation";

class ElementLibraryService {
  
    public async getAllelementsOnLibrary(): Promise<ElementLibrarySequelize[]> {
        return await elementLibraryRepository.findAllElementLib();
    }

    public async testing(): Promise<ElementLibraryModel[]> {
      const result = await elementLibraryRepository.findAllElementLib();
      return result.map(data => new ElementLibraryModel(
        data.id,
        data.name,
        data.type,
        data.icon,
        data.default_width,
        data.default_height,
        data.unique_key
      ));
    }
    
    public async getElementsLibById(id: number): Promise<ElementLibrarySequelize | null> {
      return await elementLibraryRepository.findById((id));
    }

    public async getElementsLibByUniqueKey(id: number): Promise<ElementLibrarySequelize | null> {
      return await elementLibraryRepository.findByUniqueKey((id));
    }
  
    public async createElementsLib(element: Omit<createElementLibResponse, "id">): Promise<ElementLibrarySequelize> {
      return await elementLibraryRepository.create(element);
    }
  
    public async updateElementsLib(id: number, element: Partial<createElementLibResponse>): Promise<[number, ElementLibrarySequelize[]]> {
      return await elementLibraryRepository.update(id, element);
    }
  
    public async deleteElementsLib(id: number): Promise<number> {
      return await elementLibraryRepository.delete(id);
    }
}

export default new ElementLibraryService;