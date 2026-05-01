const express = require ('express')
const protect = require('../middleware/authMiddleware')
const { getComments, addComments } = require('../controllers/commentControllers')

const router = express.Router({ mergeParams : true})


router.get("/", protect , getComments)
router.post("/", protect, addComments)



module.exports = router