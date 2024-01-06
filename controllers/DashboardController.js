const Models = require("../models/index");
const { Sequelize } = require("sequelize");

class DashboardController {
  static async headerDashbaord(req, res) {
    try {
      const totalMasuk = await Models.Laporan.count();
      const belumDitanggapi = await Models.Laporan.count({
        where: {
            status: false
        }
      });
      const sudahDiTanggapi = await Models.Laporan.count({
        where: {
          status: true,
        },
      });

      res.status(200).json({
        totalMasuk, belumDitanggapi, sudahDiTanggapi
      });
    } catch (error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  }
  static async daftarKejahatan(req, res) {
    try {
      const count = await Models.Laporan.findAll({
        attributes: [
          "kategori",
          [Sequelize.fn("COUNT", Sequelize.literal("*")), "count"],
        ],
        group: ["kategori"],
        raw: true,
      });

      const kategoriList = [
        "pencurian",
        "kejahatan_sosial",
        "pembuliyan",
        "penganiayaan",
        "penipuan",
        "narkoba",
      ];

      const countResult = {};
      kategoriList.forEach((kategori) => {
        countResult[kategori] = 0;
      });

      count.forEach((result) => {
        countResult[result.kategori] = result.count;
      });

      res.status(200).json({
        data: countResult
      });
    } catch (error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  }
}

module.exports = DashboardController;
