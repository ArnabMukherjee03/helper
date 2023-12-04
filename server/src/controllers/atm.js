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
    let query = {};

    if (req.query.bankname && req.query.bankname !== "all") {
      
      query.bankname = { $in: req.query.bankname.split(",") };

      if (req.query.cashstatus && req.query.cashstatus !== "all") {
        query.cashstatus = { $in: req.query.cashstatus.split(",") };
      }
    }

    if (req.query.city) {
      query.city = { $in: req.query.city};
      if (!req.query.bankname && req.query.cashstatus && req.query.cashstatus !== "all") {
        query.cashstatus = { $in: req.query.cashstatus.split(",") };
      }
    }
    let result = await Atm.find(query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
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

exports.search = async (req, res) => {
  try {
    const { query } = await req.query;
    console.log(query);
    if (!query) {
      return res.status(400).json({ error: 'Missing search query parameter.' });
    }

    const results = await Atm.find({ address: { $regex: query, $options: 'i' } });
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

