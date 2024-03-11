'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Itens_Lista_Produtos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      listaId: {
        type: Sequelize.INTEGER,
        references:{
          model:'Lista_Produtos',
          key:'id',
          as:'listaId'
        },
        onUpdate:'cascade',
        onDelete:'cascade'
      },
      produtoId: {
        type: Sequelize.INTEGER,
        references:{
          model:'Produto',
          key:'id',
          as:'produtoId'
        },
        onUpdate:'cascade',
        onDelete:'cascade'
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
    await queryInterface.dropTable('Itens_Lista_Produtos');
  }
};