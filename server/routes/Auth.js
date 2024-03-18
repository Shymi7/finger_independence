const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../model/User');
const TrainingScore = require("../model/TrainingScore");


router.post('/register', async (req, res) => {
    try {
        const {username, password} = req.body;

        // Check if the username already exists
        const existingUser = await User.findOne({username});
        if (existingUser) {
            return res.status(400).json({message: 'Username already exists'});
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({userId: newUser.userId, message: 'User registered successfully'});
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;

        // Check if the user exists
        const user = await User.findOne({username});
        if (!user) {
            return res.status(401).json({message: 'Invalid username or password'});
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({message: 'Invalid username or password'});
        }

        // Generate a JWT token
        const token = jwt.sign({
            userId: user.userId,
            username: user.username
        }, config.secret, {expiresIn: config.expiresIn});

        res.status(200).json({userId: user.userId, token});
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
});


module.exports = router;
