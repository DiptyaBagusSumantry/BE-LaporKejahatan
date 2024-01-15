const Models = require("../models/index.js");
const { accesToken } = require("../helper/chekAccessToken.js");
const sharp = require("sharp");

class LaporanKejahatanController {
  static async createLapor(req, res) {
    try {
      const user = accesToken(req);

      const { name, email, phone, kategori, deskripsi, image, desaKecamatanId } = req.body;
      const imagePath = [];
      
      const create = await Models.Laporan.create({
        name,
        email,
        phone,
        kategori,
        deskripsi,
        desaKecamatanId,
        image: 'no image',
        userId: user.id,
        nomer_pengaduan: Date.now(),
      });

      let detailKejahatan = await Models.DetailKejahatan.findOne({
        where: {
          desaKecamatanId: desaKecamatanId,
        },
      });

      if (!detailKejahatan) {
        detailKejahatan = await Models.DetailKejahatan.create({
          desaKecamatanId: desaKecamatanId,
          [kategori]: 1,
        });
      } else {
        detailKejahatan[kategori] = (detailKejahatan[kategori] || 0) + 1;
        await detailKejahatan.save();
      }
 
      if (image !== "") {
        try {
          for (let i = 0; i < image.length; i++) {
            const imageData = image[i];
            const parts = imageData.split(";");
            const base64Data = parts[1].split(",")[1];
            const imgBuffer = Buffer.from(base64Data, "base64");
            const imageName = `${Date.now()}-${i}.jpeg`;

            await sharp(imgBuffer)
              .resize(280, 174)
              .toFormat("jpeg", { mozjpeg: true })
              .jpeg({ quality: 100 })
              .toFile(`./assets/images/laporan/${imageName}`);

            imagePath.push(`/assets/images/laporan/${imageName}`);

            await Models.Laporan.update({
              image: imagePath
            },{
              where: {
                id: create.id
              }
            })
          }
        } catch (error) {
          return res.status(500).json({ msg: error.message });
        }
      }

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
      res.status(200).json({
        data: get,
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
          id: req.params.id,
        },
        include: {
          model: await Models.StatusLaporan,
        },
      });
      get.status_laporans.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
      res.status(200).json({
        data: get,
      });
    } catch (error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  }

  static async getDetailLaporanNoLogin(req, res) {
    try {
      const get = await Models.Laporan.findOne({
        where: {
          name: req.body.name,
          email: req.body.email,
          nomer_pengaduan: req.body.nomer_pengaduan,
        },
      });
      res.status(200).json({
        data: get,
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

      const { name, email, phone, kategori, deskripsi, image, desaKecamataId } = req.body;

      const imagePath = [];

      if (image !== "") {
        try {          
          for (let i = 0; i < image.length; i++) {
            const imageData = image[i];
            const parts = imageData.split(";");
            const base64Data = parts[1].split(",")[1];
            const imgBuffer = Buffer.from(base64Data, "base64");
            const imageName = `${Date.now()}-${i}.jpeg`;

            await sharp(imgBuffer)
              .resize(280, 174)
              .toFormat("jpeg", { mozjpeg: true })
              .jpeg({ quality: 100 })
              .toFile(`./assets/images/laporan/${imageName}`);

            imagePath.push(`/assets/images/laporan/${imageName}`);
          }
        } catch (error) {
          return res.status(500).json({ msg: error.message });
        }
      }

      const update = await Models.Laporan.update(
        {
          name,
          email,
          phone,
          kategori,
          deskripsi,
          desaKecamataId,
          image: imagePath,
        },
        {
          where: {
            userId: user.id,
            id: req.params.id,
          },
        }
      );

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
  static async updateLaporanStatus(req, res) {
    try {
      const updateStatus = await Models.Laporan.findByPk(req.params.id);
      updateStatus.status = req.body.status;
      const update = await updateStatus.save();
      return res.status(200).json({
        message: "Success Update Laporan Status!",
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

  static async deleteLaporan(req, res) {
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
        msg: error.message,
      });
    }
  }
}

module.exports = LaporanKejahatanController;
