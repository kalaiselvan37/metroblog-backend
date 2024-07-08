import bcrypt from 'bcrypt';
import User from '../../models/UserModel.js';
import sendMail from '../../services/mailservice.js';


// Forgot password flow
export const sendForgotPasswordOTP = async (req, res) => {
    try {
        const { Email } = req.body;
        const user = await User.findOne({ Email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const { otp } = await sendMail({ Email }); // Generate and send OTP via email
        user.OTP = otp;
        await user.save();
        res.status(200).json({ message: 'OTP sent to your email.' });
    } catch (error) {
        console.error('Error sending OTP for forgot password:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  export const verifyForgotPasswordOTP = async (req, res) => {
    try {
        const { Email, OTP } = req.body;
        const user = await User.findOne({ Email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.OTP !== OTP) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }
        user.OTP = user.OTP; // Clear the OTP
        await user.save();
        res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        console.error('Error verifying OTP for forgot password:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  export const updatePassword = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        const user = await User.findOne({ Email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const hashPassword = await bcrypt.hash(Password, 10);
        user.Password = hashPassword;
        await user.save();
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
  };