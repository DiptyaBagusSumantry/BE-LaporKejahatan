const Sequelize = require("sequelize");

const Statuslaporan = (sequelizeInstance) => {
  return sequelizeInstance.define(
    "status_laporans",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: "id",
      },
      tanggapan: {
        type: Sequelize.TEXT,
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
    },
    {
      freezeTableName: true,
      paranoid: true,
      underscored: true,
    }
  );
};

module.exports = Statuslaporan;
