import { Model, Sequelize, DataTypes } from 'sequelize';
import ElementlibJuncAttribModel from './elementlib_attribute.model';

export default class AttributesModel extends Model {
  public id?: number;
  public name!: string;
  public data_type?: string;
  public default_value?: string;
  public description_value?: string;
}

export const AttributesModelMap = (sequelize: Sequelize) => {
  console.log('inisiasi sequalise atribut model');
  
  AttributesModel.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    data_type: {
      type: DataTypes.STRING
    },
    default_value: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description_attribute: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'attributes',
    freezeTableName:true,
    timestamps: false,
    modelName:'AttributesModel'
  });
  
  // return AttributesModel;
}

