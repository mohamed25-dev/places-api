'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'images',
      'placeId', {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'places', // name of Target model
          key: 'placeId', // key in Target model that we're referencing,
          onDelete: 'CASCADE'
        }
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'images',
      'placeId'
    )
  }
};
