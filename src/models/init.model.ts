import { Sequelize } from "sequelize";
import AttributesModel, { AttributesModelMap } from "./attributes.model";
import ElementLibraryModel, { ElementLibraryMap } from "./element_library.model";
import ElementlibJuncAttribModel, { ElementlibJuncAttribMap } from "./elementlib_attribute.model";

export const initModel = (databases : Sequelize)=>{
    
    console.log('inisiasi model');
    AttributesModelMap(databases);

    ElementlibJuncAttribMap(databases);
    // ElementlibJuncAttribModel.belongsTo(ElementLibraryModel);
    ElementLibraryMap(databases);
    // ElementLibraryModel.hasMany(ElementlibJuncAttribModel);

    ElementLibraryModel.hasMany(ElementlibJuncAttribModel, {
        sourceKey: 'id',
        foreignKey: 'elementlib_id',
        as: 'element_junction_fk'
      });

    AttributesModel.hasMany(ElementlibJuncAttribModel, {
        sourceKey: 'id',
        foreignKey: 'attribute_id',
        as: 'attribute_junction_fk'
    });
    
    ElementlibJuncAttribModel.belongsTo(ElementLibraryModel,{
        foreignKey: 'elementlib_id',
        as: 'junction_element'});

    ElementlibJuncAttribModel.belongsTo(AttributesModel,{
        foreignKey: 'attribute_id',
        as: 'junction_attribute'});

}
