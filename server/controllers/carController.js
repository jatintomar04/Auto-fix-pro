const expressAsyncHandler = require("express-async-handler");
const User = require("../models/authmodels")
const Car = require("../models/carModel")


const addCar = expressAsyncHandler(async(req,res)=>{
    const {car, description, registration, carImage} = req.body
    
    if(!car , !description, !registration || !carImage){
        res.status(400)
        throw new Error ('please fill all details')
    }


    const newCar = await Car.create({
        car, description, registration,carImage, user : req.user._id
    })
    if(!newCar){
        res.status(400)
        throw new Error ('Car Not created')
    }
    res.status(201).json(newCar)
});

const updateCar = expressAsyncHandler(async(req,res)=>{
    const car = await Car.findById(req.params.id)


   const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {new :true})
   if(!updateCar){
    res.status(400);
    throw new Error("Car Not Created")
   }
   res.status (200).json(updatedCar)
})

const getCar = expressAsyncHandler(async(req,res)=>{
    const car = await Car.findById(req.params.id)

  

    if(!car){
        res.status(404);
        throw new Error("Car Not Created")
    }

    res.status(200).json(car)
})

const getCars = expressAsyncHandler(async(req,res)=>{
    const cars = await Car.find({user: req.user._id})
    if(!cars){
        res.status(404);
        throw new Error("Car Not Created")
    }

    res.status(200).json(cars)
})


module.exports= {addCar, getCars, updateCar, getCar}