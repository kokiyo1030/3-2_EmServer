const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const User = require('./user');
const Zone = require('./zone');
const Zone2 = require('./zone2');
const Weight = require('./weight');
const Control = require('./control');
const Temp = require('./temp');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config
);

db.sequelize = sequelize;
db.User = User;
db.Zone = Zone;
db.Weight = Weight;
db.Control = Control;
db.Temp = Temp;
db.Zone2 = Zone2

User.init(sequelize);
Zone.init(sequelize);
Zone2.init(sequelize);
Weight.init(sequelize);
Control.init(sequelize);
Temp.init(sequelize);

User.associate(db);
Zone.associate(db);
Temp.associate(db);

module.exports = db;