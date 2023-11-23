const { Atm } = require("../models/atmModel");
const { User } = require("../models/userModel");

exports.dashboard=async(req,res)=>{
    try {
        const atm = await Atm.find({});
        const user = await User.find({}).sort({ timestamp: -1 });
        res.status(200).json({atm:atm.length,user:user.length,users:user});
    } catch (error) {
        return res.status(500).json({error: error});
    }
}