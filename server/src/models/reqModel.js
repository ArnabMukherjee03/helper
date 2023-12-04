const mongoose = require('mongoose');
const {Schema} = mongoose;

const atmReqSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    bankname:{
        type: String,
        required: true
    },
    
    helplineNo:{
        type: Number,
        required: true
    }
});



const ReqAtm = mongoose.model('atmreqs',atmReqSchema);
exports.ReqAtm = ReqAtm;

