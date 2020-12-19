const Sequelize = require('sequelize');

module.exports = class Zone extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      ppm: {
        type: Sequelize.FLOAT(10),
        allowNull: false
      },
      CreatedAt: {
        type: Sequelize.DATEONLY,
        allowNull: false
      }
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Zone2',
      tableName: 'zones',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci'
    });
  }
  static associate(db) {}
};