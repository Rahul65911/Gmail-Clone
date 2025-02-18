const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
    try {
        console.log("cookie", req.headers.cookie?.split("=")[1]);
        const token = req.headers.cookie?.split("=")[1];
        if(!token) {
            return res.status(401).json({
                "message":"User not authenticated. Please Login again!"
            })
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);
        if(!decode) {
            return res.status(401).json({
                "message":"Invalid Token"
            })
        }

        req.id = decode.userId;
        next();
    }catch(err) {
        console.error(err);
    }
}

module.exports = isAuthenticated;