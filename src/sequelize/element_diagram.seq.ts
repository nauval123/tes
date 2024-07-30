import { Model, Association, Sequelize, DataTypes } from 'sequelize';
import ElementSequelize from './elements.seq';
import DiagramSequelize from './diagrams.seq';
// import ElementlibJuncAttribModel from './elementlib_attribute.seq';



export default class ElementDiagramSequelize extends Model {
  public id!: number;
  public element_id!: string;
  public diagram_id!: number;
  public occurence_status!: boolean;

  public element_indiagram?: ElementSequelize;
  public diagram_element? : DiagramSequelize;

  public static associations: {
    element_indiagram: Association<ElementDiagramSequelize, ElementSequelize>;
    diagram_element: Association<ElementDiagramSequelize,DiagramSequelize>;
  };
}



export const ElementDiagramInitialize = (sequelize: Sequelize) => {

  console.log('inisiasi sequalise element diagram model');
  // sequelize.authenticate()
  // .then(() => console.log('Connection has been established successfully.'))
  // .catch((error) => console.error('Unable to connect to the database:', error));

  ElementDiagramSequelize.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    element_id: {
      type: DataTypes.STRING,
      references:{
        model: 'elements',
        key: 'id',
      }
    },
    diagram_id: {
      type: DataTypes.BIGINT,
      references:{
        model: 'diagrams',
        key: 'id',
      }
    },
    occurence_status:{
      type:DataTypes.BOOLEAN,
    }
  }, {
    sequelize,
    modelName:'element_diagram',
    tableName: 'element_diagram',
    timestamps: false,
  });
    
  // ElementLibrarySequelize.sync();

}