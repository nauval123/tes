import { DataTypes, Sequelize } from "sequelize";
import { Model } from "sequelize";

export default class ElementSequelize extends Model{
  public id?: number;
  public description!: string;
  public title!: string;
  public position_x?: number;
  public position_y?: number;
  public diagram_id!: number;
  public elementlib_id! : number;
  public width! : number;
  public height! : number;
  elementLibrary_element: any;
} 

export const ElementsInitialize = (sequelize : Sequelize) => {
  ElementSequelize.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING
    },
    position_x: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    position_y: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    height:{
      type: DataTypes.INTEGER,
      allowNull:true,
    },
    width:{
      type: DataTypes.INTEGER,
      allowNull:true,
    },
    diagram_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    elementlib_id: {
      type: DataTypes.BIGINT,
      references:{
        model: 'elements_library',
        key: 'id',
      }
    },
    uuid :{
      type: DataTypes.STRING,
      allowNull: false, 
    }
  }, {
    sequelize,
    tableName: 'elements',
    timestamps: false,
  });
}