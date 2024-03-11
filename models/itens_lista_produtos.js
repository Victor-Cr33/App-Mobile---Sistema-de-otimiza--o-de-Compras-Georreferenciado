'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Itens_Lista_Produtos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Itens_Lista_Produtos.belongsTo(models.Lista_Produtos);
      Itens_Lista_Produtos.belongsTo(models.Produto);
    }
  }
  Itens_Lista_Produtos.init({
    listaId: DataTypes.INTEGER,
    produtoId: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'Itens_Lista_Produtos',
  });
  return Itens_Lista_Produtos;
  
};