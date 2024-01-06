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
        pencurian: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                notNull: {
                    args: true,
                    msg: "pencurian Can't be Null!"
                },
                notEmpty: {
                    args: true,
                    msg: "pencurian Can't be Empty!"
                }
            }
        },
        kejahatan_sosial: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                notNull: {
                    args: true,
                    msg: "kejahatan_sosial Can't be Null!"
                },
                notEmpty: {
                    args: true,
                    msg: "kejahatan_sosial Can't be Empty!"
                }
            }
        },
        pembulian: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                notNull: {
                    args: true,
                    msg: "pembulian Can't be Null!"
                },
                notEmpty: {
                    args: true,
                    msg: "pembulian Can't be Empty!"
                }
            }
        },
        penganiayaan: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                notNull: {
                    args: true,
                    msg: "penganiayaan Can't be Null!"
                },
                notEmpty: {
                    args: true,
                    msg: "KDRT Can't be Empty!"
                }
            }
        },
        penipuan: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                notNull: {
                    args: true,
                    msg: "penipuan Can't be Null!"
                },
                notEmpty: {
                    args: true,
                    msg: "penipuan Can't be Empty!"
                }
            }
        },
        narkoba: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                notNull: {
                    args: true,
                    msg: "narkoba Can't be Null!"
                },
                notEmpty: {
                    args: true,
                    msg: "narkoba Can't be Empty!"
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