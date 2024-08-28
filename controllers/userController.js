const admin = require('../firebase/firebase');
const Shopify = require('shopify-api-node');

const shopify = new Shopify({
    shopName: process.env.SHOPIFY_SHOP_NAME,
    apiKey: process.env.SHOPIFY_API_KEY,
    password: process.env.SHOPIFY_PASSWORD
});

exports.editForm = async (req, res) => {
    const { name, phoneNumber, email, gender, dob } = req.body;

    try {
        const customer = await shopify.customer.get(req.user.uid);

        let otpSentTo;
        if (customer.phone === phoneNumber) {
            otpSentTo = customer.phone;
        } else {
            otpSentTo = req.user.phoneNumber;
        }

        // Send OTP to `otpSentTo`
        const sessionId = await admin.auth().createSessionCookie(otpSentTo, { expiresIn: 3600000 });
        await admin.auth().createCustomToken(sessionId);

        res.json({ message: 'OTP sent for verification.' });
    } catch (error) {
        res.status(400).json({ message: 'Error in editing form.', error: error.message });
    }
};

exports.verifyOtpForm = async (req, res) => {
    const { phoneNumber, otp } = req.body;
    const { uid } = req.user;

    try {
        // Assuming OTP is verified successfully using a Firebase method or external service

        await shopify.customer.update(uid, {
            phone: phoneNumber,
            email: req.body.email,
            first_name: req.body.name,
            last_name: req.body.gender,
            note: `DOB: ${req.body.dob}`
        });

        res.json({ message: 'Customer details updated.' });
    } catch (error) {
        res.status(400).json({ message: 'Error verifying OTP.', error: error.message });
    }
};
