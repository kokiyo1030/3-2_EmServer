const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const User = require('./user');
const Zone = require('./zone');
const Weight = require('./weight');
const Control = require('./control');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config
);

db.sequelize = sequelize;
db.User = User;
db.Zone = Zone;
db.Weight = Weight;
db.Control = Control;

User.init(sequelize);
Zone.init(sequelize);
Weight.init(sequelize);
Control.init(sequelize);

User.associate(db);
Zone.associate(db);
Weight.associate(db);

module.exports = db;