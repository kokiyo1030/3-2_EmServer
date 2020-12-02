const Sequelize = require('sequelize');

module.exports = class Zone extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            VRL: {
                type: Sequelize.FLOAT(10),
                allowNull: false
            },
            ppm: {
                type: Sequelize.FLOAT(10),
                allowNull: false
            },
            Mppm: {
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
            modelName: 'Zone',
            tableName: 'zones',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
    }
    static associate(db) {
        db.Zone.belongsTo(db.User);
    }
};