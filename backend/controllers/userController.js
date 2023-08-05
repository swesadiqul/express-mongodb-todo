const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');




// @desc  Register new user
// @route POST /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all required fields.')
    }

    // check if the user exists
    const user = await User.findOne({email})
    if (user) {
        res.status(400)
        throw new Error('User already exists.')
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create new user
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (newUser){
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token: generateToken(newUser._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data.')
    }
})

// @desc  Authenticate a user
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    if (!email ||!password) {
        res.status(400)
        throw new Error('Please add all required fields.')
    }
    const user = await User.findOne({email})
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid credentials.')
    }
})

// @desc  Get user dat
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
    const {_id, name, email} = await User.findById(req.user.id);

    res.status(200).json({
        _id,
        name,
        email
    })
})


// Generate Jwt token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}