var mysql = require("mysql");
var pool = mysql.createPool({
  connectionLimit: 10,
  host: "35.222.32.177",
  user: "root",
  password: "root",
  database: "assigment",
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    }
  }

  if (connection) connection.release();
  return;
});

exports.getUsers = (req, res) => {
  pool.query("SELECT * FROM users", function (err, result, fields) {
    if (err) {
      res.status(200).send(result);
      throw new Error(err);
    }

    res.status(200).send(result);
    console.log(result);
  });
};
