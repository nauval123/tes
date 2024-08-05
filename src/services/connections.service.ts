import { createConnectionResponse } from "../models/connections.model";
import {createElementResponse } from "../models/elements.model";
import ConnectionRepository from "../repositories/connectionRepository";
import elementRepository from "../repositories/elementRepository";
import { ResponseError } from "../response/error/error_response";
import ConnectionSequelize from "../sequelize/connection.seq";
import ElementSequelize from "../sequelize/elements.seq";
import { ConnectionValidation } from "../validation/connection_validation";

class ConnectionService {
  
    public async getAllConnection(diagram_id:number): Promise<ConnectionSequelize[]> {
        return await ConnectionRepository.getAllConnectioninDiaragram(diagram_id);
    }
 
    public async getConnectionById(id: number): Promise<ConnectionSequelize | null> {
      return await ConnectionRepository.getConnectionById((id));
    }
  
    public async updateConnection(id: number, connection: Partial<createConnectionResponse>): Promise<[number, ConnectionSequelize[]]> {
      const validationResult = ConnectionValidation.UpdateAttributeConnection.safeParse(connection);
      if(!validationResult.success){
        throw new ResponseError(400,JSON.stringify(validationResult.error.format()));
      }
      return await ConnectionRepository.updateConnection(id, validationResult.data);
    }

    public async getAllConnectionInCertainDiagram(diagram_id: number): Promise<ConnectionSequelize[] | null> {
      return await ConnectionRepository.getConnectionOnCertainDiagram((diagram_id));
    }

    public async createConnection(connection: Omit<createConnectionResponse, "id">): Promise<ConnectionSequelize> {
      const validation = ConnectionValidation.CreateConnection.safeParse(connection);
      if(!validation.success){
        throw new ResponseError(400,JSON.stringify(validation.error.format()));
      }
      return await ConnectionRepository.createConnection(validation.data);
    }
 
    public async deleteConnection(id: number): Promise<number> {
      return await ConnectionRepository.deleteConnection(id);
    }
}

export default new ConnectionService;