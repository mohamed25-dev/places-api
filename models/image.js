/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const Image = sequelize.define('image', {
    imageId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    imageName: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'images',
    timestamps: false
  });

  return Image;
};
