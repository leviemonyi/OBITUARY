const express = require("express");
const mysql = require("mysql");
const exphbs = require("express-handlebars");

const app = express();
const port = 3000;

// Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // Leave blank if using XAMPP
  database: "obituary_platform"
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");
});

// Set Handlebars as the templating engine
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

// Serve static files for CSS
app.use(express.static("public"));

// Pagination & Fetching Data
app.get("/", (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let limit = 5;
  let offset = (page - 1) * limit;

  let sql = "SELECT * FROM obituaries LIMIT ? OFFSET ?";
  db.query(sql, [limit, offset], (err, results) => {
    if (err) throw err;

    // Count total records for pagination
    db.query("SELECT COUNT(*) AS count FROM obituaries", (err, countResult) => {
      if (err) throw err;

      let totalPages = Math.ceil(countResult[0].count / limit);
      res.render("home", { obituaries: results, page, totalPages });
    });
  });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

