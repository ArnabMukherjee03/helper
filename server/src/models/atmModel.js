const mongoose = require('mongoose');
const {Schema} = mongoose;

const atmSchema = new Schema({
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
    state:{
        type: String,
        required: true
    },
    postalcode:{
        type: String,
        required: true
    },
    bankname:{
        type: String,
        required: true
    },
    rating:{
        rate:{
            type:Number,
            default:0
        },
        count:{
            type:Number,
            default:0
        }
    },
    cashstatus:{
        type: Boolean,
        default: true
    },
    helplineNo:{
        type: Number,
        required: true
    },
    image:{
        type:[String]
    },
    map:{
        type:String
    }
});



const Atm = mongoose.model('atms',atmSchema);
exports.Atm = Atm;

