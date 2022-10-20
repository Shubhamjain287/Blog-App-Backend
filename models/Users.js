const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    description : {
        type : String,
        // required : true
    },
    blogs : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Post"
    }],
    profile : {
        type : Object,
        url : {
            type : URL,
            // required : true
        },
        public_id : {
            type : String,
            // required : true
        },
    }
});

const User = mongoose.model("User",userSchema);
module.exports = User;