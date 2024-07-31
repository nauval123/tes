import { Association, DataTypes, Sequelize } from "sequelize";
import { Model } from "sequelize";
import ElementLibrarySequelize from "./element_library.seq";
import DiagramSequelize from "./diagrams.seq";
import ElementDiagramSequelize from "./element_diagram.seq";

export default class ElementSequelize extends Model{
  public id?: number;
  public description!: string;
  public title!: string;
  public position_x?: number;
  public position_y?: number;
  // public diagram_id!: number;
  public icon!: string;
  public elementlib_id! : number;
  public width! : number;
  public height! : number;
  public uuid! :string;

  public readonly elemen_elementLibrary?: ElementLibrarySequelize;
  // public readonly diagram_element?: DiagramSequelize;
  public readonly element_elementDiagram?: ElementDiagramSequelize;

  public static associations: {
    elemen_elementLibrary: Association<ElementSequelize, ElementLibrarySequelize>;
    // diagram_element: Association<ElementSequelize,DiagramSequelize>;
  };
} 

export const ElementsInitialize = (sequelize : Sequelize) => {
  console.log('inisiasi sequalise element model');
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
    icon:{
      type:DataTypes.STRING,
      allowNull:false
    },
    height:{
      type: DataTypes.INTEGER,
      allowNull:true,
    },
    width:{
      type: DataTypes.INTEGER,
      allowNull:true,
    },
    // diagram_id: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    //   references:{
    //     model:'diagrams',
    //     key:'id'
    //   }
    // },
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