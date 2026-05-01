const express = require("express")
const { getCar, addCar, updateCar, getCars } = require("../controllers/carController")
const protect = require("../middleware/authMiddleware")


const router = express.Router()


router.get("/",protect, getCars);
router.post("/",protect, addCar);
router.get("/:id",protect, getCar);
router.put("/:id",protect, updateCar);


router.use("/:id/comment", require("./CommentRoutes"))
module.exports = router;

