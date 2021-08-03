import express from 'express';
import { currentUser } from '@ticket-share/common';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
    // refactored to currentUser middleware
    res.send({ currentUser: req.currentUser || null });

});
export { router as currentUserRouter };

/*
Restructured:
extracted errors and middleware to it's own npm package/module
(1) corrected imports for the changes
(2) 
*/