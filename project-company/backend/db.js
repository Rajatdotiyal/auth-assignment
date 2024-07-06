const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://rajat:unEdZoU9x65BAxCG@rajatdotiyal.bnwq0ed.mongodb.net/App");

const userSchema = new mongoose.Schema({
    username  : {
        type : String,
        require : true,
        unique : true,
        trim : true,
        minLength : 3,
        maxLength : 30
    },

    firstName : {
        type : String,
        require : true,
        minLength : 3,
        maxLength : 30,
    },
    lastName : {
        type : String,
        require : true,
        trim : true,
        minLength : 3,
        maxLength : 30
    },
    password : {
        type : String,
        require : true,
        trim : true,
        minLength : 6
    },
})

const User = mongoose.model('User' , userSchema);


module.exports = {User}
