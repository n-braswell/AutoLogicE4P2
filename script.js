// global variables 
var betweenTrialTime = 1500;
var maxResponseTime = 1000;
var VideoList = ["videos/Red-NSS-BS-S-B-Pred.mp4", "videos/Red-SNS-SB-S-B-NoPred.mp4", "videos/Red-SNS-BS-B-B-NoPred.mp4", "videos/Red-SNS-SB-S-S-Pred.mp4", "videos/Red-SNS-SB-S-S-NoPred.mp4", "videos/Red-SNS-SB-S-B-Pred.mp4", "videos/Red-SNS-SB-B-S-Pred.mp4", "videos/Red-SNS-SB-B-S-NoPred.mp4", "videos/Red-SNS-SB-B-B-Pred.mp4", "videos/Red-SNS-SB-B-B-NoPred.mp4", "videos/Red-SNS-BS-S-S-Pred.mp4", "videos/Red-SNS-BS-S-S-NoPred.mp4", "videos/Red-SNS-BS-S-B-Pred.mp4", "videos/Red-SNS-BS-S-B-NoPred.mp4", "videos/Red-SNS-BS-B-S-Pred.mp4", "videos/Red-SNS-BS-B-S-NoPred.mp4", "videos/Red-SNS-BS-B-B-Pred.mp4", "videos/Red-NSS-SB-S-S-Pred.mp4", "videos/Red-NSS-SB-S-S-NoPred.mp4", "videos/Red-NSS-SB-S-B-Pred.mp4", "videos/Red-NSS-SB-S-B-NoPred.mp4", "videos/Red-NSS-SB-B-S-Pred.mp4", "videos/Red-NSS-SB-B-S-NoPred.mp4", "videos/Red-NSS-SB-B-B-Pred.mp4", "videos/Red-NSS-SB-B-B-NoPred.mp4", "videos/Red-NSS-BS-S-S-Pred.mp4", "videos/Red-NSS-BS-S-S-NoPred.mp4", "videos/Red-NSS-BS-S-B-NoPred.mp4", "videos/Red-NSS-BS-B-S-Pred.mp4", "videos/Red-NSS-BS-B-S-NoPred.mp4", "videos/Red-NSS-BS-B-B-Pred.mp4", "videos/Red-NSS-BS-B-B-NoPred.mp4", "videos/Blue-SNS-SB-B-B-NoPred.mp4", "videos/Blue-SNS-BS-B-B-NoPred.mp4", "videos/Blue-SNS-SB-S-S-Pred.mp4", "videos/Blue-SNS-SB-S-S-NoPred.mp4", "videos/Blue-SNS-SB-S-B-Pred.mp4", "videos/Blue-SNS-SB-S-B-NoPred.mp4", "videos/Blue-SNS-SB-B-S-NoPred.mp4", "videos/Blue-SNS-SB-B-S-Pred.mp4", "videos/Blue-SNS-SB-B-B-Pred.mp4", "videos/Blue-SNS-BS-S-S-Pred.mp4", "videos/Blue-SNS-BS-S-S-NoPred.mp4", "videos/Blue-SNS-BS-S-B-Pred.mp4", "videos/Blue-SNS-BS-S-B-NoPred.mp4", "videos/Blue-SNS-BS-B-S-Pred.mp4", "videos/Blue-SNS-BS-B-S-NoPred.mp4", "videos/Blue-SNS-BS-B-B-Pred.mp4", "videos/Blue-NSS-SB-S-S-Pred.mp4", "videos/Blue-NSS-SB-S-S-NoPred.mp4", "videos/Blue-NSS-SB-S-B-Pred.mp4", "videos/Blue-NSS-SB-S-B-NoPred.mp4", "videos/Blue-NSS-SB-B-S-Pred.mp4", "videos/Blue-NSS-SB-B-S-NoPred.mp4", "videos/Blue-NSS-SB-B-B-Pred.mp4", "videos/Blue-NSS-SB-B-B-NoPred.mp4", "videos/Blue-NSS-BS-S-S-Pred.mp4", "videos/Blue-NSS-BS-S-S-NoPred.mp4", "videos/Blue-NSS-BS-S-B-Pred.mp4", "videos/Blue-NSS-BS-S-B-NoPred.mp4", "videos/Blue-NSS-BS-B-S-Pred.mp4", "videos/Blue-NSS-BS-B-S-NoPred.mp4", "videos/Blue-NSS-BS-B-B-Pred.mp4", "videos/Blue-NSS-BS-B-B-NoPred.mp4"]
var subjectID, trialActive, t0, td, tf, startTime, endTime, trialCount, feedback, numTrials, loopTimeout, video;
var currentTrialArray, browser, Start, Object_2, lineBrightness, congruence, correctness, currentFrame, lineVisible;
var trialResponseTime, displayedResponseTime, intervalID, inputKey, targetType, tooSlow, slowTimeout, revealTimeout, endFrame;
var response = []; // array to hold all trials (defined below)
var attemptedrepeats=0;
// trial parameter options
var ScoopColor
if (Math.floor(Math.random() * 2) == 0) {
    ScoopColor = "Red";
} else {
    ScoopColor = "Blue";
}
var CupConfigurationOptions = ["SNS","NSS"];
var StartOptions = ["SB","BS"];
var Object_1Options = ["S","B"];
var Object_2Options = ["S", "B"];
var PredCond = ["Pred","NoPred"];

