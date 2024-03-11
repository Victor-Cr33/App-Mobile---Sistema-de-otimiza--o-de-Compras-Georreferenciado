'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mercado_Produto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     Mercado_Produto.belongsTo(models.Mercado)
     Mercado_Produto.belongsTo(models.Produto)
    }
  }
  Mercado_Produto.init({
    mercadoId: DataTypes.INTEGER,
    produtoId: DataTypes.INTEGER,
    valor: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Mercado_Produto',
  });
  return Mercado_Produto;
};