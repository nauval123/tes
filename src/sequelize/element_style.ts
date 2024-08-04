import { Model, Sequelize, DataTypes } from 'sequelize';
// import ElementlibJuncAttribModel from './elementlib_attribute.seq';



export default class ElementStyleSequelize extends Model {
  public id!: number;
  public x!: number;
  public y!: number;
  public width!: number;
  public height!: number;
}



export const ElementStyleInitialize = (sequelize: Sequelize) => {

  console.log('inisiasi sequalise elementlib model');
  // sequelize.authenticate()
  // .then(() => console.log('Connection has been established successfully.'))
  // .catch((error) => console.error('Unable to connect to the database:', error));

  ElementStyleSequelize.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    x: {
      type: DataTypes.BIGINT,
      allowNull:true,
    },
    y: {
      type: DataTypes.BIGINT,
      allowNull:true,
      },
    width:{
      type: DataTypes.BIGINT,
      allowNull:true,
    },
    height:{
      type: DataTypes.BIGINT,
      allowNull:true
    },
   
  }, {
    sequelize,
    modelName:'element_style',
    tableName: 'element_style',
    timestamps: false,
  });
    
  // ElementPositionSequelize.sync();

}