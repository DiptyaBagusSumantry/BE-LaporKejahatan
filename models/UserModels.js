const Sequelize = require("sequelize")
const bcrypt = require("bcrypt")

function hashPassword(password){
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

const User = (sequelizeInstance) => {
    return sequelizeInstance.define(
      "users",
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
          unique: "id",
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: {
            args: "username",
            msg: "Username Already Registered!",
          },
          validate: {
            notNull: {
              args: true,
              msg: "Username Can't be Null!",
            },
            notEmpty: {
              args: true,
              msg: "Username Can't be Empty!",
            },
          },
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: {
            args: "Name",
            msg: "Name Already Registered!",
          },
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
        password: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notNull: {
              args: true,
              msg: "Password Can't be Null!",
            },
            notEmpty: {
              args: true,
              msg: "Password Can't be Empty!",
            },
            validatePassword: function (password) {
              if (
                !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                  password
                )
              ) {
                throw new Error(
                  "The password must contain at least 8 characters including at least 1 uppercase, 1 lowercase, one number and one special character."
                );
              }
            },
          },
        },
        image: {
          type: Sequelize.STRING,
        },
        role: {
          type: Sequelize.ENUM,
          allowNull: false,
          values: ["admin", "pelapor"],
          validate: {
            notEmpty: {
              args: true,
              msg: "role can't be empty",
            },
            notNull: {
              args: true,
              msg: "role can't be null",
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: {
            args: "email",
            msg: "Email Already Registered!",
          },
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
      },
      {
        freezeTableName: true,
        paranoid: true,
        underscored: true,
        //don't show password
        defaultScope: {
          attributes: {
            exclude: ["password"],
          },
        },
        //do show password with visible password
        scopes: {
          visiblePassword: {
            attributes: {
              include: ["password"],
            },
          },
        },
        hooks: {
          beforeCreate: (admin, opt) => {
            const hashedPassword = hashPassword(admin.password);
            admin.password = hashedPassword;
          },
        },
      }
    );
}

module.exports = User