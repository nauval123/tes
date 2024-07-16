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


export default class ElementModel {
  private id: number;
  public description!: string;
  public title!: string;
  public position_x?: number;
  public position_y?: number;
  public diagram_id!: number;
  public elementlib_id! : number;

  constructor(id: number, description: string, title: string, position_x: number, position_y: number, diagram_id: number,elementlib_id: number ){
    this.id = id;
    this.description= description;
    this.title= title;
    this.position_x= position_x;
    this.position_y= position_y;
    this.diagram_id= diagram_id;
    this.elementlib_id!= elementlib_id;
  }

  toJSON() {
    return {
      id : this.id,
      description: this.description,
      title: this.title,
      position_x: this.position_x,
      position_y: this.position_y,
      diagram_id: this.diagram_id,
      elementlib_id : this.elementlib_id
    };
  }
}

export type getElementResponse = {
  id: number;
  description: string;
  title: string;
  position_x?: number;
  position_y?: number;
  diagram_id: number;
  elementlib_id : number;
}

export type createElementResponse = {
  description: string;
  title: string;
  position_x?: number;
  position_y?: number;
  diagram_id: number;
  elementlib_id : number;
}

export type updateElementResponse = {
  id: number;
  description: string;
  title: string;
  position_x?: number;
  position_y?: number;
  diagram_id: number;
  elementlib_id : number;
}

