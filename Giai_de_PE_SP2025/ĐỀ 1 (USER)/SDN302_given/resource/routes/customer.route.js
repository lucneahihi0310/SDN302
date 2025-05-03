const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Customer = require('../models/customer.model');
const auth = require('../middleware/auth.middleware');


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const customer = await Customer.findOne({ email });
        if (!customer) return res.status(401).json({ message: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

        const token = jwt.sign({ id: customer._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /profile
router.get('/profile', auth, async (req, res) => {
    try {
        const customer = await Customer.findById(req.customerId.id).select('-password');
        if (!customer) return res.status(404).json({ message: 'Customer not found' });
        const formattedCustomer = {
            _id: customer._id,
            name: customer.name,
            email: customer.email,
            address: customer.address,
            phone: customer.phone
        };
        res.json(formattedCustomer);
    } catch {
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;