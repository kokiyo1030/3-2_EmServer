const Sequelize = require('sequelize');

module.exports = class Control extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            control: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            CreatedAt: {
                type: Sequelize.DATEONLY,
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Control',
            tableName: 'controls',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
    }
    static associate(db) {
    }
};