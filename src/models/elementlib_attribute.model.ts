import { DataTypes, Model, Sequelize } from "sequelize";
import AttributesModel from "./attributes.model";
import ElementLibraryModel from "./element_library.model";

export default class ElementlibJuncAttribModel extends Model{
    public id?: number;
    public elementlib_id!: number;
    public attribute_id?: number;
    public value?: string;
}

export const ElementlibJuncAttribMap = (sequelize : Sequelize) => {
    ElementlibJuncAttribModel.init({
        id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true
        },
        elementlib_id: {
          type: DataTypes.BIGINT
        },
        attribute_id: {
          type: DataTypes.BIGINT
        },
        value: {
          type: DataTypes.STRING,
          allowNull: false
        },
      }, {
        sequelize,
        tableName: 'attributes',
        timestamps: false
      });
      
      ElementlibJuncAttribModel.sync();
      
    ElementlibJuncAttribModel.belongsTo(AttributesModel,{foreignKey:"attribute_id"});
    ElementlibJuncAttribModel.belongsTo(ElementLibraryModel,{foreignKey:"elementlib_id"});
    return ElementlibJuncAttribModel;
}
