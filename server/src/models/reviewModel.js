const mongoose = require('mongoose');
const {Schema} = mongoose;

const reviewSchema = new Schema({
    review:{
        type: String
    },
    rate:{
        type:Number,
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



const Review = mongoose.model('reviews',reviewSchema);
exports.Review = Review;

