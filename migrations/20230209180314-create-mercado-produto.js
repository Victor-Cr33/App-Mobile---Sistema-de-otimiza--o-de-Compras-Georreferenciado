'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Mercado_Produtos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mercadoId: {
        type: Sequelize.INTEGER,
        references:{
          model:'Mercados',
          key:'id',
          as:'mercadoId'
        },
        onUpdate:'cascade',
        onDelete:'cascade'
      },
      produtoId: {
        type: Sequelize.INTEGER,
        references:{
          model:'Produtos',
          key:'id',
          as:'produtoId'
        },
        onUpdate:'cascade',
        onDelete:'cascade'
      },
      valor: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Mercado_Produtos');
  }
};