const request = require("request");
const express = require("express");
const router = express.Router();
const response = require("../network/responses");

router.get("/", (req, res) => {
  request(
    "https://us-central1-gcp-5-348415.cloudfunctions.net/getUsers",
    (err, r, body) => {
      if (!err) {
        response.success(req, res, JSON.parse(body), 200);
      } else {
        response.error(req, res, err, 500);
      }
    }
  );
});

module.exports = router;
