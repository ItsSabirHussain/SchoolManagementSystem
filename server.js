const admin = require("./routes/admin");
const registrar = require("./routes/registrar");
const financemanager = require("./routes/financemanager");
const student = require("./routes/student");
const faculty = require("./routes/faculty");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const cors = require("cors");

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(cors());

// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/admin", admin);
app.use("/registrar", registrar);
app.use("/financemanager", financemanager);
app.use("/student", student);
app.use("/faculty", faculty);

// For Heroku
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    console.log(__filename);
    res.sendFile(path.resolve(__dirname + "/client/build/index.html")); // relative path
  });
}

const port = process.env.PORT || 4000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
