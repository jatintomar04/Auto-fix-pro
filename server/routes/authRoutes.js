const express = require ("express")
const { register, login, privateController, adminController } = require("../controllers/authControllers");
const protect = require("../middleware/authMiddleware");
const adminProtect = require("../middleware/adminMiddleware");


const router = express.Router()

router.post("/register", register);
router.post("/login", login);
router.post("/private", protect, privateController)
router.post("/admin", adminProtect, adminController)



module.exports = router