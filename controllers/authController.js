const admin = require('../firebase/firebase');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const { phoneNumber } = req.body;
    try {
        const userRecord = await admin.auth().getUserByPhoneNumber(phoneNumber);
        const customToken = jwt.sign({ uid: userRecord.uid, phoneNumber: phoneNumber }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        // Send OTP
        const sessionId = await admin.auth().createSessionCookie(customToken, { expiresIn: 3600000 });
        await admin.auth().createCustomToken(sessionId);

        res.json({ message: 'OTP sent.', token: customToken });
    } catch (error) {
        res.status(400).json({ message: 'Error signing up.', error: error.message });
    }
};

exports.verifyOtp = async (req, res) => {
    const { phoneNumber, otp } = req.body;
    try {
        // Assuming OTP is verified successfully using a Firebase method or external service
        // Once verified, return the JWT token for the session

        const userRecord = await admin.auth().getUserByPhoneNumber(phoneNumber);
        const customToken = jwt.sign({ uid: userRecord.uid, phoneNumber: phoneNumber }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'OTP verified.', token: customToken });
    } catch (error) {
        res.status(400).json({ message: 'Error verifying OTP.', error: error.message });
    }
};
