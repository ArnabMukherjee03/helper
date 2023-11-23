const {User} = require("../models/userModel");
const { sendMail } = require("../utils/mail");
const { validatePassword } = require("../validation/register");
const bcrypt = require("bcrypt");

exports.getUsers = async (req,res)=>{
    try {
        const users = await User.find({});
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

exports.getUser = async (req,res)=>{
    try {
        const {id} = req.user;
        const user = await User.findById(id);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({message: error});
    }
}

exports.updateCurrentUser = async (req,res)=>{
    try {
        const {id} = req.user;
    const data = await req.body;
    const updatedUser = await Cart.findByIdAndUpdate(id, data, {
      new: true,
    })
    return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({message: error});
    }
    
}

exports.updatePassword = async (req,res)=>{
    try {
        const {oldPassword,newPassword} = await req.body;
        const {id} = req.user;
        const user = await User.findById(id);
        const {isValid,errors} = validatePassword({password:newPassword,confirmPassword:newPassword});

        const validPassword = await bcrypt.compare(oldPassword,user.password);
        console.log(validPassword,user.password);
        if (!isValid) {
            return res.status(400).json({ message: errors });
        }

        if(!validPassword){
            return res.status(400).json({message:"Password is Not Matching"});
        }

        if(newPassword === oldPassword){
            return res.status(400).json({message:"Password already in Use"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();

        const subject = `Password Successfully Updated`;
        const html = `Password Successfully Updated`;

        await sendMail({ email: user.email, subject, html });

        return res.status(200).json({message: "Password Sucessfully Updated"});

    } catch (error) {
        return res.status(500).json({message: error});
    }
}

exports.deleteUser = async (req,res)=>{
    try {
        const {id} = await req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        return res.status(200).json(deletedUser);
    } catch (error) {
        return res.status(500).json({message: error});
    }
}