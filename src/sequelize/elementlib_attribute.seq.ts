import { DataTypes, Model, Sequelize } from "sequelize";
import AttributesModel from "./attributes.seq";
import ElementLibraryModel from "./element_library.seq";

export default class ElementlibJuncAttribSequelize extends Model{
    public id?: number;
    public elementlib_id!: number;
    public attribute_id?: number;
    public value?: string;
}

export const ElementlibJuncAttribInitialize = (sequelize : Sequelize) => {
    console.log('inisiasi sequalise elementlib_attribute model \n');

    ElementlibJuncAttribSequelize.init({
        id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true
        },
        elementlib_id: {
          type: DataTypes.BIGINT,
          references: {
            model: 'elements_library',
            key: 'id',
          },
        },
        attribute_id: {
          type: DataTypes.BIGINT,
          references: {
            model: 'attributes',
            key: 'id',
          },
        },
        value: {
          type: DataTypes.STRING,
          allowNull: false
        },
      }, {
        sequelize,
        tableName: 'elementlibs_attributes',
        freezeTableName:true,
        timestamps: false,
        modelName:'ElementlibJuncAttribModel'
      });

      // ElementlibJuncAttribSequelize.sync();

      
}
