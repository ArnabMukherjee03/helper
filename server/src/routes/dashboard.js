const express = require("express");
const { dashboard } = require("../controllers/dashboard");
const router = express.Router(); 


router.get("/",dashboard)
     

exports.router = router;
