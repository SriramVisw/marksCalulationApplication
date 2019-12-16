var express = require("express");
var app = express();
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("landingPage");
});

app.get("/form", function(req, res) {
  //req.query.x where x should be the name of from the form and in this case
  // it is noOfAssessments.
  var noOfAssessments = req.query.noOfAssessments;
  var unitCode = req.query.unitCode;
  res.render("assignmentMarksPage", {
    noOfAssessments: noOfAssessments,
    unitCode: unitCode
  });
});

app.get("/finalPage", function(req, res) {
  //need to calculate the marks based on all those parameters using if statements
  calculateMarks(req.query);
  var marksRequired = req.query.marksRequired;
  res.render("finalPage", { marksRequired: marksRequired });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
  console.log("The server has started!");
});

function calculateMarks(passedObject) {
  console.log(passedObject.percentageAllocatedAssignment1);
}
