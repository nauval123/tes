import { createConnectionResponse } from "../models/connections.model";
import {createElementResponse } from "../models/elements.model";
import ConnectionRepository from "../repositories/connectionRepository";
import elementRepository from "../repositories/elementRepository";
import ConnectionSequelize from "../sequelize/connection.seq";
import ElementSequelize from "../sequelize/elements.seq";

class ConnectionService {
  
    public async getAllConnection(): Promise<ConnectionSequelize[]> {
        return await ConnectionRepository.findAllConnection();
    }
 
    public async getConnectionById(id: number): Promise<ConnectionSequelize | null> {
      return await ConnectionRepository.findById((id));
    }
  
    public async createConnection(connection: Omit<createConnectionResponse, "id">): Promise<ConnectionSequelize> {
      return await ConnectionRepository.create(connection);
    }
  
    public async updateConnection(id: number, connection: Partial<createConnectionResponse>): Promise<[number, ConnectionSequelize[]]> {
      return await ConnectionRepository.update(id, connection);
    }
  
    public async deleteConnection(id: number): Promise<number> {
      return await ConnectionRepository.delete(id);
    }
}

export default new ConnectionService;