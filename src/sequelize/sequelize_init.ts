import { Sequelize } from "sequelize";
import AttributeSequelize, { AttributesInitialize } from "./attributes.seq";
import ElementlibJuncAttribSequelize, { ElementlibJuncAttribInitialize } from "./elementlib_attribute.seq";
import ElementLibrarySequelize, { ElementLibraryInitialize } from "./element_library.seq";
import ElementSequelize, { ElementsInitialize } from "./elements.seq";


export const initSequelize = (databases : Sequelize)=>{
    
    console.log('inizialise sequilize to connect db');
    AttributesInitialize(databases);
    ElementlibJuncAttribInitialize(databases);
    ElementLibraryInitialize(databases);
    ElementsInitialize(databases);

    ElementLibrarySequelize.hasMany(ElementlibJuncAttribSequelize, {
        sourceKey: 'id',
        foreignKey: 'elementlib_id',
        as: 'element_junction_fk'
    });

    ElementLibrarySequelize.hasMany(ElementSequelize, {
        sourceKey: 'id',
        foreignKey: 'elementlib_id',
        as: 'element_element_library_fk'
    });

    AttributeSequelize.hasMany(ElementlibJuncAttribSequelize, {
        sourceKey: 'id',
        foreignKey: 'attribute_id',
        as: 'attribute_junction_fk'
    });

    ElementSequelize.belongsTo(ElementLibrarySequelize,{
        foreignKey:'elementlib_id',
        as: 'elementLibrary_element'
    });
    
    ElementlibJuncAttribSequelize.belongsTo(ElementLibrarySequelize,{
        foreignKey: 'elementlib_id',
        as: 'junction_element'});

    ElementlibJuncAttribSequelize.belongsTo(AttributeSequelize,{
        foreignKey: 'attribute_id',
        as: 'junction_attribute'});

}
