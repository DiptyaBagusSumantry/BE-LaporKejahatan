const Sequelize = require ("sequelize")

const DesaKecamatan = (sequelizeInstance) => {
    return sequelizeInstance.define("desa_kecamatans", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: 'id',
        },
        village_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: {
                args: 'village_id',
                msg: "village_id Already Registered!"
            },
            validate: {
                notNull: {
                    args: true,
                    msg: "village_id Can't be Null!"
                },
                notEmpty: {
                    args: true,
                    msg: "village_id Can't be Empty!"
                }
            }
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "Name Can't be Null!"
                },
                notEmpty: {
                    args: true,
                    msg: "Name Can't be Empty!"
                }
            }
        },
        status: {
            type: Sequelize.ENUM,
            values: ['bahaya','waspada','siaga', 'aman'],
            defaultValue: 'aman'
        },
        districts_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "districts_id Can't be Null!"
                },
                notEmpty: {
                    args: true,
                    msg: "districts_id Can't be Empty!"
                }
            }
        },
        name_kecamatan: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "name_kecamatan Can't be Null!"
                },
                notEmpty: {
                    args: true,
                    msg: "name_kecamatan Can't be Empty!"
                }
            }
        },
        zip_code: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "zip_code Can't be Null!"
                },
                notEmpty: {
                    args: true,
                    msg: "zip_code Can't be Empty!"
                }
            }
        },
        batas_area: {
            type: Sequelize.TEXT('long'),
            default: null
        },
    }, {
        freezeTableName: true,
        paranoid: true,
        underscored: true
    })
}

module.exports = DesaKecamatan