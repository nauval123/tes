import { Model, Sequelize, DataTypes } from 'sequelize';
import ElementlibJuncAttribModel from './elementlib_attribute.model';

export default class ElementLibraryModel extends Model {
  public id?: number;
  public name!: string;
  public icon?: string;
  public default_width!: string;
  public default_height!: string;
}

export const ElementLibraryMap = (sequelize: Sequelize) => {

  // sequelize.authenticate()
  // .then(() => console.log('Connection has been established successfully.'))
  // .catch((error) => console.error('Unable to connect to the database:', error));

  ElementLibraryModel.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    icon: {
      type: DataTypes.STRING
    },
    default_width: {
      type: DataTypes.STRING,
      allowNull: true
    },
    default_height: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'elements_library',
    timestamps: false
  });
  
  ElementLibraryModel.sync();
  ElementLibraryModel.hasMany(ElementlibJuncAttribModel,{foreignKey:"elementlib_id"});
  return ElementLibraryModel;
}