'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('places', { 
      placeId: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      placeName: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      placeDescription: {
        type: Sequelize.STRING(45),
        allowNull: true
      },
      placeLocation: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      placeIcon: {
        type: Sequelize.STRING(255),
        defaultValue: 'default-icon'
      }
    }, {
      tableName: 'places',
      timestamps: false
     });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('places');
  }
};
