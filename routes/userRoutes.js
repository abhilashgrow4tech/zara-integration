const express = require('express');
const { editForm, verifyOtpForm } = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/edit-form', verifyToken, editForm);
router.post('/verify-otp-form', verifyToken, verifyOtpForm);

module.exports = router;
