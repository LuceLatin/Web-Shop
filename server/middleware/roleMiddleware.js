const jwt = require("jsonwebtoken");

//ako je admin
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }

    // dekodiranog korisnika stavljam u objekt req
    req.user = user;

    // Provjeravamo isAdmin
    if (user.isAdmin) {
      console.log("Prijavljen je admin.");
      next();
    } else {
      console.log("Prijavljen je korisnik.");
    }
  });
};

module.exports = authenticateToken;
