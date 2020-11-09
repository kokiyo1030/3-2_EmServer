const Sequelize = require('sequelize');

module.exports = class Zone extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            sensor1: {
                type: Sequelize.FLOAT(10),
                allowNull: false
            },
            sensor2: {
                type: Sequelize.FLOAT(10),
                allowNull: false
            },
            sensor3: {
                type: Sequelize.FLOAT(10),
                allowNull: false
            },
            sensor4: {
                type: Sequelize.FLOAT(10),
                allowNull: false
            },
            sensor5: {
                type: Sequelize.FLOAT(10),
                allowNull: false
            },
            sensor6: {
                type: Sequelize.FLOAT(10),
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Zone',
            tableName: 'zones',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
    }
    static associate(db) {
        db.Zone.belongsToMany(db.User, { 
            through: 'UserToZone'
        });
    }
};