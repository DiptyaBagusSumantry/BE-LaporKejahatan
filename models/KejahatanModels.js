const Sequelize = require ("sequelize")

const Kejahatan = (sequelizeInstance) => {
    return sequelizeInstance.define("kejahatans", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: 'id',
        },
        kategori: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "Kategori Can't be Null!"
                },
                notEmpty: {
                    args: true,
                    msg: "Kategori Can't be Empty!"
                }
            }
        },
    }, {
        freezeTableName: true,
        paranoid: true,
        underscored: true
    })
}

module.exports = Kejahatan