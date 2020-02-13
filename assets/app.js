var firebaseConfig = {
    apiKey: "AIzaSyCsq0WKC2fNFom9PdUp1k6xmhVqKFissvQ",
    authDomain: "section-7-hw.firebaseapp.com",
    databaseURL: "https://section-7-hw.firebaseio.com/",
    projectId: "section-7-hw",
    storageBucket: "section-7-hw.appspot.com",
    messagingSenderId: "674070346952",
    appId: "1:674070346952:web:f0ce6e325909e8663339fd",
    measurementId: "G-NREXW7V1FG" };

    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
   

    var trainData = firebase.database();

    $("#addTrain").on("click",function(){
        var trainName = $("#trainNameInput").val().trim();
        var destination = $("#destinationInput").val().trim();
        var firstTrain = moment($("#trainInput").val().trim(),"HH:mm").subtract(10,"years").format("x");
        var runTime = $("#runTimeInput").val().trim();
        
        var newTrain = {
            name: trainName,
            destination: destination,
            firstTrain: firstTrain,
            runTime: runTime,   
        }
        
        trainData.ref().push(newTrain);
        
        $("#trainNameInput").val("");
        $("#destinationInput").val("");
        $("#trainInput").val("");
        $("#runTimeInput").val("");
        
        return false;
    })
    trainData.ref().on("child_added",function(snapshot){
        var name = snapshot.val().name;
        var destination = snapshot.val().destination;
        var firstTrain = snapshot.val().firstTrain;
        var runTime = snapshot.val().runTime;

        var remainder = moment().diff(moment.unix(firstTrain),"minutes")%firstTrain;
        var minutes = firstTrain - remainder;
        var arrival = moment().add(minutes,"m").format("hh:mm A");
    })