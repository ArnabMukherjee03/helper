const express = require("express");

const passport = require('passport');
const { updateStatus, getStatusbyId, getStatuses, deleteStatus } = require("../controllers/cashstatus");

const router = express.Router(); 


router.put("/update/:atmId",passport.authenticate('jwt'),updateStatus)
      .get("/getstatus/:atmId",getStatusbyId)
      .get("/",getStatuses)
      .delete("/:id",deleteStatus);

exports.router = router;
