const bcrypt = require('bcryptjs');
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

module.exports = { register };