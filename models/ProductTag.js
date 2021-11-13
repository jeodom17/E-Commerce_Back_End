const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        key: 'id',
        model: 'product',
      },
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        key: 'id',
        model: 'tag',
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

//*  -- Exports --
module.exports = ProductTag;
