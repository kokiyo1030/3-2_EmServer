const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            email: {
                type: Sequelize.STRING(40),
                allowNull: false,
                unique: true
            },
            nickname: {
                type: Sequelize.STRING(15),
                allowNull: false
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
    }
    static associate(db) {
        
    }
}