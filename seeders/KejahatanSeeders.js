const Models = require("../models/index.js");

class KejahatanSeeders {
  static async createKejahatan(req, res) {
    try {
       await Models.Kejahatan.bulkCreate([
         {
           kategori: "Pencurian",
         },
         {
           kategori: "Kejahatan Sosial",
         },
         {
           kategori: "Pembuliyan",
         },
         {
           kategori: "Penganiayaan",
         },
         {
           kategori: "Penipuan",
         },
         {
           kategori: "Narkoba",
         },
        ]);
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = KejahatanSeeders;
