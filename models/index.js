const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const User = require('./user');
const UserToZone = require('./usertozone');
const Zone = require('./zone');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config
);

db.sequelize = sequelize;
db.User = User;
db.Zone = Zone;
db.UserToZone = UserToZone;

User.init(sequelize);
Zone.init(sequelize);
UserToZone.init(sequelize);

User.associate(db);
Zone.associate(db);
UserToZone.associate(db);

module.exports = db;