import ElementLibraryModel from "../models/element_library.model";
import ElementlibJuncAttribModel from "../models/elementlib_attribute.model";

class elementLibraryRepository{
    
    public async findAllElementLib(): Promise<ElementLibraryModel[]>{
        console.log('data terpanggil');
        return await ElementLibraryModel.findAll();
    }
    
    public async findAllElementLibRelated(): Promise<ElementLibraryModel[]>{
        console.log('data terpanggil');
        return await ElementLibraryModel.findAll({include:'element_junction_fk'});        
    }

    public async findById(id: number): Promise<ElementLibraryModel | null> {
        return await ElementLibraryModel.findByPk(Number(id));
    }

    public async create(elementlib: Omit<ElementLibraryModel,"id">): Promise<ElementLibraryModel> {
        return await ElementLibraryModel.create(elementlib);
    }

    public async update(id:number,data : Partial<ElementLibraryModel>): Promise<[number,ElementLibraryModel[]]>{
        return await ElementLibraryModel.update(data, { where: { id }, returning: true });
    }
    
    public async delete(id: number): Promise<number> {
    return await ElementLibraryModel.destroy({ where: { id } });
    }
}

export default new elementLibraryRepository();
