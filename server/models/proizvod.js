const mongoose = require("mongoose");

const proizvodSchema = new mongoose.Schema({
  naziv: {
    type: String,
    required: true,
  },
  cijena: {
    type: Number,
    required: true,
  },
  postotakKakaa: {
    type: Number,
    required: false,
  },
  boja: {
    type: String,
    required: false,
  },
  tip: {
    type: String,
    required: false,
  },
  proizvodac: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Proizvodac",
  },
});

module.exports = mongoose.model('Proizvod', proizvodSchema);