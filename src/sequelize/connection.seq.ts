import { DataTypes, Model, Sequelize,Association } from "sequelize";
import DiagramSequelize from "./diagrams.seq";
import ElementDiagramSequelize from "./element_diagram.seq";

export default class ConnectionSequelize extends Model{
    public id!: number;
    public source!: number;
    public target!: number;
    public diagram_id?: number;
    public edgeslib_id?: number;
    public label?: string;

    public readonly diagram_connection? : DiagramSequelize;
    public readonly element_source? : ElementDiagramSequelize;
    public readonly element_target? : ElementDiagramSequelize;

    public static associations: {
      diagram_connection: Association<ConnectionSequelize,DiagramSequelize>;
      element_source: Association<ConnectionSequelize,DiagramSequelize>;      
      element_target: Association<ConnectionSequelize,DiagramSequelize>;
    };

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
          references: {
            model: 'element_diagram',
            key: 'id',
          },
        },
        target: {
          type: DataTypes.BIGINT,
          references: {
            model: 'element_diagram',
            key: 'id',
          },
        },
        label: {
          type: DataTypes.STRING,
          allowNull: false
        },
        diagram_id: {
          type: DataTypes.BIGINT,
          allowNull: false
        },
        // edgeslib_id: {
        //   type: DataTypes.BIGINT,
        //   allowNull: false
        // },
      }, {
        sequelize,
        tableName: 'Connection',
        freezeTableName:true,
        timestamps: false,
      });
      // ConnectionSequelize.sync();     
}
