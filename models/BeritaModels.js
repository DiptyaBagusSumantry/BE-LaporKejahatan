const Sequelize = require("sequelize")

const Berita = (sequelizeInstance) => {
    return sequelizeInstance.define("beritas", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: 'id',
        },
        title:{
            type: Sequelize.STRING,
            allowNull: false,
            unique: {
                args: 'title',
                msg: "Title Already Registered!"
            },
            validate: {
                notNull: {
                    args: true,
                    msg: "Title Can't be Null!"
                },
                notEmpty: {
                    args: true,
                    msg: "Title Can't be Empty!"
                }
            }
        },
        slug:{
            type: Sequelize.STRING,
            allowNull: false,
            unique: {
                args: 'slug',
                msg: "Slug Already Registered!"
            },
            validate: {
                notNull: {
                    args: true,
                    msg: "Slug Can't be Null!"
                },
                notEmpty: {
                    args: true,
                    msg: "Slug Can't be Empty!"
                }
            }
        },
        deskripsi:{
            type: Sequelize.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "Deskripsi Can't be Null!"
                },
                notEmpty: {
                    args: true,
                    msg: "Deskripsi Can't be Empty!"
                },
            }
        },
        image: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "Image Can't be Null!"
                },
                notEmpty: {
                    args: true,
                    msg: "Image Can't be Empty!"
                }
            }
        },
    },{
        freezeTableName:true,
        paranoid: true,
        underscored: true,
    })
}

module.exports = Berita