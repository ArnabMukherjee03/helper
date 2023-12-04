const { ReqAtm } = require("../models/reqModel");

exports.newAtm = async (req, res) => {
    try {
      const data = await req.body;
      const newAtm = new ReqAtm(data);
      const savedAtm = await newAtm.save();
  
      res.status(201).json(savedAtm);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };
  
  exports.fetchAtms = async (req, res) => {
    try {
      const query = await ReqAtm.find({});
    res.status(200).json(query);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };