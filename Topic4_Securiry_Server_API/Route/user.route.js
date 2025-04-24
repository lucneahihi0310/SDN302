const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

router.post('/register', async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: 'Email exists' });

        const passwordHash = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, passwordHash, role: 'user' });
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return res.status(400).json({ message: 'Invalid email or password' });

        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_KEY, { expiresIn: '7d' });
        res.json({ token });
    } catch (error) {
        next(error);
    }
});


module.exports = router;