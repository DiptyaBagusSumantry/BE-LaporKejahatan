const Sequelize = require ("sequelize")

const DetailKejahatan = (sequelizeInstance) => {
    return sequelizeInstance.define("detail_kejahatans", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: 'id',
        },
        maling: {
            type: Sequelize.INTEGER,
            allowNull: false,
            default: 0,
            validate: {
                notNull: {
                    args: true,
                    msg: "Maling Can't be Null!"
                },
                notEmpty: {
                    args: true,
                    msg: "Maling Can't be Empty!"
                }
            }
        },
        copet: {
            type: Sequelize.INTEGER,
            allowNull: false,
            default: 0,
            validate: {
                notNull: {
                    args: true,
                    msg: "Copet Can't be Null!"
                },
                notEmpty: {
                    args: true,
                    msg: "Copet Can't be Empty!"
                }
            }
        },
        perampok: {
            type: Sequelize.INTEGER,
            allowNull: false,
            default: 0,
            validate: {
                notNull: {
                    args: true,
                    msg: "Perampok Can't be Null!"
                },
                notEmpty: {
                    args: true,
                    msg: "Perampok Can't be Empty!"
                }
            }
        },
        kdrt: {
            type: Sequelize.INTEGER,
            allowNull: false,
            default: 0,
            validate: {
                notNull: {
                    args: true,
                    msg: "KDRT Can't be Null!"
                },
                notEmpty: {
                    args: true,
                    msg: "KDRT Can't be Empty!"
                }
            }
        },
        pembunuhan: {
            type: Sequelize.INTEGER,
            allowNull: false,
            default: 0,
            validate: {
                notNull: {
                    args: true,
                    msg: "Pembunuhan Can't be Null!"
                },
                notEmpty: {
                    args: true,
                    msg: "Pembunuhan Can't be Empty!"
                }
            }
        },
        membuatOnar: {
            type: Sequelize.INTEGER,
            allowNull: false,
            default: 0,
            validate: {
                notNull: {
                    args: true,
                    msg: "Membuat Onar Can't be Null!"
                },
                notEmpty: {
                    args: true,
                    msg: "Membuat Onar Can't be Empty!"
                }
            }
        },
        
    }, {
        freezeTableName: true,
        paranoid: true,
        underscored: true
    })
}

module.exports = DetailKejahatan