var repetitions = 1;

// get an array of all trial types
var sampleList = cartesian(CupConfigurationOptions, StartOptions, Object_1Options, Object_2Options, PredCond);
// shuffle each repetition of trialList to randomize trial order
var trialList = [];
shuffle(sampleList)
/*for (i = 0; i < repetitions; i++) {
    trialList = trialList.concat(shuffle(sampleList));
}*/

for (i = 0; i < 32; i++){
    console.log(i)
    if (i>1){
        if ((sampleList[0][0]==trialList[i-1][0]&&sampleList[0][0]==trialList[i-2][0]) 
        || (sampleList[0][3]==trialList[i-1][3]&&sampleList[0][3]==trialList[i-2][3])
        || (sampleList[0][4]==trialList[i-1][4]&&sampleList[0][4]==trialList[i-2][4])
        ){
            if(attemptedrepeats<40){
            shuffle(sampleList)
            attemptedrepeats++
            i=i-1
            }else{
                trialList=[];
                i=-1;
                attemptedrepeats=0;
                var sampleList = cartesian(CupConfigurationOptions, StartOptions, Object_1Options, Object_2Options, PredCond);
                shuffle(sampleList)
            }
        }else {
            trialList = trialList.concat([sampleList[0]])
            sampleList.shift();
        }
    }else{
        trialList = trialList.concat([sampleList[0]])
        sampleList.shift();
    }
}

var attentionCheckTrialList = [];
attentionCheckTrialList = [
    ["NSS", "SB", "S", "NA", "ACheck"],
    ["NSS", "BS", "B", "NA", "ACheck"],
    ["NSS", "SB", "B", "NA", "ACheck"],
    ["NSS", "BS", "S", "NA", "ACheck"],
    ["SNS", "SB", "S", "NA", "ACheck"],
    ["SNS", "BS", "B", "NA", "ACheck"],
    ["SNS", "SB", "B", "NA", "ACheck"],
    ["SNS", "BS", "S", "NA", "ACheck"]]

    shuffle(attentionCheckTrialList);

    // Function to generate a random number between min and max (inclusive)
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    var trialInsertionIndex = 4; // Starting at index 4 for the first attention check trial
    var totalAttentionChecks = attentionCheckTrialList.length;
    var remainingTrials = trialList.length - trialInsertionIndex;
    
    for (var i = 0; i < totalAttentionChecks; i++) {
        trialList.splice(trialInsertionIndex, 0, attentionCheckTrialList[i]);
        remainingTrials = trialList.length - trialInsertionIndex - 1;
    
        if (i < totalAttentionChecks - 1) {
            // Proportionally increase the minimum and maximum indices for the random increment
            var progressRatio = (i + 1) / totalAttentionChecks;
            var minIndex = Math.ceil(progressRatio * 9); // Minimum index increases over time
            var maxIndex = Math.min(remainingTrials, Math.ceil(progressRatio * 9 + 1));
    
            trialInsertionIndex += getRandomInt(minIndex, maxIndex);
    
            // Ensure that the next insertion index is within the bounds of the trialList
            if (trialInsertionIndex >= trialList.length) {
                trialInsertionIndex = trialList.length - 1; // Adjust to the last valid index
            }
        }
    }
    

