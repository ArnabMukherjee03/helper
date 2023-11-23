const express = require("express");
const { fetchAtms, newAtm, updateAtm, deleteAtm, fetchAtmsbyId } = require("../controllers/atm");

const router = express.Router(); 


router.get("/fetchAtms",fetchAtms)
      .post("/addAtm",newAtm)
      .patch("/updateAtm/:id",updateAtm)
      .delete("/:id",deleteAtm)
      .get("/fetchAtm/:id",fetchAtmsbyId)

exports.router = router;
