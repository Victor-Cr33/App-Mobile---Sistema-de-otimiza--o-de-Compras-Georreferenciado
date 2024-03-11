'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Endereco extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Endereco.belongsTo(models.Usuario);
      Endereco.belongsTo(models.Cidade);
      Endereco.hasOne(models.Mercado);
    }
  }
  Endereco.init({
    nome: DataTypes.STRING,
    rua: DataTypes.STRING,
    numero: DataTypes.INTEGER,
    bairro: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    complemento: DataTypes.STRING,
    usuarioId: DataTypes.INTEGER,
    cidadeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Endereco',
  });
  return Endereco;
};