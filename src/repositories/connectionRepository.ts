import database from "../database";
import { createConnectionResponse } from "../models/connections.model";
import { createElementResponse } from "../models/elements.model";
import { ResponseError } from "../response/error/error_response";
import ConnectionSequelize from "../sequelize/connection.seq";
import DiagramSequelize from "../sequelize/diagrams.seq";


class ConnectionRepository{
    
    public async getAllConnectioninDiaragram(diagram_id:number): Promise<ConnectionSequelize[]>{
        console.log('getAllConnectioninDiaragram');
        return await ConnectionSequelize.findAll(
            {
             where:
             {
              diagram_id:diagram_id
             }
            }
        );
    }
    
    public async findAllConnectionRelated(): Promise<ConnectionSequelize[]>{
        console.log('data terpanggil');
        return await ConnectionSequelize.findAll({include:'element_junction_fk'});        
    }

    public async getConnectionById(id: number): Promise<ConnectionSequelize | null> {
        return await ConnectionSequelize.findByPk(Number(id));
    }

    public async getConnectionOnCertainDiagram(diagram_id: number): Promise<ConnectionSequelize[] | null> {
        return await ConnectionSequelize.findAll(
         {
            include:[{
                model:DiagramSequelize,
                where:{id:diagram_id}
            }]
         }
        );
    }

    public async createConnection(element: Omit<createConnectionResponse,"id">): Promise<ConnectionSequelize> {
       try {
        return await ConnectionSequelize.create(element);
       } catch (error) {
        throw new ResponseError(403,JSON.stringify(error));
       }
       
    }

    public async updateConnection(id:number,data : Partial<ConnectionSequelize>): Promise<[number,ConnectionSequelize[]]>{
        const transaction = await database.transaction();
        try {
            const result = await ConnectionSequelize.update(
                data,
                {
                 where: { id:id },
                 returning: true,
                 transaction:transaction
                }
            );
            await transaction.commit();
            return result;
        } catch (error) {
            await transaction.rollback();
            throw new ResponseError(403,JSON.stringify(error));
        }
        
    }
    
    public async deleteConnection(id: number): Promise<number> {
    return await ConnectionSequelize.destroy({ where: { id } });
    }
}

export default new ConnectionRepository();
