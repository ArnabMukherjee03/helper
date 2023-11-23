const express = require("express");

const passport = require('passport');
const { newReview, getReview, deleteReview } = require("../controllers/review");


const router = express.Router(); 


router.post("/",passport.authenticate('jwt'),newReview)
      .get("/:atmId",getReview)
      .delete("/:commentId",deleteReview)
      

exports.router = router;