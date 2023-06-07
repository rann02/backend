const { User, Department, Level } = require("../models/index.js");
const { compare } = require("../helpers/hashpassword");
const { createToken } = require("../helpers/jwt");
const { Model } = require("sequelize");

class Controller {
  static async createUser(req, res, next) {
    try {
      const { name, email, password, DepartmentId, LevelId } = req.body;
      await User.create({
        name,
        email,
        password,
        DepartmentId,
        LevelId,
      });
      res.status(201).json({ message: "account has been created" });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    console.log(req.body);
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "EmailorPasswordRequired" };
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "InvalidCredential" };
      }
      const valid = compare(password, user.password);
      if (!valid) {
        throw { name: "InvalidCredential" };
      }
      const payload = {
        id: user.id,
      };
      const access_token = createToken(payload);
      res.status(200).json({
        token: access_token,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getUsers(req, res, next) {
    try {
      const users = await User.findAll({
        attributes: {
          exclude: [
            "id",
            "password",
            "createdAt",
            "updatedAt",
            "LevelId",
            "DepartmentId",
          ],
        },
        include: [
          {
            model: Department,
            attributes: ["name"],
          },
          {
            model: Level,
            attributes: ["name"],
          },
        ],
      });
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await User.findByPk(id);
      if (!deleted) {
        throw {
          name: "NotFound",
          message: "User not found",
        };
      }
      await User.destroy({
        where: {
          id: id,
        },
      });

      res.status(200).json({
        message: `User ${deleted.name} deleted`,
      });
    } catch (error) {
      next(error);
    }
  }
  static async putUser(req, res, next) {
    try {
      const id = req.params.id;
      const { name, email, DepartmentId, LevelId } = req.body;
      await User.update(
        { name, email, DepartmentId, LevelId },
        {
          where: {
            id,
          },
        }
      );
      res.status(200).json({
        message: "User data has been updated!",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
