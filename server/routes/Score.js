const TrainingScore = require("../model/TrainingScore");
const express = require("express");
const authenticateToken = require("../utils/authenticateToken");
const router = express.Router();
const mongoose = require('mongoose');



router.post('/save-score', authenticateToken, async (req, res) => {
    try {
        const { userId, username, trainingId, score } = req.body;
        const overallScore = getSumOfArray(score); // Calculate the overall score

        // Create a new game score record
        const newGameScore = new TrainingScore({ userId, username, trainingId, score, overallScore, dateSaved: new Date() });
        await newGameScore.save();

        res.status(200).json({ message: 'Score saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
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

router.get('/world-records', async (req, res) => {
    try {
        const worldRecords = await TrainingScore.aggregate([
            { $match: { trainingId: { $ne: null } } }, // Exclude records with null trainingId
            { $sort: { overallScore: -1 } }, // Sort documents by overallScore descending
            {
                $group: {
                    _id: "$trainingId",
                    doc: { $first: "$$ROOT" } // Take the first document of each group as it has the max overallScore
                }
            },
            {
                $replaceRoot: { newRoot: "$doc" } // Replace the root to elevate the document
            },
            {
                $project: {
                    _id: 0,
                    userId: 1,
                    username: 1,
                    trainingId: 1,
                    score: 1,
                    overallScore: 1,
                    dateSaved: 1
                }
            }
        ]);

        res.status(200).json({ worldRecords });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/user-best-results', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId; // Extract userId from the authenticated user

        // Aggregation to find the best score per trainingId (category) for the user
        const bestResultsPerCategory = await TrainingScore.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            { $sort: { trainingId: 1, overallScore: -1 } }, // Sort by trainingId and then by overallScore descending
            {
                $group: {
                    _id: "$trainingId",
                    doc: { $first: "$$ROOT" } // Take the document with the highest score in each category
                }
            },
            {
                $replaceRoot: { newRoot: "$doc" } // Elevate the document to the top level
            },
            { $sort: { overallScore: -1 } } // Optional: Sort the final output by overallScore descending
        ]);

        // Calculate the average number of trainings per day
        const totalDays = (await TrainingScore.findOne({ userId: new mongoose.Types.ObjectId(userId) })
            .sort({ dateSaved: 1 })
            .then(doc => {
                if (doc) {
                    const firstDate = doc.dateSaved;
                    const currentDate = new Date();
                    return Math.max((currentDate - firstDate) / (1000 * 60 * 60 * 24), 1); // Ensure at least one day
                }
                return 1; // Default to one day to prevent division by zero
            }));

        const totalTrainings = await TrainingScore.countDocuments({ userId });
        const averageTrainingsByDay = totalTrainings / totalDays;

        res.status(200).json({ bestResultsPerCategory, averageTrainingsByDay });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
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
