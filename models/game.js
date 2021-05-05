'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ gameMoves }) {
      // define association here
      this.hasMany(gameMoves, { foreignKey: 'gameId' })
    }
  };
  game.init({
    id: {
      allowNull: false,
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    player1: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    player2: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM('STARTED', 'FINISHED'),
      defaultValue: 'STARTED'
    },
    winner: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'game',
  });
  return game;
};