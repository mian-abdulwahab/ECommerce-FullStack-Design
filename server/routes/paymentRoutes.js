const express = require('express');
const router = express.Router();
const stripe = process.env.STRIPE_SECRET_KEY ? require('stripe')(process.env.STRIPE_SECRET_KEY) : null;
const auth = require('../middleware/auth');

if (!process.env.STRIPE_SECRET_KEY) {
    console.warn('WARNING: STRIPE_SECRET_KEY is missing in .env. Payment functionality will be disabled.');
}

// Create Payment Intent
router.post('/create-payment-intent', auth, async (req, res) => {
    try {
        const { amount } = req.body;

        if (!stripe) {
            return res.status(500).json({ message: 'Stripe is not configured. Please add STRIPE_SECRET_KEY to .env' });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // convert to cents
            currency: 'usd',
            metadata: { integration_check: 'accept_a_payment' },
        });

        res.json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
