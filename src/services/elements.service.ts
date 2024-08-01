// import ElementLibraryModel from "../models/element_lib
import { bulkCreateElementResponse, createElementResponse, createElementResponseResult, getElementResponse, getElementResponses, testCreateElement, updateElementResponseTest } from "../models/elements.model";
import elementRepository from "../repositories/elementRepository";
import { ResponseError } from "../response/error/error_response";
import ElementSequelize from "../sequelize/elements.seq";
import { ElementValidation } from "../validation/element_validation";

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
    
    // check if occurences test 
    public async getElementsByUUIDandTitleTest(uuid: string,title:string,type_f:string): Promise<ElementSequelize|null>{
      return await elementRepository.findByUUIDTittleTest(uuid,title,type_f);
    }

    public async getElementsTitle(title:string): Promise<ElementSequelize|null>{
      return await elementRepository.findByTittle(title);
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
  
    public async createTest(element: Omit<testCreateElement, "id">): Promise<createElementResponseResult> {
      return await elementRepository.createTest(element);
    }


    public async createElements(element: Omit<createElementResponse, "id">): Promise<ElementSequelize> {
      return await elementRepository.create(element);
    }

    public async createElementList(element: bulkCreateElementResponse[]): Promise<ElementSequelize[]> {
      return await elementRepository.createBatch(element);
    }
  
    public async updateElements(id: number, element: Partial<updateElementResponseTest>): Promise<[number, ElementSequelize[]]> {
      return await elementRepository.update(id, element);
    }

    public async updateElementsTest(id: string, element: Partial<updateElementResponseTest>): Promise<[number, ElementSequelize[]]> {
      const validationResult = ElementValidation.UPDATE.safeParse(element);
      if(!validationResult.success){
        throw new ResponseError(403,JSON.stringify(validationResult.error.format()));
      }
      const result = await elementRepository.updateTest(id, validationResult.data);
      return result;
    }

    // test
    public async updateElementsOccuresOrNewTest(id: string,diagram_id:number ,element: Partial<updateElementResponseTest>): Promise<[number, ElementSequelize[]]> {
      // const validationResult = ElementValidation.UPDATE.safeParse(element);
      // if(!validationResult.success){
      //   throw new ResponseError(403,JSON.stringify(validationResult.error.format()));
      // }
      // const result = await elementRepository.updateTest(uuid, validationResult.data);
      const result = await elementRepository.updateOccurencesTest(id, diagram_id, element);
      return result;
    }
  
    public async deleteElements(id: number): Promise<number> {
      return await elementRepository.delete(id);
    }
}

export default new ElementService;