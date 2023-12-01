const Models = require("../models/index.js");
const { accesToken } = require("../helper/chekAccessToken.js");

class LaporanKejahatanController {
  static async createLapor(req, res) {
    try {
      const user = accesToken(req);

      const { name, email, phone, kategori, deskripsi, image, desaKecamataId } =
        req.body;

      const create = await Models.Laporan.create({
        name,
        email,
        phone,
        kategori,
        deskripsi,
        desaKecamataId,
        image: JSON.stringify(image),
        userId: user.id,
      });

      res.status(201).json({
        msg: "success create data",
        data: create,
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

  static async getLaporan(req, res) {
    try {
      const user = accesToken(req);
      const get = await Models.Laporan.findAll({
        where: {
          userId: user.id,
        },
      });
      const data = get.map(data =>{
        return {
          id: data.id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          status: data.status,
          kategori: data.kategori,
          deskripsi: data.deskripsi,
          image: JSON.parse(data.image),
        };
      })
      res.status(200).json({
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  }
  
  static async getDetailLaporan(req, res) {
    try {
      const user = accesToken(req);
      const get = await Models.Laporan.findOne({
        where: {
          userId: user.id,
          id: req.params.id
        },
      });
      const respon = {
        id: get.id,
        name: get.name,
        email: get.email,
        phone: get.phone,
        status: get.status,
        kategori: get.kategori,
        deskripsi: get.deskripsi,
        image: JSON.parse(get.image)
      }
      res.status(200).json({
        data: respon,
      });
    } catch (error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  }

  static async updateLaporan(req, res) {
    try {
      const user = accesToken(req);

      const { name, email, phone, kategori, deskripsi, image, desaKecamataId } =
        req.body;

      const update = await Models.Laporan.update({
        name,
        email,
        phone,
        kategori,
        deskripsi,
        desaKecamataId,
        image: JSON.stringify(image),
    },{
        where: {
            userId: user.id,
            id: req.params.id
        }
      });

      if (update[0] == 0) {
        return res.status(200).json({
          message: "Failed Update Laporan!",
          status: update[0],
        });
      }
      return res.status(200).json({
        message: "Success Update Laporan!",
        status: update[0],
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

  static async deleteLaporan(req,res){
    try {
        const deleteLaporan = await Models.Laporan.destroy({
          where: {
            id: req.params.id,
          },
        });
        res.status(200).json({
          message: "Sucsess delete Data Formulir!",
          status: deleteLaporan,
        });
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
  }
}

module.exports = LaporanKejahatanController;
