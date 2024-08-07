import { Op } from "sequelize";
import database from "../database";
import { createConnectionResponse, createConnectionResponseResult } from "../models/connections.model";
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

    public async createConnection(element: Omit<createConnectionResponse,"id">): Promise<createConnectionResponseResult> {
        const transaction = await database.transaction();
        try {
        const result =  await ConnectionSequelize.create(element,{transaction:transaction,returning:true});
        await transaction.commit();
        return {
            status : 'success',
            data : {
              id: result.id,
              diagram_id: element.diagram_id,
              source: element.source,
              sourceHandle: element.source_handle,
              target: result.target,
              targetHandle: result.target_handle,
              type: result.type??"",
              label: result.label??"",
              data: {
                  uuid: result.uuid,
                  label: result.label??"",
                  type: result.type??""
              }
            }
          };
       } catch (error) {
        transaction.rollback();
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

    public async deleteBulkConnection(connection_ids: number[]): Promise<number> {
        const transaction = await database.transaction();
        try {
            const instances = await ConnectionSequelize.destroy({
                where: {
                    id: {
                        [Op.in]: connection_ids
                    }
                },
                transaction:transaction,
            });
    
            if (instances === 0) {
                throw new ResponseError(404, "No element connections found");
            }
    
                   
    
            await transaction.commit();
            return instances;
        } catch (error) {
            await transaction.rollback();
            throw new ResponseError(500, JSON.stringify(error));
        }
      }      
}

export default new ConnectionRepository();