numTrials = trialList.length;
trialCount = numTrials;

function setUp() {

    //Preloads all the videos
    for (item in VideoList){
        var XMLvideoSelection = VideoList[item];
        var xhr = new XMLHttpRequest();
        xhr.open("GET", XMLvideoSelection, true);
        xhr.responseType = "arraybuffer";
        xhr.onload = function(oEvent) {
        var blob = new Blob([oEvent.target.response], {type: "video/mp4"});
        video.src = URL.createObjectURL(blob);
        };
        xhr.onprogress = function(oEvent) {
        if (oEvent.lengthComputable) {
            var percentComplete = oEvent.loaded/oEvent.total;
        }}
        xhr.send()
        }
    

    // start time to get HIT duration
    startTime = new Date();
    // get user info
    browser = getBrowser();
    subjectID = getSubjectID();
    // targetType is to balance key bindings
    if (Math.floor(Math.random() * 2) == 0) {
        targetType = "Snake1Ball2";
    } else {
        targetType = "Snake2Ball1";
    }
    // hide some things for now
    $("#feedbackBox").hide();
    $("#feedbackBar").hide();
    $("#startButton").hide();
    $("#figure").hide();
    $("#image").hide();
    $("#image2").hide();
    $("#image3").hide();
    $("#image4").hide();
    $("#image5").hide();
    // set trial status
    trialActive = false;
    // set up '1' or numpad1 key for testing
    $(document).keyup(function (e) {
        if (e.keyCode == 49 || e.keyCode == 97) {
            showInstructions1();
        }
    });
    video = VideoFrame({
        id: 'video',
        frameRate: 60,
        callback: function (frame) {
            currentFrame = frame;
        }
    });
}

function showInstructions1() {
    $("#instructions").text("Instructions (2 of 4):\r\nThere are are two objects, each half-hidden in a cup with their top parts emerging. If you don't see the objects, this task will not work on your computer. Click on either half-hidden object to proceed.");
    $("#instructions").hide();
    $("#instructions").fadeIn(1000);
    $("#instructionsBarText").text("");
    $(document).off('keyup');
    $("#video").hide();
    $("#figure").show();
    $("#figure").attr("onclick", "showInstructions2()");
}

function showInstructions2() {
    $("#instructions").text("Instructions (3 of 5):\r\nYou will watch movies like the one here below. At some point, one of the cups will disappear, revealing which object was inside it (sometimes it is a snake, sometimes it is a ball). Click on the fully-revealed object to proceed.");
    $("#instructions").hide();
    $("#figure").hide();
    $("#video").show();
    $("#instructions").fadeIn(1000);
    $("#instructionsBarText").text("");
    $("#video").attr("onclick", null);
    $("#video").on("ended", function () {
      FigureEnding()
    }); 
    if(ScoopColor=="Red"){
        PlayMovieRed();
    } else {
        PlayMovieBlue();
    }
}

function showInstructions3() {
    $("#instructions").text("Instructions (4 of 5):\r\nThis is another example of a movie you may see. Click on the fully-revealed object again to proceed.");
    $("#image2").hide();
    $("#image").hide();
    $("#image4").hide();
    $("#instructions").hide();
    $("#figure").hide();
    $("#video").show();
    $("#instructions").fadeIn(1000);
    $("#instructionsBarText").text("");
    $("#video").attr("onclick", null);
    $("#video").on("ended", function () {
      FigureEnding2()
    }); 
    if(ScoopColor=="Red"){
        PlayMovie2Red();
    } else {
        PlayMovie2Blue();
    }
}

function PlayMovieRed() {
    // play movie 1 time 
    videoSelection = "videos/Red-SNS-BS-S-B-Pred.mp4";
    source.setAttribute('src', videoSelection);
    video.video.load();
    video.video.play();
    video.listen('frame');
}

