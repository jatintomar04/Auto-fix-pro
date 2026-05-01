const expressAsyncHandler = require("express-async-handler");
const User = require("../models/authmodels")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const register = expressAsyncHandler(async(req,res) => {

    const {name , email, password} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error ('Please fill all details.. ')
    }
const userExist = await User.findOne({email})

if (userExist) {
    res.status(400)
        throw new Error ('User already exist')
}

const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password, salt)

const user = await User.create({
    name, email, password : hashedPassword
})

if (!user) {
    res.status(400)
    throw new Error ('User not created!!')
}else{
    res.status(201).json({
        id : user._id,
        name : user.name,
        email : user.email,
        token : generateToken(user._id),
    })

}


});

const login = expressAsyncHandler(async (req,res)=>{
    const {email, password} = req.body

    if( !email || !password){
        res.status(400)
        throw new Error ('Please fill all details.. ')
    }

    const user = await User.findOne({email});

if (user && await (bcrypt.compare(password, user.password))) {

    res.status(201).json({
        id : user._id,
        name : user.name,
        email : user.email,
        token : generateToken(user._id),
        isAdmin : user.isAdmin
    });
}else{
    res.status(400)
    throw new Error('Invalid Credentials')
}
});

const privateController = expressAsyncHandler(async(req, res)=>{
    res.json(req.user)
})
const adminController = expressAsyncHandler(async(req, res)=>{
    res.json(req.user)
})



const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn : "30D"})
}


module.exports = {register, login , privateController, adminController}