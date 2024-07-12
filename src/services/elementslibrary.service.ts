import ElementLibraryModel from "../models/element_library.model";
import elementLibraryRepository from "../repositories/elementLibraryRepository";

class ElementLibraryService {
  
    public async getAllelementsOnLibrary(): Promise<ElementLibraryModel[]> {
        return await elementLibraryRepository.findAllElementLibRelated();
      }

    public async testing(): Promise<ElementLibraryModel[]> {
      return await elementLibraryRepository.findAllElementLib();
    }
    
    public async getElementsLibById(id: number): Promise<ElementLibraryModel | null> {
      return await elementLibraryRepository.findById((id));
    }
  
    public async createElementsLib(element: Omit<ElementLibraryModel, "id">): Promise<ElementLibraryModel> {
      return await elementLibraryRepository.create(element);
    }
  
    public async updateElementsLib(id: number, element: Partial<ElementLibraryModel>): Promise<[number, ElementLibraryModel[]]> {
      return await elementLibraryRepository.update(id, element);
    }
  
    public async deleteElementsLib(id: number): Promise<number> {
      return await elementLibraryRepository.delete(id);
    }
}

export default new ElementLibraryService;