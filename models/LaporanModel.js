const Sequelize = require("sequelize")

const Laporan = (sequelizeInstance) => {
    return sequelizeInstance.define(
      "laporans",
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
          unique: "id",
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notNull: {
              args: true,
              msg: "Name Can't be Null!",
            },
            notEmpty: {
              args: true,
              msg: "Name Can't be Empty!",
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              args: true,
              msg: "Email Can't Be Empty!",
            },
            notNull: {
              args: true,
              msg: "Email Can't be Null!",
            },
            isEmail: {
              args: true,
              msg: "Invalid Email Address!",
            },
          },
        },
        phone: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notNull: {
              args: true,
              msg: "Phone Can't be Null",
            },
            notEmpty: {
              args: true,
              msg: "Phone Can't be Empty",
            },
            isNumeric: {
              args: true,
              msg: "Phone Must be Number",
            },
            len: {
              args: [10, 13],
              msg: "Phone Must be 10 - 14 Number!",
            },
          },
        },
        status: {
          type: Sequelize.STRING,
          defaultValue: false,
          allowNull: false,
          validate: {
            notNull: {
              args: true,
              msg: "Status Can't be Null!",
            },
            notEmpty: {
              args: true,
              msg: "Status Can't be Empty!",
            },
          },
        },
        nomer_pengaduan: {
          type: Sequelize.STRING,
          defaultValue: false,
          allowNull: false,
          validate: {
            notNull: {
              args: true,
              msg: "Nomer Pengaduan Can't be Null!",
            },
            notEmpty: {
              args: true,
              msg: "Nomer Pengaduan Can't be Empty!",
            },
          },
        },
        kategori: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notNull: {
              args: true,
              msg: "Kategori Can't be Null!",
            },
            notEmpty: {
              args: true,
              msg: "Kategori Can't be Empty!",
            },
          },
        },
        deskripsi: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notNull: {
              args: true,
              msg: "Deskripsi Can't be Null!",
            },
            notEmpty: {
              args: true,
              msg: "Deskripsi Can't be Empty!",
            },
          },
        },
        image: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notNull: {
              args: true,
              msg: "Image Can't be Null!",
            },
            notEmpty: {
              args: true,
              msg: "Image Can't be Empty!",
            },
          },
          get: function () {
            return JSON.parse(this.getDataValue("image"));
          },
          set: function (val) {
            return this.setDataValue("image", JSON.stringify(val));
          },
        },
      },
      {
        freezeTableName: true,
        paranoid: true,
        underscored: true,
      }
    );
}

module.exports = Laporan