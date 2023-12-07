const mongoose = require('mongoose');

const trainingScoreSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    trainingId: String,
    score: [Number],
});

const TrainingScore = mongoose.model('TrainingScore', trainingScoreSchema);

module.exports = TrainingScore;