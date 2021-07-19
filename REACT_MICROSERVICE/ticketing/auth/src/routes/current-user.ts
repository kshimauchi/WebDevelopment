import express from 'express';
import jwt from 'jsonwebtoken';


const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
    // null or defined, if it doesn't flow through the cookieSession middleware
    // !req.session || !req.session.jwt
    if (!req.session?.jwt) {
        //user is not logged in
        return res.send({ currentUser: null });
    }
    //extract info out of token
    //verify will throw error if the jwt token has been messed with
    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
        res.send({ currentUser: payload });

    } catch (err) {
        res.send({ currentUser: null });
    }
});
export { router as currentUserRouter };

/*
React app needs to find out if the current user is logged in
Current User route handler needs to find out if currentUser is logged in
(1) Check for cookie
(2) Inside auth service we need to view the req.session.jwt, this is where json web token
(3) if the property on the jwt web token set, we can verify if it is valid
(4) {currentUser}: {id: '...', email: '...'} we can grab the payload
(5) if the json web token has been altered we can return early with error
tested: delete cookie and submitted get req, to route /currentUser returns null
        signup/sigin also working with cookie and jwt token returns current user
*/