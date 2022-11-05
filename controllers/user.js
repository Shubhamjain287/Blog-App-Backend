const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req,res) => {
    try {
        
        const { name , email , password , description } = req.body;
        
        const isAlreadyExists = await User.findOne({email});
        
        if(isAlreadyExists){
            return res.status(401).json({ error : `User Already Registered Please Login !!` });
        }

        const hashPassword = await bcrypt.hash(password , 10);

        const newUser = new User({ name , email , password : hashPassword , description });

        await newUser.save();

        res.json({newUser});

    } catch (error) {
        res.status(500).json({error : error.message});
    }
}

exports.loginUser = async (req,res) => {
    try {
        
        const { email , password } = req.body;

        const existingUser = await User.findOne({email});

        if(!existingUser){
            return res.status(400).json({ message : `User Not Found !!`});
        }

        const checkPassword = await bcrypt.compare(password , existingUser.password);

        if(!checkPassword){
            return res.status(400).json({ message : `Invalid Password !!`});
        }
        
        const token = jwt.sign({ _id : existingUser._id}, process.env.JWT_SECRET_KEY, {
            expiresIn : "30d"
        });

        return res.status(200).json({message : `User Login Successfully` , token});

    } catch (error) {
        res.status(500).json({error : error.message});
    }
}

exports.getUser = async (req,res) => {
    try {
        const {User_id} = req;

        const user = await User.findById(User_id , "-password");
        
        if(!user){
            return res.status(400).json({message : `User Not Found !!`});
        }

        return res.status(200).json({user});

    } catch (error) {
        res.status(500).json({error : error.message});
    }
}


