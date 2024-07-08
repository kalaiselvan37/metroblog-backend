
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/UserModel.js';

export const login = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        console.log(req.body);
        const user = await User.findOne({ Email });
        if (!user) {
            return res.send({ message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(Password, user.Password);
        if (!isPasswordValid) {
            return res.send({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id, Email: user.Email, Role: user.Role }, process.env.TOKENSECRET,);
        res.send({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.send({ message: 'Internal server error' });
    }
};
