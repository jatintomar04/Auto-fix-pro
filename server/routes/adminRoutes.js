const express =require('express');
const { getAllUsers, getAllComments, getUserCar } = require('../controllers/adminCountroller');
const adminProtect = require('../middleware/adminMiddleware');

const router = express.Router()

router.get("/users",adminProtect, getAllUsers)
router.get("/complaints",adminProtect, getAllComments)
router.get("/complaints/:id",adminProtect,getUserCar )



module.exports = router;