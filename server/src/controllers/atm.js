const { Atm } = require("../models/atmModel");

exports.newAtm = async (req, res) => {
  try {
    const data = await req.body;
    const newAtm = new Atm(data);
    const savedAtm = await newAtm.save();

    res.status(201).json(savedAtm);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.fetchAtms = async (req, res) => {
  try {
    let query = await Atm.find({});
      if (req.query.bankname) {
        query = await Atm.find({bankname: { $in: req.query.bankname.split(",") }});
      }
      if (req.query.bankname === "all" || req.query.cashstatus === "all") {
        query = await Atm.find({});
      }
      if (req.query.cashstatus) {
        query = await Atm.find({ cashstatus: { $in: req.query.cashstatus.split(",") } });
      }

      res.status(200).json(query);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.fetchAtmsbyId = async (req, res) => {
  try {
    const { id } = await req.params;
    const atm = await Atm.findById(id);
    res.status(201).json(atm);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.updateAtm = async (req, res) => {
  try {
    const { id } = await req.params;
    const update = await Atm.findByIdAndUpdate(id, req.body, { new: true });
    res.status(201).json(update);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAtm = async (req, res) => {
  try {
    const { id } = await req.params;
    const response = await Atm.findByIdAndDelete(id);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

