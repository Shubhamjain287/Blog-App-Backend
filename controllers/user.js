const User = require("../models/users");
const Post = require("../models/posts");

exports.registerUser = async (req,res) => {
    try {
        
        const { name , email , password , description } = req.body;
        
        const isAlreadyExists = await User.findOne({email});
        
        if(isAlreadyExists){
            return res.status(401).json({ error : `User Already Registered Please Login !!` });
        }

        const newUser = new User({ name , email , password , description });

        await newUser.save();

        res.json({newUser});

    } catch (error) {
        res.status(500).json({error : error.message});
    }
}

exports.loginUser = (req,res) => {
    
}