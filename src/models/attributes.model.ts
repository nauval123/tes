// import { Model, Sequelize, DataTypes } from 'sequelize';
// import ElementlibJuncAttribModel from './elementlib_attribute.model';

import exp from "constants";

// export default class AttributesModel extends Model {
//   public id?: number;
//   public name!: string;
//   public data_type?: string;
//   public default_value?: string;
//   public description_value?: string;
// }

// export const AttributesModelMap = (sequelize: Sequelize) => {
//   console.log('inisiasi sequalise atribut model');
  
//   AttributesModel.init({
//     id: {
//       type: DataTypes.BIGINT,
//       autoIncrement: true,
//       primaryKey: true
//     },
//     name: {
//       type: DataTypes.STRING
//     },
//     data_type: {
//       type: DataTypes.STRING
//     },
//     default_value: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     description_attribute: {
//       type: DataTypes.STRING,
//       allowNull: true
//     }
//   }, {
//     sequelize,
//     tableName: 'attributes',
//     freezeTableName:true,
//     timestamps: false,
//     modelName:'AttributesModel'
//   });
  
//   // return AttributesModel;
// }

export default class AttributesModel {
  private id?: number;
  private name!: string;
  private data_type?: string;
  private default_value?: string;
  private description_value?: string;

  constructor(id: number, name: string, data_type: string, default_value: string, description_value: string){
    this.id = id;
    this.name = name;
    this.data_type = data_type;
    this.default_value = default_value;
    this.description_value = description_value;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      data_type: this.data_type,
      default_value: this.default_value,
      description_value: this.description_value,
    };
  }
}

export type getAttributes = {
  id: number;
  name: string;
  data_type: string;
  default_value: string;
  description_value?: string;
}