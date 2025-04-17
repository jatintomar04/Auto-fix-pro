const expressAsyncHandler = require("express-async-handler");
const User = require("../models/authmodels");
const Car = require("../models/carModel");



const getAllUsers = expressAsyncHandler(async(req, res)=>{
   
    const users = await User.find()

    if(!users) {
        res.status(400)
        throw new Error ('User Not Found')
    }
res.status(200).json(users)


})
const getAllComments = expressAsyncHandler(async(req, res)=>{
    
    const complaints = await Car.find()

    if(!complaints) {
        res.status(400)
        throw new Error ('Comlaints Not Found')
    }
res.status(200).json(complaints)
})


const getUserCar = expressAsyncHandler(async (req, res) => {
    const complaint = await Car.findById(req.params.id);
  
    if (!complaint) {
      res.status(400);
      throw new Error("Complaint Not Found");
    }
  
    res.status(200).json(complaint);
  });




module.exports ={getAllComments, getAllUsers, getUserCar}