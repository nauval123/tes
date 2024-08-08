import DiagramSequelize from "../sequelize/diagrams.seq";
import DiagramRepository from "../repositories/diagramRepository";
import { ResponseError } from "../response/error/error_response";
import { DiagramValidation } from "../validation/diagram_validation";
import { createDiagramRequestDTO } from "../models/diagram.model";

class ConnectionService {
  
    public async getDiagramById(diagram_id:number): Promise<DiagramSequelize | null> {
        return await DiagramRepository.getDiagramById(diagram_id);
    }

    public async getAllDiagram(): Promise<DiagramSequelize[]> {
        return await DiagramRepository.getAllDiagram();
    }
     
    public async updateDiagramById(id: number, connection: Partial<createDiagramRequestDTO>): Promise<[number, DiagramSequelize[]]> {
      const validationResult = DiagramValidation.UpdateAttributeConnection.safeParse(connection);
      if(!validationResult.success){
        throw new ResponseError(400,JSON.stringify(validationResult.error.format()));
      }
      return await DiagramRepository.updateDiagram(id, validationResult.data);
    }

    // public async createDiagram(connection: Omit<createConnectionResponse, "id">): Promise<createConnectionResponseResult> {
    //   const validation = ConnectionValidation.CreateConnection.safeParse(connection);
    //   if(!validation.success){
    //     throw new ResponseError(400,JSON.stringify(validation.error.format()));
    //   }
    //   return await DiagramRepository.createDiagram(validation.data);
    // }
 
    public async deleteDiagram(id: number): Promise<number> {
      return await DiagramRepository.deleteDiagram(id);
    }
}

export default new ConnectionService;