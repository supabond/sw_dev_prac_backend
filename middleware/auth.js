const jwt = require('jsonwebtoken');
const User = require('../models/User');

//protect routes
exports.protect = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1] ;
    }

    // Check if token is present in cookies
    // if (req.cookies && req.cookies.token) {
    //     token = req.cookies.token;
    // }

    //Make sure token exists
    if(!token || token=='null'){
        return res.status(401).json({success: false, message: 'Not authorize to access this route'});
    }

    try{
        //Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log(decoded);

        req.user = await User.findById(decoded.id) ;

        next() ;
    } catch (err) {
        console.log(err.stack) ;
        return res.status(401).json({success:false, message: 'Not authorize to access this route'});
    }
}

//Grant access to specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            res.status(403).json({
                succes: false,
                message: 'User role ' + req.user.role + ' is not authorize to access this route'
            });
        }
        next();
    }
}