import { Model, Sequelize, DataTypes } from 'sequelize';
import ElementSequelize from './elements.seq';
// import ElementlibJuncAttribModel from './elementlib_attribute.seq';



export default class DiagramSequelize extends Model {
  public id!: number;
  public name!: string;
  public diagram_type? : string;
  public created_at! : string;
  public update_at! : string;
}



export const DiagramInitialize = (sequelize: Sequelize) => {

  console.log('inisiasi sequalise diagram model');
  // sequelize.authenticate()
  // .then(() => console.log('Connection has been established successfully.'))
  // .catch((error) => console.error('Unable to connect to the database:', error));

  DiagramSequelize.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    diagram_type: {
      type: DataTypes.STRING
    },
    created_at:{
      type:DataTypes.TIME,
    },
    updated_at:{
      type:DataTypes.TIME,
    }
    
  }, {
    sequelize,
    modelName:'diagrams',
    tableName: 'diagrams',
    timestamps: false,
  });
    
  // ElementLibrarySequelize.sync();

}