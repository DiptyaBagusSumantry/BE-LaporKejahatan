const Models = require("../models/index");

class KejahatanController {
  static async getKejahatan(req, res) {
    try {
      const get = await Models.Kejahatan.findAll();

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

module.exports = KejahatanController;
