const express = require("express");
const { getUser, getUsers, updateCurrentUser, updatePassword, deleteUser } = require("../controllers/user");
const passport = require('passport');

const router = express.Router(); 


router.get("/currentUser",passport.authenticate('jwt'),getUser)
      .get("/allUsers",getUsers)
      .patch("/updateCurrentUser",passport.authenticate('jwt'),updateCurrentUser)
      .patch("/updatePassword",passport.authenticate('jwt'),updatePassword)
      .delete("/:id",deleteUser)
exports.router = router;
