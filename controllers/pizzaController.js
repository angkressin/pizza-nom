var express = require("express");

var router = express.Router();

// Import the model (pizza.js) to use its database functions.
var pizza = require("../models/pizza.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  pizza.selectionAll(function(data) {
    var hbsObject = {
      pizza: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});


router.post("/api/pizza", function(req, res) {
  if (req.body.pizza_name === "") {
    return false;
  } else {
  pizza.insertOne(["pizza_name", "devoured"], [req.body.pizza_name, req.body.devoured], function(result) {
    // Send back the ID of the new pizza
    res.json({ id: result.insertId });
  });
}
});

router.put("/api/pizza/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  pizza.updateOne({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/pizza/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  pizza.deleteOne(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
