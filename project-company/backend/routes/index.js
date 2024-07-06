const express  =require("express");

const router = express.Router();
const userRouter = require("./user");
const dashboarRouter = require("./dashboard")

router.use('/users', userRouter);
router.use('/dashboard', dashboarRouter);



module.exports = router;