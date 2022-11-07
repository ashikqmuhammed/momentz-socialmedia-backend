// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const { readdirSync } = require("fs");
// const fileUpload = require("express-fileupload");
// const dotenv = require("dotenv");

// dotenv.config();

// const app = express();
// app.use(express.json());
// const corsOptions = {
//   origin: "*",
//   credentials: true, //access-control-allow-credentials:true
// };
// app.use(cors());

// app.use(
//   fileUpload({
//     useTempFiles: true,
//   })
// );

// //routes
// readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

// //database
// mongoose
//   .connect(process.env.DATABASE_URL, {
//     useNewUrlParser: true,
//   })
//   .then(() => console.log("database connected successfully"))
//   .catch((err) => console.log("error connecting to mongodb", err));

// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//   console.log(`server is running on port ${PORT}..`);
// });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());
// app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
//routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

//database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log("error connecting to mongodb", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}..`);
});
