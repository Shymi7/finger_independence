const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../model/User');
const TrainingScore = require("../model/TrainingScore");


// const authenticateToken = (req, res, next) => {
//     const token = req.header('Authorization');
//
//     if (!token) return res.status(401).json({ message: 'Unauthorized' });
//
//     jwt.verify(token.replace('Bearer ', ''), config.secret, (err, user) => {
//         if (err) return res.status(403).json({ message: 'Forbidden' });
//
//         req.user = user;
//         next();
//     });
// };


router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
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

        res.status(201).json({ userId: newUser.userId, message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user.userId, username: user.username }, config.secret, { expiresIn: config.expiresIn });

        res.status(200).json({ userId: user.userId, token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});


// router.post('/save-score', authenticateToken, async (req, res) => {
//     try {
//         const { userId, gameId, score } = req.body;
//
//         // Check if the user already has a score for this game
//         const existingScore = await TrainingScore.findOne({ userId, gameId });
//
//         if (!existingScore || existingScore.score.reduce((acc, cur) => acc + cur, 0) < score.reduce((acc, cur) => acc + cur, 0)) {
//             // No existing score or the new score is higher
//
//             // Save or update the score
//             if (!existingScore) {
//                 const newGameScore = new TrainingScore({ userId, gameId, score });
//                 await newGameScore.save();
//             } else {
//                 existingScore.score = score;
//                 await existingScore.save();
//             }
//
//             res.status(200).json({ message: 'Score saved successfully' });
//         } else {
//             res.status(200).json({ message: 'Score is not higher, not saved' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

module.exports = router;
