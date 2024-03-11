'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lista_Produtos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Lista_Produtos.belongsTo(models.Usuario);
      Lista_Produtos.hasMany(models.Itens_Lista_Produtos);
    }
  }
  Lista_Produtos.init({
    nome: DataTypes.STRING,
    usuarioId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Lista_Produtos',
  });
  return Lista_Produtos;
};