function PlayMovie2Red() {
    // play movie 1 time 
    videoSelection = "videos/Red-SNS-BS-B-B-NoPred.mp4";
    source.setAttribute('src', videoSelection);
    video.video.load();
    video.video.play();
    video.listen('frame');
}

function PlayMovieBlue() {
    // play movie 1 time 
    videoSelection = "videos/Blue-SNS-BS-S-B-Pred.mp4";
    source.setAttribute('src', videoSelection);
    video.video.load();
    video.video.play();
    video.listen('frame');
}

function PlayMovie2Blue() {
    // play movie 1 time 
    videoSelection = "videos/Blue-SNS-BS-B-B-NoPred.mp4";
    source.setAttribute('src', videoSelection);
    video.video.load();
    video.video.play();
    video.listen('frame');
}

function FigureEnding() {
    // make figure appear  
    $("#image").show();
    if(ScoopColor=="Red"){
        $("#image2").show()
        $("#image").hide()
        $("#image2").attr("onclick", "showInstructions3()"); 
    } else {
        $("#image3").hide()
        $("#image4").show()
        $("#image4").attr("onclick", "showInstructions3()"); 
    }
    $("#video").hide();
    $("#video").off("ended");
}

function FigureEnding2() {
    // make figure appear  
        if(ScoopColor=="Red"){
            $("#image3").show()
            $("#image2").hide()
            $("#image3").attr("onclick", "showInstructions4()"); 
        } else {
            $("#image4").hide()
            $("#image5").show()
            $("#image5").attr("onclick", "showInstructions4()"); 
        }
    $("#video").hide();
    $("#video").off("ended");
}



function showInstructions4() {
    
    if (targetType == "Snake1Ball2") {
        $("#instructions").text("Instructions (4 of 4):\r\nYour job in this task is just to say what object you see, as soon as one of the cups disappears. When the object is a snake, press the '1' key, and when it is a ball, press the '2' key. Please respond as quickly as you can. Before that, you will see another object re-emerging from behind the dark-gray wall. Don't worry about that -- just tell us whether the object that has re-appeared from one of the cups is a snake or a ball. Good luck! Click 'Start' to start the task.");
    } else {
        $("#instructions").text("Instructions (4 of 4):\r\nYour job in this task is just to say what object you see, as soon as one of the cups disappears. When the object is a ball, press the '1' key, and when it is a snake, press the '2' key. Please respond as quickly as you can. Before that, you will see another object re-emerging from behind the dark-gray wall. Don't worry about that -- just tell us whether the object that has re-appeared from one of the cups is a snake or a ball. Good luck! Click 'Start' to start the task.");
    }
    $("#image").hide();
    $("#image2").hide()
    $("#image3").hide()
    $("#image4").hide()
    $("#image5").hide()
    $("#figure").hide();
    $("#video").show();
    $("#instructions").fadeIn(1000);
    $("#instructionsBarText").text("");
    $("#video").attr("onclick", null);
    // set up 1 and 2 keys for input
    $(document).keyup(function (e) {
        if (e.keyCode == 49 || e.keyCode == 97) {
            inputKey = 1;
            attemptInput();
        } else if (e.keyCode == 50 || e.keyCode == 98) {
            inputKey = 2;
            attemptInput();
        }
    });
    $("#video").on("ended", function () {
        loopMove(); StartOption()
    });
    loopMove();
    
}

function handleAttentionCheckTrial() {
    if (currentTrialArray[4] === "ACheck") {
    // Check if it's an attention check trial
        $(document).keyup(function (e) {
            //Presses S
            if (e.keyCode == 83) {
                inputKey = 1;
                $(document).off('keyup');
                attemptInput();
            //Presses B
            } else if (e.keyCode == 66) {
                inputKey = 2;
                $(document).off('keyup');
                attemptInput();
            }
        });

        var instructionText = 'Which object just hid <span style="font-weight: bold;">behind the wall</span>? Press "S" for snake or "B" for ball.';
        // Set the instructions bar text with HTML content
        $("#instructionsBarText").html(instructionText);
        $("#instructionsBarText").css({
            "font-weight": "normal", // Ensure the rest of the text is not bold
            "border-style": "solid",
            "border-width": "6px",
            "border-color": "red",
            "padding": "1px"
        });
    }}

