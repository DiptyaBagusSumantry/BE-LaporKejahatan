const router = require("express").Router();
const verifyToken = require("../middlewares/VerifyToken");
const AuthController = require("../controllers/AuthController.js");
const LaporanKejahatanController = require("../controllers/LaporKejahatan.js");
// const AdminController = require('../controllers/UserController.js');

const { IsAdmin } = require("../middlewares/chekRole.js");

//AUTH
router.post("/login", AuthController.Login);
router.get("/fetch", verifyToken, AuthController.Fetch);
router.get("/logout", AuthController.Logout);
router.post("/register", AuthController.Register);

//Laporan Kejahatan
router.post("/laporan-kejahatan", verifyToken, LaporanKejahatanController.createLapor);
router.get("/laporan-kejahatan", verifyToken, LaporanKejahatanController.getLaporan);
router.get("/laporan-kejahatan/:id", verifyToken, LaporanKejahatanController.getDetailLaporan);
router.put("/laporan-kejahatan/:id", verifyToken, LaporanKejahatanController.updateLaporan);
router.delete("/laporan-kejahatan/:id", verifyToken, LaporanKejahatanController.deleteLaporan);

// router.get('/count-dashboard', verifyToken, IsAdmin, DashboardController.countDashboard )

module.exports = router;
