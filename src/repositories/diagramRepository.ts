import database from "../database";
import { updateDiagramRequestDTO } from "../models/diagram.model";
import { ResponseError } from "../response/error/error_response";
import DiagramSequelize from "../sequelize/diagrams.seq";


class DiagramRepository{
    
    public async getAllDiagram(): Promise<DiagramSequelize[]>{
        console.log('\n === getAllDiagram ===');
        return await DiagramSequelize.findAll();
    }

    public async getDiagramById(id: number): Promise<DiagramSequelize | null> {
        console.log('\n === getDiagramById ===');
        return await DiagramSequelize.findByPk(id);
    }

    public async updateDiagram(id:number,data_to_update : Partial<updateDiagramRequestDTO>): Promise<[number,DiagramSequelize[]]>{
        console.log('\n === getDiagramById ===');
        console.log(data_to_update);
        console.log('\n');
        const transaction = await database.transaction();
      try {
        const result = await DiagramSequelize.update(
            data_to_update, 
            { 
                where: { id }, 
                returning: true,
                transaction:transaction
            }
        );
        await transaction.commit();
        return result;
      } catch (error) {
        await transaction.rollback();
        throw new ResponseError(500, JSON.stringify(error));
      }
       
    }
    
    public async deleteDiagram(id: number): Promise<number> {
    return await DiagramSequelize.destroy({ where: { id } });
    }
}

export default new DiagramRepository();
