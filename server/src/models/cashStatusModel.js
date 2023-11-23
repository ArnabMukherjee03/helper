const mongoose = require("mongoose");
const { Schema } = mongoose;

const cashStatusSchema = new Schema({
    status:{
        type: Boolean,
        required: true
    },
    atmId:{
        type: Schema.Types.ObjectId,
        ref: 'atms',
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
},{timestamps: true});

const CashStatus = mongoose.model("cashstatus",cashStatusSchema);

exports.CashStatus = CashStatus;
