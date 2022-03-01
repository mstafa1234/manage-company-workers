const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const hpp = require("hpp");
const errorHandler = require("./midleware/error");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 8000;
// Connect to database
connectDB();

// Route files
const companies = require("./routes/companies");
const people = require("./routes/people");

const app = express();

// Set static folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}
// Body parser
app.use(express.json());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Mount routers
app.use("/api/v1/companies", companies);
app.use("/api/v1/people", people);

app.use(errorHandler);

app.listen(PORT, console.log(`Server running on port ${PORT}`));

// // Handle unhandled promise rejections
// process.on("unhandledRejection", (err, promise) => {
//   console.log(`Error: ${err.message}`);
//   // Close server & exit process
//   // server.close(() => process.exit(1));
// });
