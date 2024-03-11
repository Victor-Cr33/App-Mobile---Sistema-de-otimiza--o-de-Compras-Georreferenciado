'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mercado extends Model {
   
    static associate(models) {
      Mercado.belongsTo(models.Endereco);
      Mercado.hasMany(models.Mercado_Produto);
    }
  }
  Mercado.init({
    nome: DataTypes.STRING,
    cnpj: DataTypes.STRING,
    nomeProprietario: DataTypes.STRING,
    enderecoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Mercado',
  });
  return Mercado;
};

