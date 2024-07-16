import { Model, Sequelize, DataTypes } from 'sequelize';
// import ElementlibJuncAttribModel from './elementlib_attribute.seq';



export default class ElementLibrarySequelize extends Model {
  public id!: number;
  public type!: string;
  public name!: string;
  public icon!: string;
  public default_width!: number;
  public default_height!: number;
  public unique_key! : number;
}



export const ElementLibraryInitialize = (sequelize: Sequelize) => {

  console.log('inisiasi sequalise elementlib model');
  // sequelize.authenticate()
  // .then(() => console.log('Connection has been established successfully.'))
  // .catch((error) => console.error('Unable to connect to the database:', error));

  ElementLibrarySequelize.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING
    },
    icon: {
      type: DataTypes.STRING
    },
    default_width: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    default_height: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    unique_key:{
      type:DataTypes.INTEGER,
      allowNull:false,
      unique:true,
    }
  }, {
    sequelize,
    modelName:'elements_library',
    tableName: 'elements_library',
    timestamps: false,
  });
    
  // ElementLibrarySequelize.sync();

}