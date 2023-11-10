// Create web server
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
// Create database connection
const mysql = require("mysql");
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "blog"
});
// Connect to database
conn.connect(err => {
  if (err) throw err;
  console.log("Mysql Connected...");
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Create a root route
app.get("/", (req, res) => {
  let sql = "SELECT * FROM comments";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});
// Show single comment
app.get("/view/:id", (req, res) => {
  let sql = "SELECT * FROM comments WHERE comment_id=" + req.params.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});
// Add a new comment
app.post("/add", (req, res) => {
  let data = { comment_name: req.body.comment_name, comment_body: req.body.comment_body, comment_post_id: req.body.comment_post_id };
  let sql = "INSERT INTO comments SET ?";
  let query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});
// Update the comment
app.put("/update", (req, res) => {
  let sql =
    "UPDATE comments SET comment_name='" +
    req.body.comment_name +
    "', comment_body='" +
    req.body.comment_body +
    "' WHERE comment_id=" +
    req.body.comment_id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});
// Delete comment
app.delete("/delete/:id", (req, res) => {
  let sql = "DELETE FROM comments WHERE comment_id=" + req.params.id + "";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
}
);