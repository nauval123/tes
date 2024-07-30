import { Sequelize } from "sequelize";
import AttributeSequelize, { AttributesInitialize } from "./attributes.seq";
import ElementlibJuncAttribSequelize, { ElementlibJuncAttribInitialize } from "./elementlib_attribute.seq";
import ElementLibrarySequelize, { ElementLibraryInitialize } from "./element_library.seq";
import ElementSequelize, { ElementsInitialize } from "./elements.seq";
import DiagramSequelize, { DiagramInitialize } from "./diagrams.seq";
import ConnectionSequelize, { ConnectionInitialize } from "./connection.seq";
import ElementDiagramSequelize, { ElementDiagramInitialize } from "./element_diagram.seq";


export const initSequelize = (databases : Sequelize)=>{
    
    console.log('inizialise sequilize to connect db');
    AttributesInitialize(databases);
    ElementlibJuncAttribInitialize(databases);
    ElementLibraryInitialize(databases);
    ElementsInitialize(databases);
    DiagramInitialize(databases);
    ConnectionInitialize(databases);
    ElementDiagramInitialize(databases);

    // diagram mempunyai 
    DiagramSequelize.hasMany(ElementDiagramSequelize,{
        sourceKey: 'id',
        foreignKey: 'diagram_id',
        as: 'diagram_elementdig_fk'
    });

    DiagramSequelize.hasMany(ConnectionSequelize,{
        sourceKey: 'id',
        foreignKey: 'diagram_id',
        as: 'diagram_connection_fk'
    });
    // ==== diagram ==


    //  element library 

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

    // ==== element library ===

    // attribute 
    AttributeSequelize.hasMany(ElementlibJuncAttribSequelize, {
        sourceKey: 'id',
        foreignKey: 'attribute_id',
        as: 'attribute_junction_fk'
    });
    //  === attribute ===

    //  element
    ElementSequelize.belongsTo(ElementLibrarySequelize,{
        foreignKey:'diagram_id',
        as: 'diagrams_element'
    });

    ElementSequelize.belongsTo(ElementLibrarySequelize,{
        foreignKey:'elementlib_id',
        as: 'elementLibrary_element'
    });
    // === element ===

    // Elementlibrary attribute
    ElementlibJuncAttribSequelize.belongsTo(ElementLibrarySequelize,{
        foreignKey: 'elementlib_id',
        as: 'junction_element'});

    ElementlibJuncAttribSequelize.belongsTo(AttributeSequelize,{
        foreignKey: 'attribute_id',
        as: 'junction_attribute'});
    //  === Elementlibrary attribute ===
    
    // element diagram
    ElementDiagramSequelize.belongsTo(DiagramSequelize,{
        foreignKey:'diagram_id',
        as:"elemendig_diagram"
    });
    // === element diagram ===

    //  connection
    ConnectionSequelize.belongsTo(DiagramSequelize,{
        foreignKey:'diagram_id',
        as:'connection_diagram'});
    //  === connection ===
}
