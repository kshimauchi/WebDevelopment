import express from 'express';

const router = express.Router();

router.post('/api/users/signing', (req, res) => {
    res.send('Hi there!');
});

export { router as signinRouter };