const User = require('./User');
const PDFDocument = require('pdfkit');
const fs = require('fs');

// Submit Quiz and Generate Certificate
exports.submitQuiz = async (req, res) => {
    const { userId, topic, score } = req.body;

    try {
        const User = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Generate PDF Certificate
        const doc = new PDFDocument();
        const certPath = `certificates/${user.name}_${topic}.pdf`;
        doc.pipe(fs.createWriteStream(certPath));
        doc.fontSize(20).text('Certificate of Completion', 100, 100);
        doc.text(`Awarded to: ${user.name}`, 100, 150);
        doc.text(`Topic: ${topic}`, 100, 200);
        doc.text(`Score: ${score}`, 100, 250);
        doc.end();

        // Add quiz result to user
        user.quizzesTaken.push({ topic, score, certificate: certPath });
        if (score >= 80) user.badges.push('Gold Badge'); // Example reward
        await user.save();

        res.status(200).json({ message: 'Quiz submitted successfully', certificate: certPath });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};