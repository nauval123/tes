// import { Model, Sequelize, DataTypes } from 'sequelize';
// import ElementlibJuncAttribModel from './elementlib_attribute.model';

import { title } from "process";
import { getAttributes } from "./attributes.model";
import { dataElement, positionElement } from "./general.model";



// export default class ElementLibraryModel extends Model {
//   public id!: number;
//   public name!: string;
//   public icon!: string;
//   public default_width!: string;
//   public default_height!: string;
// }



// export const ElementLibraryMap = (sequelize: Sequelize) => {

//   console.log('inisiasi sequalise elementlib model');
//   // sequelize.authenticate()
//   // .then(() => console.log('Connection has been established successfully.'))
//   // .catch((error) => console.error('Unable to connect to the database:', error));

//   ElementLibraryModel.init({
//     id: {
//       type: DataTypes.BIGINT,
//       autoIncrement: true,
//       primaryKey: true
//     },
//     name: {
//       type: DataTypes.STRING
//     },
//     icon: {
//       type: DataTypes.STRING
//     },
//     default_width: {
//       type: DataTypes.STRING,
//       allowNull: true
//     },
//     default_height: {
//       type: DataTypes.STRING,
//       allowNull: true
//     }
//   }, {
//     sequelize,
//     tableName: 'elements_library',
//     timestamps: false,
//   });
    
//   ElementLibraryModel.sync();

// }


export default class ElementLibraryModel {
  private id?: number;
  private name!: string;
  private type!: string;
  private icon?: string;
  private default_width?: number;
  private default_height?: number;
  private unique_key : number;

  constructor(id: number, name: string,type: string, icon: string, default_width: number, default_height: number,unique_key:number){
    this.id = id;
    this.name = name;
    this.type = type;
    this.icon = icon;
    this.default_width = default_width;
    this.default_height = default_height;
    this.unique_key = unique_key;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      data :{
        key:this.unique_key,
        title: this.name,
        type_icon: this.name,
        description: "ini node tes",
        icon : this.icon,
      },
        // data_type: this.icon,
        // default_value: this.default_width,
        // description_value: this.default_heigth,
        // unique_key: this.unique_key,
    };
  }
}

export type getElementLibDTO = {
  id: number;
  name: string;
  type: string;
  icon: string;
  default_width?: number;
  default_height?: number;
  // position:{x:number,y:number},
  data: { 
    key: string;
    title:string;
    type_icon: string;
    description: string;
    icon: string;
  },
} 


export type createElementLibResponse = {
  name: string;
  type: string;
  icon: string;
  default_width?: number;
  default_height?: number;
  unique_key: number;
  description_default?:string;
}

