const Sequelize = require('sequelize');

module.exports = class Weight extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            weight: {
                type: Sequelize.FLOAT(10),
                allowNull: false
            },
            temp: {
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
            modelName: 'Weight',
            tableName: 'weights',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
    }
    static associate(db) {
        db.Weight.belongsTo(db.User);
    }
};