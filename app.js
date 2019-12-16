var express = require("express");
var app = express();
app.set("view engine", "ejs");
require("locus");

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
  //calculating the noOfassessments by finding the no of query parameters and subtracting 1 for the
  // desired marks input. Finally dividing the value by 3 (for each of the assessment infos) gives us
  // the no. of assessments
  var noOfVariables = Object.keys(passedObject).length - 1;
  var noOfAssessments = noOfVariables / 3;

  var arr = new Array(noOfAssessments);

  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(3);
  }

  for (var i = 0; i < noOfVariables; i += 3) {
    console.log(arr[i]);
  }
  var row = 0;
  var column = 0;
  var loopCount = 0;
  for (const key in passedObject) {
    if (loopCount == noOfVariables) {
      break;
    }

    if (row == 3) {
      column = column + 1;
      row = 0;
    }

    arr[column][row] = passedObject[key];

    row = row + 1;
    loopCount = loopCount + 1;
  }

  console.log(arr);

  //console.log(noOfAssessments);

  // do the calculations and return the object back to the calling method
}
