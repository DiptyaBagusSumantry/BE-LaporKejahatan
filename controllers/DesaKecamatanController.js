const Models = require("../models/index");

class DesaKecamatanController {
  static async ListKecamatanDesa(req, res) {
    try {
      const disctitsId = req.query.districts_id || null;
      const whereClause = {};
      if (disctitsId) {
        (whereClause.where = { districts_id: disctitsId }),
          (whereClause.order = [["name", "ASC"]]),
          (whereClause.attributes = ["id", "name", "village_id"]),
          (whereClause.group = ["name"]);
      } else {
        (whereClause.order = [["name_kecamatan", "ASC"]]),
          (whereClause.attributes = ["name_kecamatan", "districts_id"]),
          (whereClause.group = ["name_kecamatan"]);
      }

      const get = await Models.DesaKecamatan.findAll(whereClause);

      res.status(200).json({
        data: get,
      });
    } catch (error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  }
  static async BatasAreaMap(req, res) {
    try {
      const get = await Models.DesaKecamatan.findAll({
        order: [["name", "ASC"]],
      });
      const result = get.map((data) => {
        return {
          id: data.id,
          name: data.name,
          status: data.status,
          name_kecamatan: data.name_kecamatan,
          batas_area: JSON.parse(data.batas_area)[0],
        };
      });
      res.status(200).json({
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  }
}

module.exports = DesaKecamatanController;
