const { CashStatus } = require("../models/cashStatusModel");
const { Atm } = require("../models/atmModel");
const { getIo } = require("../utils/socket");

exports.updateStatus = async(req,res)=>{
    try {
        const {status} = await req.body;
        const {id} = await req.user;
        const {atmId} = await req.params;

        const data = {
            status: status,
            userId: id,
            atmId: atmId
        }

        const newStatus = new CashStatus(data);
        const Status = await newStatus.save();
        const savedStatus = await Status.populate('userId')
        const updateAtm = await Atm.findByIdAndUpdate(atmId,{cashstatus:status}, { new: true });
        
        res.status(200).json({atm:updateAtm,status:savedStatus});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

exports.getStatusbyId = async(req,res)=>{
    try {
       const {atmId} = await req.params;
       console.log(atmId)
       const cashStatus = await CashStatus.find({atmId: atmId}).populate('userId');
       console.log(cashStatus)
       return res.status(200).json(cashStatus);
    } catch (error) {
        return res.status(500).json({message: error});
    }
}

exports.getStatuses = async(req,res)=>{
    try {
        const cashStatus = await CashStatus.find({}).populate('userId').sort({ timestamp: -1 });
        return res.status(200).json(cashStatus);
    } catch (error) {
        return res.status(500).json({message: error});
    }
}

exports.deleteStatus = async(req,res)=>{
    try {
        const {id} = await req.params;
        const deleteData = await CashStatus.findByIdAndDelete(id);
        const totalStatus = await CashStatus.find({atmId: deleteData.atmId});
        const atm = await Atm.findById(deleteData.atmId);
        

        if(totalStatus.length < 2){
            if(atm.cashstatus === deleteData.status){
                await Atm.findByIdAndUpdate(atm._id,{cashstatus:!deleteData.status}, { new: true });
            }
        }

        return res.status(200).json(deleteData);
    } catch (error) {
        return res.status(500).json({message: error});
    }
}