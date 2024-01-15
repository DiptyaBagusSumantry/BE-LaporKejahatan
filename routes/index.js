const router = require("express").Router();
const verifyToken = require("../middlewares/VerifyToken");
const AuthController = require("../controllers/AuthController.js");
const LaporanKejahatanController = require("../controllers/LaporKejahatan.js");
const BeritaController = require("../controllers/BeritaController.js");
const DesaKecamatanController = require("../controllers/DesaKecamatanController.js");
// const AdminController = require('../controllers/UserController.js');

const { IsAdmin } = require("../middlewares/chekRole.js");
const KejahatanController = require("../controllers/KejahatanController.js");
const StatuslaporanController = require("../controllers/StatusLaporanController.js");
const DashboardController = require("../controllers/DashboardController.js");
const DetailKejahatanController = require("../controllers/DetailKejahatanController.js");

//AUTH
router.post("/login", AuthController.Login);
router.get("/fetch", verifyToken, AuthController.Fetch);
router.get("/logout", AuthController.Logout);
router.post("/register", AuthController.Register);

//Laporan Kejahatan
router.post("/laporan-kejahatan", verifyToken,LaporanKejahatanController.createLapor);
router.get("/laporan-kejahatan", verifyToken,LaporanKejahatanController.getLaporan);
router.get("/laporan-kejahatan/:id", verifyToken,LaporanKejahatanController.getDetailLaporan);
router.put("/laporan-kejahatan/:id", verifyToken,LaporanKejahatanController.updateLaporan);
router.patch("/laporan-kejahatan/:id", verifyToken,LaporanKejahatanController.updateLaporanStatus);
router.delete("/laporan-kejahatan/:id", verifyToken,LaporanKejahatanController.deleteLaporan);

//Berita
router.post("/berita", verifyToken, IsAdmin, BeritaController.createBertia);
router.get("/berita",  BeritaController.getBerita);
router.get("/berita/:id",  BeritaController.getDetailBerita);
router.put("/berita/:id", verifyToken, IsAdmin, BeritaController.updateBerita);
router.delete("/berita/:id", verifyToken, IsAdmin, BeritaController.deleteBerita);

//List Desa Kecamatan
router.get("/list-kecamatan-desa", verifyToken, DesaKecamatanController.ListKecamatanDesa);
router.get("/batas-area", verifyToken, IsAdmin, DesaKecamatanController.BatasAreaMap);

router.get("/detail-kejahatan/:desaKecamatanId", verifyToken, DetailKejahatanController.getDetailKejahatan);

//Get Kejahatan
router.get("/kejahatan", verifyToken, KejahatanController.getKejahatan);

//Create-Status-Laporan
router.post("/progress-laporan", verifyToken,IsAdmin,StatuslaporanController.createStatuslaporan);
router.put("/progress-laporan/:id", verifyToken,IsAdmin,StatuslaporanController.updateStatuslaporan);

//Cek Laporan No Login
router.post("/check-laporan", LaporanKejahatanController.getDetailLaporanNoLogin);

//Header Dashboard
router.get("/header", verifyToken, IsAdmin, DashboardController.headerDashbaord);
router.get("/grafik-daftar-kejahatan", verifyToken, IsAdmin, DashboardController.daftarKejahatan);

module.exports = router;
