import { createConnectionResponse } from "../models/connections.model";
import { createElementResponse } from "../models/elements.model";
import ConnectionSequelize from "../sequelize/connection.seq";


class ConnectionRepository{
    
    public async findAllConnection(): Promise<ConnectionSequelize[]>{
        console.log('data terpanggil');
        return await ConnectionSequelize.findAll();
    }
    
    public async findAllConnectionRelated(): Promise<ConnectionSequelize[]>{
        console.log('data terpanggil');
        return await ConnectionSequelize.findAll({include:'element_junction_fk'});        
    }

    public async findById(id: number): Promise<ConnectionSequelize | null> {
        return await ConnectionSequelize.findByPk(Number(id));
    }

    public async create(element: Omit<createConnectionResponse,"id">): Promise<ConnectionSequelize> {
        return await ConnectionSequelize.create(element);
    }

    public async update(id:number,data : Partial<ConnectionSequelize>): Promise<[number,ConnectionSequelize[]]>{
        return await ConnectionSequelize.update(data, { where: { id }, returning: true });
    }
    
    public async delete(id: number): Promise<number> {
    return await ConnectionSequelize.destroy({ where: { id } });
    }
}

export default new ConnectionRepository();
