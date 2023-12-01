const Sequelize = require ("sequelize")

const Kategori = (sequelizeInstance) => {
    return sequelizeInstance.define("kategoris", {
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

module.exports = Kategori