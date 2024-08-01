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

    // diagram memiliki banyak element
    DiagramSequelize.hasMany(ElementDiagramSequelize,{
        sourceKey: 'id',
        foreignKey: 'diagram_id',
        // as: 'diagram_elementdigram'
    });
    
    // diagram memiliki banyak connection / edge 
    DiagramSequelize.hasMany(ConnectionSequelize,{
        sourceKey: 'id',
        foreignKey: 'diagram_id',
        as: 'diagram_connection'
    });

    DiagramSequelize.belongsToMany(ElementSequelize,{through:ElementDiagramSequelize,foreignKey:"diagram_id",
        as:"diagram_elements"
    });
    // ==== diagram ==


    //  element library 
    // element library memiliki banyak atribut
    ElementLibrarySequelize.hasMany(ElementlibJuncAttribSequelize, {
        sourceKey: 'id',
        foreignKey: 'elementlib_id',
        as: 'element_junctionattribute'
    });

    // element library memiliki banyak elemen
    ElementLibrarySequelize.hasMany(ElementSequelize, {
        sourceKey: 'id',
        foreignKey: 'elementlib_id',
        // as: 'element_elementlibrary'
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
    ElementSequelize.hasMany(ElementDiagramSequelize,{
        sourceKey:'uuid',
        foreignKey:'element_id',
        // as: 'element_elementDiagram'
    });

    ElementSequelize.belongsTo(ElementLibrarySequelize,{
        foreignKey:'elementlib_id',
        as: 'elemen_elementLibrary'
    });

    ElementSequelize.belongsToMany(DiagramSequelize,{through:ElementDiagramSequelize,foreignKey:"element_id", 
        // as:"element_diagrams"
    });
    // === element ===

    // ElementlibJunattribute
    ElementlibJuncAttribSequelize.belongsTo(ElementLibrarySequelize,{
        foreignKey: 'elementlib_id',
        as: 'attributejunction_element'
    });

    ElementlibJuncAttribSequelize.belongsTo(AttributeSequelize,{
        foreignKey: 'attribute_id',
        as: 'attributejunction_attribute'
    });
    //  === ElementlibJunattribute ===
    
    // element diagram
    ElementDiagramSequelize.belongsTo(DiagramSequelize,{
        foreignKey:'diagram_id',
        // as:"elemenDiagram_diagram"
    });

    ElementDiagramSequelize.belongsTo(ElementSequelize,{
        foreignKey:'element_id',
        // as:"elemendig_element"
    });
    // === element diagram ===

    //  connection
    ConnectionSequelize.belongsTo(DiagramSequelize,{
        foreignKey:'diagram_id',
        as:'connection_diagram'
    });
    
    ConnectionSequelize.belongsTo(ElementSequelize,{
        foreignKey:'source',
        as:'connection_element_source'
    });

    ConnectionSequelize.belongsTo(ElementSequelize,{
        foreignKey:'target',
        as:'connection_element_target'
    });
    //  === connection ===
}
