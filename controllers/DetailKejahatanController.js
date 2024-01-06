const Models = require("../models/index");

class DetailKejahatanController {
  static async getDetailKejahatan(req, res) {
    try {
      const get = await Models.DetailKejahatan.findOne({
        where: {
            desaKecamatanId : req.params.desaKecamatanId
        }
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
}

module.exports = DetailKejahatanController;
