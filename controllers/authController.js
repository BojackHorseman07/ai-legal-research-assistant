const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {

    try {

          const { name, email, password } = req.body;

          const hashedPassword = await bcrypt.hash(password, 10);

          const user = new User({
               name,
               email,
               password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
    return res.status(404).json({
        message: "User not found"
    });
}
const isMatch = await bcrypt.compare(
    password,
    user.password
);
if (!isMatch) {
    return res.status(401).json({
        message: "Invalid credentials"
    });
}
const token = jwt.sign(
    {
        userId: user._id
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1h"
    }
);
return res.status(200).json({
    message: "Login successful",
    token
});
};

module.exports = { register,login };