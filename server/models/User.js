const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['superAdmin', 'hr', 'cpc', 'md', 'chairman', 'employee'], default: 'employee' },
    department: { type: String },
    dob: { type: Date },
    mobileNumber: { type: String },
    joiningDate: { type: Date },
    createdBy: { type: String },
    registrationDate: { type: Date, default: Date.now },
    accountStatus: { type: String, enum: ['active', 'inactive', 'deleted'], default: 'active' },
    isDeleted:{type:Boolean,default:false},
    otp: { type: String },
    otpExpires: { type: Date },
    token: { type: String },               // New field for JWT
    refreshToken: { type: String }         // New field for Refresh Token
});

// Password hashing middleware
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Password comparison method
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
