"use strict";
const { Model } = require("sequelize");
const { hash } = require("../helpers/hashpassword");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Department, { foreignKey: "DepartmentId" });
      User.belongsTo(models.Level);
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "name required",
          },
          notNull: {
            msg: "name required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "email must be unique",
        },
        validate: {
          notEmpty: {
            msg: "email required",
          },
          notNull: {
            msg: "email required",
          },
          isEmail: {
            msg: "input have to be email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "password required",
          },
          notNull: {
            msg: "password required",
          },
          len: {
            args: [5, 12],
            msg: "min 5 characters",
          },
        },
      },
      DepartmentId: DataTypes.INTEGER,
      LevelId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user, options) => {
    user.password = hash(user.password);
  });
  return User;
};
