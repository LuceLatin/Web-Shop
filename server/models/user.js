const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    //minlength: 6, // Minimalna duljina lozinke
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

//mongoose.model("User", userSchema);
//module.exports = mongoose.model("User", userSchema);