function StartOption() {
    // make start button appear
 $("#startButton").show();   
}

function loopMove() {
    // randomly choose parameters
    CupConfiguration = CupConfigurationOptions[Math.floor(Math.random() * CupConfigurationOptions.length)];
    Start = StartOptions[Math.floor(Math.random() * StartOptions.length)];
    Object_1 = Object_1Options[Math.floor(Math.random() * Object_1Options.length)];
    Object_2 = Object_2Options[Math.floor(Math.random() * Object_2Options.length)];
    PredValue = PredCond[Math.floor(Math.random() * PredCond.length)];
    videoSelection = "videos/" + ScoopColor + "-" + CupConfiguration + "-" + Start + "-" + Object_1 + "-" + Object_2 + "-" + PredValue + ".mp4";
    source.setAttribute('src', videoSelection);
    video.video.load();
    video.video.play();
    video.listen('frame');
}

function startTrials() {
    $("#startButton").hide();
    $("#instructions").hide();
    if (targetType == "Snake1Ball2") {
        $("#instructionsBarText").text("Press \'1\' if the revealed object is a snake\r\nPress \'2\' if it is a ball");
    } else {
        $("#instructionsBarText").text("Press \'1\' if the revealed object is the ball\r\nPress \'2\' if it is the snake");
    }
    $("#video").off("ended");
    move();
}

function move() {
    $(document).keyup(function (e) {
        if (e.keyCode == 49 || e.keyCode == 97) {
            inputKey = 1;
            attemptInput();
        } else if (e.keyCode == 50 || e.keyCode == 98) {
            inputKey = 2;
            attemptInput();
        }
    });
    $("#videotext").hide();
    $("#instructions").text("")   
    if (trialList.length == 0) {
        showEndPage();
        return 0;
    }
    currentTrialArray = trialList.shift();
    if (targetType == "Snake1Ball2") {
        $("#instructionsBarText").text("Press \'1\' if the revealed object is a snake\r\nPress \'2\' if it is a ball");
    } else {
        $("#instructionsBarText").text("Press \'1\' if the revealed object is the ball\r\nPress \'2\' if it is the snake");
    }
    // get trial parameters
    CupConfiguration = currentTrialArray[0]
    Start = currentTrialArray[1];
    Object_1 = currentTrialArray[2];
    Object_2 = currentTrialArray[3];
    PredValue = currentTrialArray[4];
    videoSelection = "videos/" + ScoopColor + "-" + CupConfiguration + "-" + Start + "-" + Object_1 + "-" + Object_2 + "-" + PredValue + ".mp4";
    // hide feedback
    $("#feedbackBar").hide();
    // start video
    $("#video").show();
    source.setAttribute('src', videoSelection);
    video.video.load();
    video.video.play();
    video.listen('frame');
    // get line display frame
    if(currentTrialArray[4]=="ACheck"){
    displayFrame = 778;
    console.log("hi")
    }else{
    displayFrame = 981;
    }

    // get trial start time 
    t0 = new Date();
    // set trial status
    trialActive = true;
    // show "too slow" if video ends
    if(currentTrialArray[4]=="ACheck"){
        $(document).off('keyup');
        $("#video").on("ended", function () {
            handleAttentionCheckTrial()
        });
        }else {
        $("#video").on("ended", function () {
            tooSlowPage();
        }); 
        }
}

function attemptInput() {
    lineVisible = currentFrame >= displayFrame;
    if (currentTrialArray[4]=="ACheck"){
        betweenTrials()
        $("#instructionsBarText").css("border-style","none");
        $("#instructionsBarText").text("")
        $("#instructionsBarText").css("font-weight","normal");
    }else{ 
    if (trialActive && lineVisible) {betweenTrials()}}}

