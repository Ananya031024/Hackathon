const express = require('express');
const { submitQuiz } = require('./quizController');
const router = express.Router();

// Submit Quiz Route
router.post('/submit-quiz', submitQuiz);

module.exports = router;