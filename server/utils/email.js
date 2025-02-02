
// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     }
// });

// // OTP generation function (You can swap this out depending on the type you want)
// const generateOTP = () => {
//     return Math.floor(100000 + Math.random() * 900000); // 6-digit numeric OTP
// };

// // Function to send OTP with action type (Login, Registration, ResetPassword, etc.)
// const sendOTP = (email, otp, actionType) => {
//     let actionDescription = '';

//     // Determine action type and set the corresponding message
//     switch (actionType) {
//         case 'login':
//             actionDescription = 'You requested a login OTP.';
//             break;
//         case 'register':
//             actionDescription = 'You requested a registration OTP.';
//             break;
//         case 'resetPassword':
//             actionDescription = 'You requested a password reset OTP.';
//             break;
//         case 'loginSucess':
//             actionDescription = 'Login Sucessfully!.';
//             break;
//         case 'registrationSucess':
//             actionDescription = 'Registration Sucessfully!.';
//             break;
//         default:
//             actionDescription = 'You requested an OTP.';
//             break;
//     }

//     const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: email,
//         subject: 'Your OTP Code',
//         text: `
//             ${actionDescription}
            
//             Your OTP is: ${otp}. It will expire in 10 minutes.
//         `
//     };

//     return transporter.sendMail(mailOptions);
// };

// module.exports = { sendOTP };

const nodemailer = require('nodemailer');

// Create a transporter with Gmail service
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// OTP generation function
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
};

// Function to send OTP or Confirmation email
const sendEmail = (email, otp, actionType) => {
    let actionDescription = '';
    let subject = 'Your OTP Code';

    // Determine action type and set the corresponding message
    switch (actionType) {
        case 'login':
            actionDescription = 'You requested a login OTP.';
            break;
        case 'register':
            actionDescription = 'You requested a registration OTP.';
            break;
        case 'resetPassword':
            actionDescription = 'You requested a password reset OTP.';
            break;
        case 'loginSuccess':
            actionDescription = 'Login Successful! Welcome back.';
            subject = 'Login Success - Confirmation';
            break;
        case 'registrationSuccess':
            actionDescription = 'Registration Successful! You can now login with your credentials.';
            subject = 'Registration Success - Confirmation';
            break;
        case 'passwordResetSuccess':
            actionDescription = 'Password reset was successful! You can now login with your new password.';
            subject = 'Password Reset Success - Confirmation';
            break;
        case 'accountDeletedSuccess':
            actionDescription = 'account deleted sucessfully!..';
            subject = 'Account Deletion Success - Confirmation';
            break;
        case 'accountStatuschangedSuccess':
            actionDescription = 'account status chanaged sucessfully!.';
            subject = 'Account Status Changed - Confirmation';
            break;
        default:
            actionDescription = 'You requested an OTP or confirmation email.';
            break;
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: `
            ${actionDescription}
            
            ${otp ? `Your OTP is: ${otp}. It will expire in 10 minutes.` : ''}
        `
    };

    return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
