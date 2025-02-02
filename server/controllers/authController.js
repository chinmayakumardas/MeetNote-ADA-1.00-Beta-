


const User = require('../models/User');
const { generateToken,generateRefreshToken } = require('../config/jwt');
const { sendEmail } = require('../utils/email');
const { generateOTP } = require('../utils/otp');
const logger = require('../utils/logger');
const bcrypt = require('bcryptjs');

const tempUsers = new Map();
//registration
exports.register = async (req, res) => {
    try {
        const { name, email, username, password, role = 'employee', department, dob, mobileNumber, joiningDate, createdBy } = req.body;

        if (await User.findOne({ email }) || tempUsers.has(email)) {
            return res.status(400).json({ success: false, message: 'User already exists or pending verification' });
        }

        const otp = generateOTP();
        const otpExpires = Date.now() + 10 * 60 * 1000;
        const hashedPassword = await bcrypt.hash(password, 10);

        tempUsers.set(email, { name, email, username, password, role, department, dob, mobileNumber, joiningDate, createdBy, otp, otpExpires });

        await sendEmail(email, otp, 'register');
        logger.info(`Registration OTP sent to ${email}`);

        res.status(200).json({ success: true, message: 'OTP sent. Please verify to complete registration.' });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

exports.verifyRegistrationOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const tempUser = tempUsers.get(email);

        if (!tempUser || tempUser.otp !== otp || tempUser.otpExpires < Date.now()) {
            return res.status(400).json({ success: false, message: 'Invalid or expired OTP for registration' });
        }

        const newUser = new User({ ...tempUser, isVerified: true });
        await newUser.save();
        tempUsers.delete(email);
        await sendEmail(email, null, 'registrationSuccess');
        logger.info(`User ${email} registered and verified successfully`);
        res.status(201).json({ success: true, message: 'Registration successful' });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};


// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Input Validation
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid credentials' });

        const otp = generateOTP();
        user.otp = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes expiry
        await user.save();

        await sendEmail(user.email, otp, 'login');
        logger.info(`Login OTP sent to ${user.email}`);

        res.status(200).json({ success: true, message: 'OTP sent for login verification' });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// Verify Login OTP
exports.verifyLoginOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Input Validation
        if (!email || !otp) {
            return res.status(400).json({ success: false, message: 'Email and OTP are required' });
        }

        const user = await User.findOne({ email,otp });
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        // OTP Validation
        if (user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
        }

        // OTP Verification Successful
        user.otp = null;
        user.otpExpires = null;
        const token = generateToken({id:user._id});
        const refreshToken = generateRefreshToken({ id: user._id });

        // Save Tokens to DB
        user.token = token;
        user.refreshToken = refreshToken;
        await user.save();
        await sendEmail(email, otp, 'loginSuccess');
        logger.info(`User ${user.email} logged in successfully after OTP verification`);
        res.status(200).json({ success: true, token, message: 'Login successful after OTP verification' });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

//logout
exports.logout = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        user.token = null;
        user.refreshToken = null;
        await user.save();

        res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};


//reset password
exports.resetPassword = async (req, res) => {
    
    try {
                const { email } = req.body;
        const actionType='resetPassword';
                const user = await User.findOne({ email });
                if (!user) return res.status(404).json({ message: 'User not found' });
        
                const otp = generateOTP();
                user.otp = otp;
                user.otpExpires = Date.now() + 10 * 60 * 1000;
                await user.save();
        
                await sendEmail(email, otp,actionType);
                logger.info(`Password reset OTP sent to ${email}`);
                res.status(200).json({ message: 'OTP sent for password reset' });
            } catch (error) {
                logger.error(error);
                res.status(500).json({ message: 'Server Error' });
            }
};
exports.verifyResetPasswordOTP = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        const user = await User.findOne({  email });

        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        if (user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
        }

        if (!newPassword) return res.status(400).json({ success: false, message: 'New password required' });

        //user.password = await bcrypt.hash(newPassword, 10);
        user.password = newPassword
        user.otp = null;
        user.otpExpires = null;
        await user.save();
        

        logger.info(`Password reset successfully for ${user.email}`);
        logger.info(`Password reset successfully for ${user.password}`);
        res.status(200).json({ success: true, message: 'Password reset successfully' });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

//changeaccountstatus
exports.changeAccountStatus = async (req, res) => {
    try {
        const { email } = req.body;  // Get email from request body
        const { status } = req.body; // Get status from request body

        // Validate status
        if (!['active', 'inactive', 'deleted'].includes(status)) {
            return res.status(400).json({ message: 'Invalid account status' });
        }

        // Find and update user by email
        const user = await User.findOneAndUpdate(
            { email },               // Match user with email
            { accountStatus: status ,
                isDeleted: false // Reset isDeleted when status is active/inactive
            }, // Update account status
            { new: true }             // Return the updated document
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        logger.info(`Account status changed to ${status} for user email: ${email}`);
        res.status(200).json({ message: 'Account status updated successfully', user });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.verifyChangeStatusOTP = async (req, res) => {
    res.status(200).json({ message: 'Account status updated successfully' });
};


//delete account
exports.deleteAccount = async (req, res) => {
    try {
        const { email } = req.body;  // Use email instead of userId

        // Soft delete: update the user's status
        const user = await User.findOneAndUpdate(
            { email, isDeleted: false },                // Ensure we're not re-deleting an already deleted user
            { isDeleted: true, accountStatus: 'deleted' }, // Mark as deleted
            { new: true }                               // Return the updated document
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found or already deleted' });
        }

        logger.info(`Account marked as deleted for email: ${email}`);
        res.status(200).json({ message: 'Account marked as deleted successfully', user });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


exports.verifyDeleteAccountOTP = async (req, res) => {
    res.status(200).json({ message: 'Account deleted successfully' });
};