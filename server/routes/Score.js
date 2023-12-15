const TrainingScore = require("../model/TrainingScore");
const express = require("express");
const authenticateToken = require("../utils/authenticateToken");
const router = express.Router();


router.post('/save-score', authenticateToken, async (req, res) => {
    try {
        const {userId, trainingId, score} = req.body;

        // Check if the user already has a score for this game
        const existingScore = await TrainingScore.findOne({userId, trainingId});

        // if (!existingScore || existingScore.score.reduce((acc, cur) => acc + cur, 0) < score.reduce((acc, cur) => acc + cur, 0)) {
        if (!existingScore || getSumOfArray(existingScore.score) < getSumOfArray(score)) {

            // Save or update the score
            if (!existingScore) {
                const newGameScore = new TrainingScore({userId, trainingId, score});
                await newGameScore.save();
            } else {
                existingScore.score = score;
                await existingScore.save();
            }

            res.status(200).json({message: 'Score saved successfully'});
        } else {
            res.status(200).json({message: 'Score is not higher, not saved'});
        }
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
});


// Get all scores for authenticated user
router.get('/scores', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;

        // Find all scores for the authenticated user
        const userScores = await TrainingScore.find({ userId });

        res.status(200).json({ scores: userScores });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/scores/:scoreId', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const scoreId = req.params.scoreId;

        // Find the score by scoreId for the authenticated user
        const userScore = await TrainingScore.findOne({ userId, trainingId: scoreId });

        if (!userScore) {
            return res.status(404).json({ message: 'Score not found for the authenticated user' });
        }

        res.status(200).json({ score: userScore });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

function getSumOfArray(array) {
    let result = 0;
    for (const element of array) {
        result += element;
    }
    return result;
}

module.exports = router;
