const Models = require("../models/index");

class StatuslaporanController {
  static async createStatuslaporan(req, res) {
    try {
      const { tanggapan, status, laporanId } = req.body;
      const create = await Models.StatusLaporan.create({
        tanggapan,
        status,
        laporanId,
      });

      res.status(201).json({
        data: create,
      });
    } catch (error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  }
  static async updateStatuslaporan(req, res) {
    try {
      const { tanggapan, status} = req.body;
      const updateStatus = await Models.StatusLaporan.update({
        tanggapan,
        status
      }, {
        where: {
          id: req.params.id
        }
      });

      res.status(200).json({
        data: updateStatus,
      });
    } catch (error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  }
}

module.exports = StatuslaporanController;
