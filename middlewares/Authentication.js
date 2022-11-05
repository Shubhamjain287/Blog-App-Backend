const jwt = require("jsonwebtoken");

const verify = (req,res,next) => {
    const headers = req.headers[`authorization`];
    const token = headers.split(" ")[1];
    if(!token){
        return res.status(404).json({message : `No Token Found !!`});
    }
    const {_id} = jwt.verify(String(token),process.env.JWT_SECRET_KEY);
    req.User_id = _id;
    next();
};

module.exports = verify;