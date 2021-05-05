'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('gameMoves', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      gameId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      player: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      position: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      symbol: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('gameMoves');
  }
};