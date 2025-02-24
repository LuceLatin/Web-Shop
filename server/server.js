if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const connectToDB = require("./config/connectToDB");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const verifyToken = require("./middleware/authMiddleware");
const authenticateToken = require("./middleware/roleMiddleware");

const app = express();
const cors = require("cors");
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(require("./routes/crud"));
app.use(require("./routes/auth"));

connectToDB();

app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

app.use("/api", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
