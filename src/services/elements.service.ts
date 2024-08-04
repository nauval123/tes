// import ElementLibraryModel from "../models/element_lib
import { bulkCreateElementResponse, createElementResponse, createElementResponseResult, getElementResponse, getElementResponses, testCreateElement, updateElementIdentityDTO, updateElementStyleDTO,  } from "../models/elements.model";
import elementRepository from "../repositories/elementRepository";
import { ResponseError } from "../response/error/error_response";
import ElementDiagramSequelize from "../sequelize/element_diagram.seq";
import ElementIdentitySequlize from "../sequelize/element_style";
import ElementPositionSequlize from "../sequelize/element_style";
import ElementSequelize from "../sequelize/elements.seq";
import { ElementValidation } from "../validation/element_validation";

class ElementService {
  
    // public async getAllelements(): Promise<ElementSequelize[]> {
    //     return await elementRepository.findAllElement();
    // }

    // public async getAllelements
    // // Test
    // (): Promise<getElementResponses[]> {
    //   const elementlist = await elementRepository.findAllElement();
    //   const resultModified : any= elementlist.map(dataElement => ({
    //     id: Number(dataElement.id),
    //     type: dataElement.elements_library?.type,
    //     data: {
    //       title: dataElement.title,
    //       description: dataElement.description,
    //       icon: dataElement.elements_library?.icon,
    //       key: dataElement.elements_library?.unique_key
    //     },
    //     position: {
    //       x: Number(dataElement.position_x),
    //       y: Number(dataElement.position_y)
    //     },
    //     height: dataElement.height,
    //     width: dataElement.width,
    //     elementlib_id: dataElement.id,
    //     // uuid:dataElement.uuid,
    //   }));
    //   return resultModified;
    // }
 
    public async getElementsById(id: number): Promise<ElementDiagramSequelize | null> {
      return await elementRepository.findElementById((id));
    }
    
   

    public async getElementsByUUIDandTitle(title:string,type_f:string): Promise<ElementSequelize|null>{
      return await elementRepository.findByTittleandType_f(title,type_f);
    }

    public async getElementsTitle(title:string): Promise<ElementSequelize|null>{
      return await elementRepository.findByTittle(title);
    }
    
    public async getElementsInDiagramByIdDiagram(diagram_id:number): Promise<getElementResponse[] | null>{
      const elementInDiagram = await elementRepository.getAllElementRelatedDiagram(diagram_id);
      
      console.log('\n');
      console.log("getElementsInDiagramByIdDiagram");
      console.log(elementInDiagram);
      console.log('\n');
      
      const elementInDiagramTransform : any[] = elementInDiagram.map(element => {
        return {
        id: element.element_diagrams[0].id, 
        type:element.elements_library?.type,
        position:{
            style_id: element.element_diagrams[0].style_id,
            x:element.element_diagrams[0].element_style.x,
            y:element.element_diagrams[0].element_style.y,
          },
        elementlib_id:element.elementlib_id,
        uuid:element.uuid,
        data: {
            id:element.element_diagrams[0].id,
            uuid:element.uuid,
            title:element.title,
            default_title:element.elements_library.name,
            key:element.elements_library.unique_key,
            type_icon:element.icon,
            description:element.description,
            default_description:element.elements_library.description_default,
            icon:element.icon
          },
        width:element.element_diagrams[0].element_style.width,
        height:element.element_diagrams[0].element_style.height
      }
    });
    
      console.log('\n');
      console.log(elementInDiagramTransform);
      console.log('\n');

      return elementInDiagramTransform;
    }
  
    public async createTest(element: Omit<testCreateElement, "id">): Promise<createElementResponseResult> {
      return await elementRepository.createTest(element);
    }

    public async createElementIntoCanvas(element: Omit<testCreateElement, "id">): Promise<createElementResponseResult> {
      console.log("\n");
      console.log("createElementIntoCanvas service")
      console.log(element);
      const dataResult = ElementValidation.CreateFromElementList.safeParse(element);
    
      console.log(dataResult.data);
      console.log("\n");
      
      return await elementRepository.createElementIntoCanvas(dataResult.data);
    }


    public async createElements(element: Omit<createElementResponse, "id">): Promise<ElementSequelize> {
      return await elementRepository.create(element);
    }

    public async createElementList(element: bulkCreateElementResponse[]): Promise<ElementSequelize[]> {
      return await elementRepository.createBatch(element);
    }
  
    public async updateElements(id: number, element: Partial<updateElementIdentityDTO>): Promise<[number, ElementSequelize[]]> {
      return await elementRepository.update(id, element);
    }

    // jika data bertipe definition
    public async updateElement(element_diagram_id: number, element: Partial<updateElementIdentityDTO>): Promise<[number, ElementSequelize[]]> {
      const validationResult = ElementValidation.UPDATE.safeParse(element);
      console.log("data hasil validasi updateElement", validationResult);
      if(!validationResult.success){
        throw new ResponseError(403,JSON.stringify(validationResult.error.format()));
      }
      const result = await elementRepository.update(element_diagram_id, validationResult.data);
      return result;
    }

    public async updateElementsTest(id: number, element: Partial<updateElementIdentityDTO>): Promise<[number, ElementSequelize[]]> {
      const validationResult = ElementValidation.UPDATE.safeParse(element);
      if(!validationResult.success){
        throw new ResponseError(403,JSON.stringify(validationResult.error.format()));
      }
      const result = await elementRepository.updateTest(id, validationResult.data);
      return result;
    }

    public async updateElementStyle(element_diagram_id: string, style_id:number,
      element: Partial<updateElementStyleDTO>): Promise<[number, ElementIdentitySequlize[]]>{
      const result = await elementRepository.updateStyleElement(Number(element_diagram_id), style_id, element);
      return result;
    }

    public async updateElementsOccuresOrNew(element_diagram_id: string, diagram_id:number, element: Partial<updateElementIdentityDTO>, uuid_occurences:string|any): Promise<[number, ElementDiagramSequelize[]]> {
      const validationResult = ElementValidation.UPDATE.safeParse(element);
      if(!validationResult.success){
        throw new ResponseError(403,JSON.stringify(validationResult.error.format()));
      }
      const result = await elementRepository.updateOccurences(element_diagram_id, diagram_id, validationResult.data,uuid_occurences);
      return result;
    }

    // test
    public async updateElementsOccuresOrNewTest(id: string, diagram_id:number, element: Partial<updateElementIdentityDTO>): Promise<[number, ElementSequelize[]]> {
      // const validationResult = ElementValidation.UPDATE.safeParse(element);
      // if(!validationResult.success){
      //   throw new ResponseError(403,JSON.stringify(validationResult.error.format()));
      // }
      // const result = await elementRepository.updateTest(uuid, validationResult.data);
      const result = await elementRepository.updateOccurencesTest(id, diagram_id, element);
      return result;
    }
  
    public async deleteElement(element_diagram_id:number): Promise<number>{
      return await elementRepository.deleteElement(element_diagram_id);
    }
}

export default new ElementService;