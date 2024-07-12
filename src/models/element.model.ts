import { Sequelize } from "sequelize";
import { Model } from "sequelize";

export default class Element extends Model{
  public id?: number;
  public description!: string;
  public title!: string;
  public position_x?: number;
  public position_y?: number;
  public diagram_id!: number;
  public elementlib_id! : number;
} 

export const ElementMap = (sequelize : Sequelize) => {

}