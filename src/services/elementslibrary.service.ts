import { createElementLibResponse, getElementLibDTO,} from "../models/element_library.model";
import elementLibraryRepository from "../repositories/elementLibraryRepository";
import { ResponseError } from "../response/error/error_response";
import ElementLibrarySequelize from "../sequelize/element_library.seq";
import { ElementLibValidation } from "../validation/elementlib_validation";

class ElementLibraryService {
  
    public async getAllelementsOnLibrary(): Promise<getElementLibDTO[]> {
        // return await elementLibraryRepository.findAllElementLib();
        const result = await elementLibraryRepository.findAllElementLib();
        const result_modified : getElementLibDTO[] = result.map(
            data => ({
              id: data.id,
              name: data.name,
              type: data.type,
              icon: data.icon,
              default_width: data.default_width,
              default_height: data.default_height,
              // unique_key : data.unique_key,
              type_f:data.type_f,
              data: { 
                key: data.unique_key,
                title:data.name,
                type_icon: data.icon,
                description: data.name,
                icon: data.icon,
              },
          })
        );
        return result_modified;
    }

    public async testing(): Promise<getElementLibDTO[]> {
      const result = await elementLibraryRepository.findAllElementLib();
      const result_modified : getElementLibDTO[] = result.map(data => ({
        // id:  data.id,
        // name: data.name,
        // type:  data.type,
        // icon: data.icon,
        // default_width: data.default_width,
        // default_height: data.default_height,
        // unique_key:data.unique_key,
        // description_default:data.description_default

        id: data.id,
        name: data.name,
        type: data.type,
        icon: data.icon,
        default_width: data.default_width,
        default_height: data.default_height,
        type_f:data.type_f,
        data: { 
          key: data.unique_key,
          title:data.name,
          type_icon: data.icon,
          description: data.name,
          icon: data.icon,
        },
      }));
      return result_modified;
    }
    
    public async getElementsLibById(id: number): Promise<ElementLibrarySequelize | null> {
      return await elementLibraryRepository.findById((id));
    }

    public async getElementsLibByUniqueKey(id: number): Promise<ElementLibrarySequelize | null> {
      return await elementLibraryRepository.findByUniqueKey((id));
    }
  
    public async createElementsLib(element: Omit<createElementLibResponse, "id">): Promise<ElementLibrarySequelize> {
      
      const validationResult = ElementLibValidation.CREATE.safeParse(element);
      if (validationResult.success == false) {
        throw new ResponseError(400,validationResult.error.issues[0].message); // Throw a custom error with the Zod error message.
      }else{
        return await elementLibraryRepository.create(element);
      }
    }
  
    public async updateElementsLib(id: number, element: Partial<createElementLibResponse>): Promise<[number, ElementLibrarySequelize[]]> {
      return await elementLibraryRepository.update(id, element);
    }
  
    public async deleteElementsLib(id: number): Promise<number> {
      return await elementLibraryRepository.delete(id);
    }
}

export default new ElementLibraryService;