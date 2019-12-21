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
  var marksArray = calculateMarks(req.query);
  res.render("finalPage", { marksArray: marksArray });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("The server has started!");
});

function calculateMarks(passedObject) {
  //calculating the noOfassessments by finding the no of query parameters and subtracting 2 for the
  // desired marks input and the in semester percentage input. Finally dividing the value by 3 (for each of the assessment infos) gives us
  // the no. of assessments
  var noOfVariables = Object.keys(passedObject).length - 2;
  var noOfAssessments = noOfVariables / 3;

  totalInSemesterPerc = parseInt(passedObject.inSemesterPerc, 10);
  exam_marks = 100 - totalInSemesterPerc;

  var arr = new Array(noOfAssessments);

  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(3);
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

  var your_total_marks = 0;
  var total_in_semester_perc = 0;

  for (var i = 0; i < noOfAssessments; i = i + 1) {
    your_total_marks =
      your_total_marks + (arr[i][2] / arr[i][1]) * (arr[i][0] / 100);
    total_in_semester_perc = arr[i][0];
  }

  your_total_marks = your_total_marks * 100;

  var desired_marks = parseInt(passedObject.desiredMarks, 10);

  var marksArray = [];

  // do the calculations and return the object back to the calling method
  marksArray.push(
    Math.round(
      ((desired_marks / 100 - your_total_marks / 100) /
        ((100 - totalInSemesterPerc) / 100)) *
        100
    )
  );
  marksArray.push(
    Math.round(
      ((80 / 100 - your_total_marks / 100) /
        ((100 - totalInSemesterPerc) / 100)) *
        100
    )
  );
  marksArray.push(
    Math.round(
      ((70 / 100 - your_total_marks / 100) /
        ((100 - totalInSemesterPerc) / 100)) *
        100
    )
  );
  marksArray.push(
    Math.round(
      ((60 / 100 - your_total_marks / 100) /
        ((100 - totalInSemesterPerc) / 100)) *
        100
    )
  );
  marksArray.push(
    Math.round(
      ((50 / 100 - your_total_marks / 100) /
        ((100 - totalInSemesterPerc) / 100)) *
        100
    )
  );

  return marksArray;
}
