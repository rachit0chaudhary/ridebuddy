require('dotenv').config();
const axios = require('axios');
const User = require('../../models/User');
const generateOTP = require('../../utils/generateOTP');

exports.login = async (req, res) => {
    const { mobile } = req.body;

    if (!mobile) {
        return res.status(400).json({ message: 'Mobile number is required' });
    }

    try {
        let user = await User.findOne({ mobile });

        if (!user) {
            return res.status(400).json({ message: 'No account found with this mobile number. Please create an account.' });
        } else {
            const otp = generateOTP();
            const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // OTP valid for 5 minutes
            user.otp = otp;
            user.otpExpiry = otpExpiry;
            await user.save();

            // Send OTP via Textify Digitals API
            const apiKey = process.env.API_KEY;
            const senderId = 'APMOBL';
            const templateId = '1707170806586426117';
            const message = `Your One Time Password (OTP) for your RideBuddy account is ${otp} . Please validate it on authentication page and do not share it with anyone. Regards Team AP Mobility India Private Limited`;

            const url = `https://sms.textifydigitals.com/vb/apikey.php?apikey=${apiKey}&senderid=${senderId}&templateid${templateId}=&number=${mobile}&message=${message}`;

            try {
                const response = await axios.get(url);

                console.log('SMS API Response:', response.data); // Log the response data for debugging

                if (response.data.status === 'Success' && response.data.code === "011") {
                    // The OTP was sent successfully
                    res.status(200).json({ message: 'OTP sent successfully' });
                    console.log(`OTP ${otp} sent to mobile number ${mobile}`);
                } else {
                    // If there's any other status code, log the response
                    console.error('Unexpected response from SMS API:', response.data);
                    res.status(500).json({ message: 'Failed to send OTP via SMS', error: response.data });
                }
            } catch (error) {
                console.error('Error during SMS API call:', error); // Log any errors during the API call
                res.status(500).json({ message: 'Error sending OTP via SMS', error: error.message || error });
            }
        }
    } catch (error) {
        console.error('Error processing login request:', error); // Log any errors during user lookup or OTP generation
        res.status(500).json({ message: 'Error processing login request', error });
    }
};