const Models = require("../models/index.js");
const slug = require("slug");
const sharp = require("sharp");

class BeritaController {
  static async createBertia(req, res) {
    try {
      const { title, deskripsi, image } = req.body;
      const titleSlug = slug(title);
      // console.log(titleSlug);

      const create = await Models.Berita.create({
        title,
        slug: titleSlug,
        deskripsi,
      });
      if (image !== "") {
        try {
          let parts = image.split(";");
          let imageData = parts[1].split(",")[1];

          const img = new Buffer.from(imageData, "base64");
          const imageName = `${title}-${Date.now()}.jpeg`;

          await sharp(img)
            .resize(280, 174)
            .toFormat("jpeg", { mozjpeg: true })
            .jpeg({ quality: 100 })
            .toFile(`./assets/images/artikel/${imageName}`);

          await Models.Berita.update(
            {
              image: `/assets/images/artikel/${imageName}`,
            },
            {
              where: {
                id: create.id,
              },
            }
          );
        } catch (error) {
          return res.status(500).json({ msg: error.message });
        }
      }

      const dataBerita = await Models.Berita.findOne({
        where: { id: create.id },
      });

      res.status(201).json({ data: dataBerita });
    } catch (error) {
      if (error.errors) {
        res.status(500).json({
          message: error.errors[0].message,
        });
      } else {
        res.status(500).json({
          message: error.message,
        });
      }
    }
  }

  static async getBerita(req, res) {
    try {
      const artikel = await Models.Berita.findAll();
      res.status(200).json({
        data: artikel,
      });
    } catch (error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  }

  static async getDetailBerita(req, res) {
    try {
      const artikel = await Models.Berita.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({
        data: artikel,
      });
    } catch (error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  }

  static async updateBerita(req, res) {
    try {
      const { title, deskripsi, image } = req.body;
      const titleSlug = slug(title);

      const updateBerita = await Models.Berita.update(
        {
          title,
          slug: titleSlug,
          deskripsi,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      if (image !== "") {
        try {
          let parts = image.split(";");
          let imageData = parts[1].split(",")[1];

          const img = new Buffer.from(imageData, "base64");
          const imageName = `${title}-${Date.now()}.jpeg`;

          await sharp(img)
            .resize(280, 174)
            .toFormat("jpeg", { mozjpeg: true })
            .jpeg({ quality: 100 })
            .toFile(`./assets/images/artikel/${imageName}`);

          await Models.Berita.update(
            {
              image: `/assets/images/artikel/${imageName}`,
            },
            {
              where: {
                id: create.id,
              },
            }
          );
        } catch (error) {
          return res.status(500).json({ msg: error.message });
        }
      }

      return res.status(200).json({
        msg: "Success Update Data",
        status: updateBerita,
      });
    } catch (error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  }

  static async deleteBerita(req, res) {
    try {
      const deleted = await Models.Berita.destroy({
        where: { id: req.params.id },
      });

      res.status(200).json({ status: deleted });
    } catch (error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  }
}

module.exports = BeritaController;
