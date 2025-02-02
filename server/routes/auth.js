const express = require('express');
const { register, logout,verifyDeleteAccountOTP,verifyLoginOTP ,resetPassword,verifyRegistrationOTP,verifyChangeStatusOTP,verifyResetPasswordOTP,login,changeAccountStatus,deleteAccount} = require('../controllers/authController');
const otpLimiter = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/register', register);
router.post('/verifyRegistrationOTP', verifyRegistrationOTP);

router.post('/login', otpLimiter, login);
router.post('/verifyLoginOTP', verifyLoginOTP);
router.post('/logout', logout);

router.post('/resetPassword', otpLimiter, resetPassword);
router.post('/verifyResetPasswordOTP', verifyResetPasswordOTP);

router.post('/changeAccountStatus', otpLimiter, changeAccountStatus);
router.post('/verifyChangeStatusOTP', verifyChangeStatusOTP);

router.post('/deleteAccount', otpLimiter, deleteAccount);
router.post('/verifyDeleteAccountOTP ', verifyDeleteAccountOTP);

module.exports = router;   
