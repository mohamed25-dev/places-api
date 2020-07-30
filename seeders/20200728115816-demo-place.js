'use strict';

const place = require("../models/place");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('places', [{
      placeName: 'home',
      placeDescription: 'This is a great place to visit',
      placeLocation: '16.7123719,33.4712135',
      placeIcon: 'default-icon'
    }]);

    let placeId = await queryInterface.sequelize.query(
      'SELECT placeId FROM places'
    );

    placeId = placeId[0][0].placeId;

    await queryInterface.bulkInsert('images', [
      { imageName:'home-1' , placeId: placeId },
      { imageName:'home-2', placeId: placeId },
      { imageName:'home-3' , placeId: placeId }
    ]);

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('images', null, {});
    await queryInterface.bulkDelete('places', null, {});
  }
};
