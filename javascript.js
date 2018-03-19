// Initialize Firebase
var config = {
apiKey: "AIzaSyC_mSW3i_f1YerEgDg9yJT5JOYJzeyHgEU",
authDomain: "trainassignment-3e69d.firebaseapp.com",
databaseURL: "https://trainassignment-3e69d.firebaseio.com",
projectId: "trainassignment-3e69d",
storageBucket: "",
messagingSenderId: "688129718280"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function(event) {

    event.preventDefault();

    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#firstTrain").val().trim();
    var frequency = $("#frequency").val().trim();

    database.ref().push({
        "trainName": trainName,
        "destination": destination,
        "firstTrain": firstTrain,
        "frequency": frequency
    });

    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrain").val("");
    $("#frequency").val("");
});

database.ref().on("child_added", function(snap) {

    var trainName = snap.val().trainName;
    var destination = snap.val().destination;
    var firstTrain = snap.val().firstTrain;
    var frequency = snap.val().frequency;

    var firstTrainConv = moment(firstTrain, "hh:mm");

    console.log(moment(firstTrainConv, "minutes"));

    var difference = moment().diff(moment(firstTrainConv, "minutes"));

    console.log(difference);

    var remainder = difference % frequency;

    var minutesTilNext = frequency - remainder;

    var nextTrain = moment().add(minutesTilNext, "minutes");

    var newRow = $("<tr>");
    var tableName = $("<td>").text(trainName);
    var tableDes = $("<td>").text(destination);
    var tableFrequency = $("<td>").text(frequency);
    var tableNext = $("<td>").text(moment(nextTrain).format("hh:mm"));
    var tableMin = $("<td>").text(minutesTilNext);

    newRow.append(tableName).append(tableDes).append(tableFrequency).append(tableNext).append(tableMin);

    $("#trainsGoHere").append(newRow);
    
});