const express = require('express');

const router = express.Router();
const zod = require("zod");
const { User } = require('../db');
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../config');


const userBody = zod.object({
    username : zod.string().email(),
    firstName : zod.string(),
    lastName : zod.string(),
    password : zod.string(),
})


router.post('/signup', async (req,res)=>{

    const verifiedUser = userBody.safeParse(req.body);

    if(!verifiedUser.success){
        return res.status(411).json({
            msg : "Incorrect Inputs"
        })
    }

    const isExist = await User.findOne({
        username : req.body.username
    })

    if(isExist){
        return res.status(411).json({
            msg : "user already Exists",
        })
    }


    const user = await User.create({
        username : req.body.username,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        password : req.body.password

    })

    const token = jwt.sign({
        userId : user._id
    },JWT_SECRET)

    
    res.json({
        msg: "User Created succesfullly",
        token
    })

})

const signinBody = zod.object({
    username : zod.string().email(),
    password : zod.string()
})

router.post("/signin",async(req , res)=>{

const validUser = signinBody.safeParse(req.body);

if(!validUser.success){
    return res.status(411).json({
     msg : "Incorret inputs"
    })
}

const user = await User.findOne({
    username : req.body.username,
})

if(user){
    const token = jwt.sign({
        userId : User._id,
    },JWT_SECRET);
    
    res.json({
        token
    })
    return
    
}

res.json({
    msg : "Error while logging in"
})

})




module.exports = router;
