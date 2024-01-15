const Models = require("../models/index.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = Models.User;

class AuthController {
  static async Login(req, res) {
    try {
      //scope show password setting in models
      const user = await User.scope("visiblePassword").findOne({
        where: { username: req.body.username },
      });
      if (!user)
        return res.status(400).json({ msg: "username tidak ditemukan" });

      //check password
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) return res.status(400).json({ msg: "password anda salah" });

      //acces token expreid in 8 jam
      const accessToken = jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "60m", //detik expreid 5 menit
          // expiresIn: "480m", //detik expreid 5 menit
        }
      );

      // res.cookie("refreshToken", accessToken, {
      //   httpOnly: true,
      //   maxAge: 60 * 60 * 8000, //milidetik
      //   sameSite: "lax",
      // });

      res.status(200).json({
        accessToken: accessToken,
        role: user.role.name,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  static async Fetch(req, res) {
    try {
      const user = jwt.verify(
        req.cookies.refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (error, decoded) => {
          if (error) return res.sendStatus(403);
          return decoded;
        }
      );
      const fetch = await User.findOne({
        where: { id: user.id },
        attributes: ["username"],
      }).then((data) => {
        return {
          username: data.username,
          role: user.role,
        };
      });
      return res.status(200).json(fetch);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  static async Logout(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken;
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (error, decoded) => {
          if (error) return res.sendStatus(403);
          res.clearCookie("refreshToken");
          return res.status(200).json({ msg: "Berhasil Logout" });
        }
      );
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  static async Register(req, res) {
    try {
      const { email, username, password, name } = req.body;
      await Models.User.create({
        name,
        email,
        username,
        password,
        role: "pelapor",
      });

      res.status(201).json({
        msg: "Success create user"
      });
    } catch (error) {
      if (error.errors) {
        const data = error.errors;

        const ErrorMsg = [];

        data.map((result) => {
          const chekPath = ErrorMsg.find((error) => error.path === result.path);
          if (chekPath) {
            chekPath.message.push(result.message);
          } else {
            ErrorMsg.push({
              path: result.path,
              message: [result.message],
            });
          }
        });

        res.status(500).json({
          message: ErrorMsg,
        });
      } else {
        res.status(500).json({
          message: error.message,
        });
      }
    }
  }
}

module.exports = AuthController;