function tooSlowPage() {
    // stop video
    video.video.pause();
    $("#video").off("ended");
    // hide video
    $("#video").hide();
    // set trial status
    trialActive = false;
    // get trial end time
    tf = new Date().getTime();
    // set correctness
    correctness = false;
    // set tooSlow
    tooSlow = true;
    // get congruence
    congruence = (Object_1 == "S" && Object_2 == "B") || (Object_1 == "B" && Object_2 == "S");
    // set input key
    inputKey = null;
    // display feedback
    $("#feedbackBar").show();
    $("#feedbackBar").css("background-color", "lightpink");
    $("#feedbackBarText").text("Too slow");
    $("#instructionsBarText").text("");
    // update start button
    $("#startButton").show();
    $("#startButton").attr("onclick", "startTrials()");
    $("#startButton").html("Continue");
    // record trial
    response.push(new Trial(subjectID, browser, ScoopColor, CupConfiguration, Start, Object_1, Object_2, PredValue, congruence, startTime, endTime, inputKey, targetType, correctness, tooSlow, numTrials - trialCount, tf - t0, 1000/60 * (currentFrame - displayFrame), feedback));
    // decrement trial count
    trialCount--;
    // update progress bar
    $("#progressBar").width((1 - trialCount / numTrials) * 100 + "%");
    // reset time variables
    t0 = null;
    displayFrame = null;
    tf = null;
}

function betweenTrials() {
    // stop video
    video.video.pause();
    $("#video").off("ended");
    // hide video
    $("#video").hide();
    // set trial status
    trialActive = false;
    // get trial end time
    tf = new Date().getTime();
    // get correctness
    if (currentTrialArray[4]=="ACheck"){
        if (inputKey == 1) {
            correctness = Object_1 == "S";
        } else if (inputKey ==2){
            correctness = Object_1 == "B";}
    }else{
    if ((targetType == "Snake1Ball2" && inputKey == 1) || (targetType == "Snake2Ball1" && inputKey == 2)) {
        correctness = Object_2 == "S";
    } else {
        correctness = Object_2 == "B";
    }}
    // set tooSlow
    tooSlow = false;
    // get congruence
    congruence = (Object_1 == "S" && Object_2 == "B") || (Object_1 == "B" && Object_2 == "S");
  
    // record trial
    response.push(new Trial(subjectID, browser, ScoopColor, CupConfiguration, Start, Object_1, Object_2, PredValue, congruence, startTime, endTime, inputKey, targetType, correctness, tooSlow, numTrials - trialCount, tf - t0, 1000/60 * (currentFrame - displayFrame), feedback));
    // decrement trial count
    trialCount--;
    // update progress bar
    $("#progressBar").width((1 - trialCount / numTrials) * 100 + "%");
    // reset time variables
    t0 = null;
    displayFrame = null;
    tf = null;
      // display feedback
    if (correctness) {
        $("#feedbackBar").show();
        $("#feedbackBar").css("background-color", "palegreen");
        $("#feedbackBarText").text("Well done");
     setTimeout(function () {
        move();
    }, betweenTrialTime);    
    } else {
        $("#feedbackBar").show();
        $("#feedbackBar").css("background-color", "lightpink");
        $("#feedbackBarText").text("Incorrect");  
    // update start button
    $("#instructionsBarText").text("");
    $("#startButton").show();
    $("#startButton").attr("onclick", "startTrials()");
    $("#startButton").html("Continue");
    }
}

function showEndPage() {
    $("#topDisplay").text("Done");
    $("#feedbackBar").hide();
    $("#instructionsBarText").text("Describe any problems and click 'Submit'");
    $("#feedbackBox").show();
    $("#startButton").show();
    $("#startButton").attr("onclick", "postData()");
    $("#startButton").html("Submit");
    $("#instructions").show();
    $("#instructions").text("Thank you!\r\nPlease let us know if you had any problems or confusion while completing this task");
}

function postData() {
    // update final participant stats in last trial of response
    feedback = $("#feedbackBox").val();
    endTime = new Date();
    response[numTrials - 1].feedback = feedback;
    response[numTrials - 1].endTime = endTime;
    // get data string from response array
    var dataString = JSON.stringify(response);
    // post response to server
    $.post("logTrial.py", {
        subjectID: subjectID,
        dataString: dataString
    });
    $("#feedbackBox").hide();
    $("#startButton").hide();
    $("#container").hide();
    $("#progressFrame").hide();
    $("#instructions").text("Thank you - the password is CAZ5G980");
}
