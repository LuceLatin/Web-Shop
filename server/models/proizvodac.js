const mongoose = require("mongoose");

const proizvodacSchema = new mongoose.Schema({
  naziv: {
    type: String,
    required: true,
  },
  godinaOsnivanja: {
    type: Number,
    required: true,
  },
  drzava: {
    type: String,
    required: true,
  },
  opisFirme: {
    type: String,
    required: true,
  },
  logoURL: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Proizvodac", proizvodacSchema);
