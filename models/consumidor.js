'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Consumidor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Consumidor.belongsTo(models.Usuario);
      //Consumidor.hasMany(models.Lista_Produtos);
    }
  }
  Consumidor.init({
    raio: DataTypes.FLOAT,
    usuarioId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Consumidor',
  });
  return Consumidor;
};