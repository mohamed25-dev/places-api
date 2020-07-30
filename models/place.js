/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
  const Place = sequelize.define('place', {
    placeId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    placeName: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    placeDescription: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    placeLocation: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    placeIcon: {
      type: DataTypes.STRING(255),
      defaultValue: 'default-icon.png'
    }
  }, {
    tableName: 'places',
    timestamps: false
  });

  Place.associate = function (models) {
    // associations can be defined here
    Place.hasMany(models.image, {
      as: 'images',
      foreignKey: 'placeId'
    });
  }

  return Place;
};
