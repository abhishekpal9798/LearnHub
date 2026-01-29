// AUTH , IS STUDENT , IS INSTRUCTOR , IS ADMIN

const jwt = require("jsonwebtoken");
require('dotenv').config();


// ================ AUTH ================
// user Authentication by checking token validating
exports.auth = (req, res, next) => {
    try {
        // extract token by anyone from this 3 ways
        const authHeader = req.header('Authorization');
        const tokenFromHeader = authHeader ? authHeader.replace('Bearer ', '') : undefined;
        const token = req.body?.token || req.cookies.token || tokenFromHeader;

        // if token is missing
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token is Missing'
            });
        }

        // verify token
        let decode;
        try {
            // Try to verify with current JWT_SECRET
            decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
        }
        catch (error) {
            // If that fails, try with the old quoted version for backward compatibility
            try {
                decode = jwt.verify(token, `"${process.env.JWT_SECRET}"`);
                req.user = decode;
            }
            catch (fallbackError) {
                console.log('Error while decoding token');
                console.log('Current secret verification failed:', error.message);
                console.log('Fallback secret verification failed:', fallbackError.message);
                return res.status(401).json({
                    success: false,
                    error: error.message,
                    messgae: 'Error while decoding token'
                })
            }
        }
        // go to next middleware
        next();
    }
    catch (error) {
        console.log('Error while token validating');
        console.log(error);
        return res.status(500).json({
            success: false,
            messgae: 'Error while token validating'
        })
    }
}





// ================ IS STUDENT ================
exports.isStudent = (req, res, next) => {
    try {
        // console.log('User data -> ', req.user)
        if (req.user?.accountType != 'Student') {
            return res.status(401).json({
                success: false,
                messgae: 'This Page is protected only for student'
            })
        }
        // go to next middleware
        next();
    }
    catch (error) {
        console.log('Error while cheching user validity with student accountType');
        console.log(error);
        return res.status(500).json({
            success: false,
            error: error.message,
            messgae: 'Error while cheching user validity with student accountType'
        })
    }
}


// ================ IS INSTRUCTOR ================
exports.isInstructor = (req, res, next) => {
    try {
        // console.log('User data -> ', req.user)
        if (req.user?.accountType != 'Instructor') {
            return res.status(401).json({
                success: false,
                messgae: 'This Page is protected only for Instructor'
            })
        }
        // go to next middleware
        next();
    }
    catch (error) {
        console.log('Error while cheching user validity with Instructor accountType');
        console.log(error);
        return res.status(500).json({
            success: false,
            error: error.message,
            messgae: 'Error while cheching user validity with Instructor accountType'
        })
    }
}


// ================ IS ADMIN ================
exports.isAdmin = (req, res, next) => {
    try {
        // console.log('User data -> ', req.user)
        if (req.user.accountType != 'Admin') {
            return res.status(401).json({
                success: false,
                messgae: 'This Page is protected only for Admin'
            })
        }
        // go to next middleware
        next();
    }
    catch (error) {
        console.log('Error while cheching user validity with Admin accountType');
        console.log(error);
        return res.status(500).json({
            success: false,
            error: error.message,
            messgae: 'Error while cheching user validity with Admin accountType'
        })
    }
}


