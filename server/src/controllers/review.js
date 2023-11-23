const { Atm } = require("../models/atmModel");
const { Review } = require("../models/reviewModel");
const { getIo } = require("../utils/socket");

exports.newReview = async(req,res)=>{
    try {
        const {id} = await req.user;
        const data = await req.body;

        const atm = await Atm.findById(data.atmId);

        const updateAtm = await Atm.findByIdAndUpdate(data.atmId, {
            $inc: {
              'rating.count': 1,
            },
            $set: {
              'rating.rate': (atm.rating.rate * atm.rating.count + data.rate) / (atm.rating.count + 1),
            },
          }, { new: true });

        const newReview = await Review({userId:id,...data});
        const saved = await newReview.save();
        const savedReview = await saved.populate('userId');

        getIo().emit("new-review",{savedReview});

        res.status(200).json("Update Successfull");

    } catch (error) {
        res.status(500).json({message:error});
    }
}

exports.deleteReview = async(req,res)=>{
    try {
        const {commentId} = await req.params;
        const deleteReview = await Review.findByIdAndDelete(commentId);
        const atm = await Atm.findById(deleteReview.atmId);

        if (atm.rating.count > 0) {
          const avgRating = (atm.rating.rate * atm.rating.count)-deleteReview.rate;
          const newCount = atm.rating.count - 1;
    
          // Set the new average rating or reset to 0 if there are no more ratings
          const newAvgRating = newCount > 0 ? avgRating / newCount : 0;
    
          await Atm.findByIdAndUpdate(deleteReview.atmId, {
            $set: {
              'rating.count': newCount,
              'rating.rate': newAvgRating,
            },
          });
        }

        getIo().emit("delete-review",{deleteReview});

        res.status(200).json(deleteReview);
    } catch (error) {
        res.status(500).json({message:error});
    }
}

exports.getReview = async(req,res)=>{
    try {
      const {atmId} = await req.params;
      const review = await Review.find({atmId: atmId}).populate('userId');
      console.log(atmId);
      res.status(200).json(review);
    } catch (error) {
      res.status(500).json({message:error});
    }
}