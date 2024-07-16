import { DataTypes, Model, Sequelize } from "sequelize";
import AttributesModel from "./attributes.seq";
import ElementLibraryModel from "./element_library.seq";

export default class ConnectionSequelize extends Model{
    public id!: number;
    public source!: number;
    public target!: number;
    public diagram_id?: number;
    public edgeslib_id?: number;
    public label?: string;
}

export const ConnectionInitialize = (sequelize : Sequelize) => {
    console.log('inisiasi sequalise connection model \n');

    ConnectionSequelize.init({
        id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true
        },
        source: {
          type: DataTypes.BIGINT,
          // references: {
          //   model: 'elements_library',
          //   key: 'id',
          // },
        },
        target: {
          type: DataTypes.BIGINT,
          // references: {
          //   model: 'attributes',
          //   key: 'id',
          // },
        },
        label: {
          type: DataTypes.STRING,
          allowNull: false
        },
        diagram_id: {
          type: DataTypes.BIGINT,
          allowNull: false
        },
        edgeslib_id: {
          type: DataTypes.BIGINT,
          allowNull: false
        },
      }, {
        sequelize,
        tableName: 'Connection',
        freezeTableName:true,
        timestamps: false,
      });
      ConnectionSequelize.sync();     
}
