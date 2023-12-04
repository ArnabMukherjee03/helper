const express = require("express");
const { fetchAtms, newAtm } = require("../controllers/req");


const router = express.Router(); 


router.get("/fetchAtms",fetchAtms)
      .post("/addAtm",newAtm)
    //   .delete("/:id",deleteAtm)


exports.router = router;
