const express  =require("express");
const { User } = require("../db");
const {authMiddleware} = require("../middleware");
const router = express.Router();

router.get("/", authMiddleware, async(req,res)=>{

    const filter = req.query.filter || "";
    const allUser = await User.find({
        "$or" : [{
            firstname : {
                "$regex" : filter,
            }
        },{
            lastName : {
               "$regex" : filter,
            }
        }]
    })

     res.json({
        user : allUser.map(user =>({
            username :  user.username,
            firstName : user.firstName,
            lastName :  user.lastName
        }))
     })

})


module.exports = router;