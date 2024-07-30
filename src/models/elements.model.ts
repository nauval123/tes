// import { DataTypes, Sequelize } from "sequelize";
// import { Model } from "sequelize";

// export default class Elements extends Model{
//   public id?: number;
//   public description!: string;
//   public title!: string;
//   public position_x?: number;
//   public position_y?: number;
//   public diagram_id!: number;
//   public elementlib_id! : number;
// } 

// export const ElementMap = (sequelize : Sequelize) => {
//   Elements.init({
//     id: {
//       type: DataTypes.BIGINT,
//       autoIncrement: true,
//       primaryKey: true
//     },
//     description: {
//       type: DataTypes.STRING
//     },
//     title: {
//       type: DataTypes.STRING
//     },
//     position_x: {
//       type: DataTypes.INTEGER,
//       allowNull: true
//     },
//     position_y: {
//       type: DataTypes.INTEGER,
//       allowNull: true
//     },
//     diagram_id: {
//       type: DataTypes.STRING,
//       allowNull: true
//     },
//     elementlib_id: {
//       type: DataTypes.BIGINT,
//       allowNull: true,
//       references:{
//         model: 'elements_library',
//         key: 'id',
//       }
//     }
//   }, {
//     sequelize,
//     tableName: 'elements',
//     timestamps: false,
//   });
// }


// export type getElementResponse = {
//   id: number;
//   description: string;
//   title: string;
//   position_x?: number;
//   position_y?: number;
//   diagram_id: number;
//   elementlib_id : number;
// }

export type getElementResponses ={
  id : number,
  type: string,
  data:{
    title: string,
    description: string,
    icon: string,
    key: number,
  },
  position:{
    x: number,
    y: number,
  },
  height:number,
  width: number,      
  elementlib_id : number,
  uuid:string,
}

export type createElementResponse = {
  type: string,
  data:{
    title: string,
    description: string,
    icon: string,
    key: number,
  },
  position:{
    x: number,
    y: number,
  },
  height:number,
  width: number,      
  elementlib_id : number
  uuid:string,
}

export type bulkCreateElementResponse ={
  id?: number,
  description: string,
  title: string,
  position_x?: number,
  position_y?: number,
  diagram_id: number,
  elementlib_id : number,
  width : number,
  height : number,
  uuid :string,
  elementLibrary_element?:any,
}

export type updateElementResponse = {
  description: string;
  title: string;
  position_x?: number;
  position_y?: number;
  diagram_id: number;
  elementlib_id : number;
}



