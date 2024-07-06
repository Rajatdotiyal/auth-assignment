
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");


const authMiddleware  = (req,res,next)=>{
    const authHeader  = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(411).json({
            msg : "not allowed"
        })
    }
    const token = authHeader.split(" ")[1];

    
    try{
    const decode = jwt.verify(token , JWT_SECRET);

    req.userId = decode.userId;
    next();
    }catch(e){
        return res.status(411).json({
            msg : "error occured"
        })
    }
}


module.exports =  {authMiddleware}