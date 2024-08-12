const axios = require('axios');
const bcrypt = require('bcrypt');
const User = require('../../models/User');
const generateOTP = require('../../utils/generateOTP');
const sendEmail = require('../../config/nodemailer');

const OTP_HASH_SALT_ROUNDS = 10; // Salt rounds for bcrypt

// Send OTP to mobile and email
exports.sendOtp = async (req, res) => {
    const { mobile, email } = req.body;

    if (!mobile) {
        return res.status(400).json({ message: 'Mobile number is required' });
    }

    const otp = generateOTP();
    const otpExpiry = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes

    const hashedOtp = await bcrypt.hash(otp, OTP_HASH_SALT_ROUNDS);

    let user = await User.findOne({ mobile });

    if (user) {
        user.otp = hashedOtp;
        user.otpExpiry = otpExpiry;
    } else {
        user = new User({ mobile, otp: hashedOtp, otpExpiry });
    }

    if (email) {
        const emailOtp = generateOTP();
        const emailOtpExpiry = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes

        const hashedEmailOtp = await bcrypt.hash(emailOtp, OTP_HASH_SALT_ROUNDS);

        user.email = email;
        user.emailOtp = hashedEmailOtp;
        user.emailOtpExpiry = emailOtpExpiry;

        // Send OTP to email
        try {
            await sendEmail(email, 'Your RideBuddy OTP', `Your OTP for RideBuddy is ${emailOtp}. Please do not share it with anyone.`);
            console.log(`OTP sent to email ${email}`);
        } catch (error) {
            console.error('Error sending email OTP:', error);
            return res.status(500).json({ message: 'Failed to send OTP to email' });
        }
    }

    await user.save();

    // Send OTP via Textify Digitals API
    const apiKey = process.env.API_KEY;
    const senderId = 'APMOBL';
    const templateId = '1707170806586426117';
    const message = `Your One Time Password (OTP) for your RideBuddy account is ${otp} . Please validate it on authentication page and do not share it with anyone. Regards Team AP Mobility India Private Limited`;

    const url = `https://sms.textifydigitals.com/vb/apikey.php?apikey=${apiKey}&senderid=${senderId}&templateid${templateId}=&number=${mobile}&message= ${message}`;

    try {
        const response = await axios.get(url);
        console.log('API Response:', response.data);
        if (response.data.status === 'Success') {
            console.log(`OTP ${otp} sent to mobile number ${mobile}`);
            res.status(200).json({ message: 'OTP sent to mobile number and email (if provided)' });
        } else {
            console.error('Failed to send OTP to mobile:', response.data);
            res.status(500).json({ message: 'Failed to send OTP to mobile number' });
        }
    } catch (error) {
        console.error('Error sending OTP to mobile:', error.message || error);
        res.status(500).json({ message: 'Failed to send OTP to mobile number' });
    }
};