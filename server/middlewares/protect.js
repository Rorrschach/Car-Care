const jwt = require("jsonwebtoken");
const { promisify } = require('util');

const User = require('../models/user');
const protect = async (req, res, next) => {
    // 1) Getting token and check if it's there
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token =  req.headers.authorization.split(' ')[1];
    } else if (req.headers.cookie) {
        token = req.headers.cookie.split('=')[1];
    }


    console.log(token);

    if(!token){
        return res.status(401).json({
            message: "Login to continue"
        })
    }

    // 2) Verify token
    let decoded;
    try{
        decoded = await promisify(jwt.verify)(token, 'abc')
    } catch (e) {
        console.log(e.message);
        return res.status(401).json({
            message: 'Invalid token'
        })
    }

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if(!currentUser) {
        return res.status(401).json({
            message: 'Invalid token'
        })
    }


    // GRANT ACCESS TO PROTECTED ROUTE
    res.locals.user = currentUser;
    req.user = currentUser;
    next();
}

module.exports = protect;