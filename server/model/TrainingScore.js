const mongoose = require('mongoose');

const trainingScoreSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: String, // Added username field
    trainingId: String,
    score: [Number],
    overallScore: Number,
    dateSaved: { type: Date, default: Date.now } // Added dateSaved field to record the save time
});

const TrainingScore = mongoose.model('TrainingScore', trainingScoreSchema);

module.exports = TrainingScore;