// Public variable declaration
var imgPosArray1 = [];
var imgPosArray2 = [];
var numberOfTurnedImg = 0;
var turnedImgArray = [];
var twoImg = [];
var samePics = false;
var imgPosCombArray = [];

function myFunction()
{
    var startStopBtn = document.getElementById("startStop");
    if (startStopBtn.innerHTML == "Start Spil") {
        startStopBtn.innerHTML = "Stop Spil";
        for (j = 0; j < 2; j++) {
            if (j == 0) {
                for (i = 0; i < 8; i++) {
                    document.getElementsByClassName("turnImg")[i].src = "images/grey.jpg";
                }
            } else {
                for (i = 8; i < 16; i++) {
                    document.getElementsByClassName("turnImg")[i].src = "images/grey.jpg";
                }
            }
        }
        document.getElementById("guideText").innerHTML = "Se om du kan finde dem der matcher!";
        document.getElementById("endTimerP2").innerHTML = "00:00:00";

        // Shuffle the pictures!
        shuffle();
        // Start the timer here!
        setTime("timerP2");

    }
    else if (startStopBtn.innerHTML == "Stop Spil") {
        imgPosArray1 = [];
        imgPosArray2 = [];
        imgPosCombArray = [];
        startStopBtn.innerHTML = "Start Spil";
        var value = 1;
        for (j = 0; j < 2; j++) {
            if (j == 0) {
                for (i = 0; i < 8; i++) {
                    document.getElementsByClassName("turnImg")[i].src = "images/" + (i + 1) + ".jpg";
                }
            } else {
                for (i = 8; i < 16; i++) {
                    document.getElementsByClassName("turnImg")[i].src = "images/" + value + ".jpg";
                    value++;
                }
            }
        }
        document.getElementById("guideText").innerHTML = "Tryk på start for at blande kortene og starte!";
        setTime("endTimerP2");
    }
}

function setTime(stringId)
{
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById(stringId).innerHTML = h + ":" + m + ":" + s;
}


function startTime()
{
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById("overallTimer").innerHTML = h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}

function checkTime(i)
{
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}




function generateNumber()
{
    for (var i = 0; i < 8; i++)
    {
        imgPosArray1.push(i);
        imgPosArray2.push(i);
    }
    function sort(a, b)
    {
        return (Math.random()>0.5)? -1 : 1;
    }
    imgPosArray1.sort(sort);
    imgPosArray2.sort(sort);
}

function shuffle()
{
    //alert("" + generateNumber().sort());
    if (imgPosArray1.length == 0)
    {
        generateNumber();
    }

    var test = "";
    var test2 = "";
    for (i = 0; i < 8; i++) {
        imgPosArray1[i] = imgPosArray1[i] + 1;
        imgPosArray2[i] = imgPosArray2[i] + 1;

        test += " " + imgPosArray1[i];
        test2 += " " + imgPosArray2[i];
    }
    //alert(test + " " + test2);

    for (i = 0; i < imgPosArray1.length; i++) {
        var storedImgPos = imgPosArray1[i];

        imgPosCombArray.push(imgPosArray1[i]);
        imgPosCombArray.push(imgPosArray2[i]);
    }
    var test3 = "";
    for (i = 0; i < imgPosCombArray.length; i++) {
        test3 += " " + imgPosCombArray[i];
    }

    //alert(test + " - " + test2 + "\n" + test3);


}




function imageIdClick(imgId) {
    //alert(imgId);

    var startStopBtn = document.getElementById("startStop");
    if (startStopBtn.innerHTML == "Stop Spil") {
        // The game has been started, so it is here the game logic should be.

        var clickedImg = document.getElementById(imgId);
        // if Image is grey
        if (clickedImg.src.indexOf("grey") != -1) {
            // if number of turned images is lower than 2
            if (numberOfTurnedImg < 2)
            {
                switchCaseFunc(imgId);

                var tempString = twoImg[1];
                if (tempString != undefined) {
                    //alert(twoImg[0] + " " + twoImg[1]);
                    if (twoImg[0] == twoImg[1]) {
                        //alert(twoImg[0] + " Equal " + twoImg[1]);
                        // The two turned pictures are the same
                        samePics = true;
                        // Add 1 point to the score here!
                        //alert("You found a match!");
                        document.getElementById("matchBoo").innerHTML = "true";
                        var points = document.getElementById("pointP2").innerHTML;
                        //alert(points.innerHTML);
                        points = parseInt(points);
                        points = points + 1;
                        document.getElementById("pointP2").innerHTML = "" + points;
                        if (points == 8) {
                            // You've won!
                            setTime("endTimerP2");
                            document.getElementById("startStop").innerHTML = "Start Spil";
                            document.getElementById("gameStatus").innerHTML = "Du fandt alle de matchende billeder!";
                            document.getElementById("gameStatus").style.color = "green";
                            document.getElementById("guideText").innerHTML = "Du fandt dem alle! Tryk start for at prøve igen!"
                            imgPosArray1 = [];
                            imgPosArray2 = [];
                            imgPosCombArray = [];
                        }

                        //numberOfTurnedImg = 0;
                        //twoImg = [];
                        //samePics = false;
                    } else {
                        //alert("Not a match!");
                        setTimeout(function () {
                           //alert("Hello");
                            if (samePics != true)
                            {
                                document.getElementById(turnedImgArray[0]).src = "images/grey.jpg";
                                document.getElementById(turnedImgArray[1]).src = "images/grey.jpg";
                                document.getElementById("matchBoo").innerHTML = "false";
                            }
                            turnedImgArray = [];
                            numberOfTurnedImg = 0;
                            twoImg = [];
                            samePics = false;
                        }, 500);
                    }
                }
            }
            // else the numberOfTurnedImg = 2 or above
            else
            {
                if (samePics != true)
                {
                    document.getElementById(turnedImgArray[0]).src = "images/grey.jpg";
                    document.getElementById(turnedImgArray[1]).src = "images/grey.jpg";
                    document.getElementById("matchBoo").innerHTML = "false";
                }
                turnedImgArray = [];
                numberOfTurnedImg = 0;
                twoImg = [];
                samePics = false;
            }
        }
        // NOT grey, meaning picture is clicked.
        else
        {

            if (numberOfTurnedImg > 1)
            {
                if (samePics != true)
                {
                    document.getElementById(turnedImgArray[0]).src = "images/grey.jpg";
                    document.getElementById(turnedImgArray[1]).src = "images/grey.jpg";
                }
                turnedImgArray = [];
                numberOfTurnedImg = 0;
                twoImg = [];
                samePics = false;
            }
        }

    }
    else if (startStopBtn.innerHTML == "Start Spil") {
        // The game has not yet been started
    }


}
















function switchCaseFunc(imgId)
{
    switch (imgId)
    {
        case "turnImgLT":
            //alert("Tester");
            document.getElementById(imgId).src = "images/" + imgPosCombArray[0] + ".jpg";
            numberOfTurnedImg = numberOfTurnedImg + 1;
            turnedImgArray.push(imgId);
            twoImg.push(imgPosCombArray[0]);
            break;
        case "turnImgId":
            document.getElementById(imgId).src = "images/" + imgPosCombArray[1] + ".jpg";
            numberOfTurnedImg = numberOfTurnedImg + 1;
            turnedImgArray.push(imgId);
            twoImg.push(imgPosCombArray[1]);
            break;
        case "turnImgId2":
            document.getElementById(imgId).src = "images/" + imgPosCombArray[2] + ".jpg";
            numberOfTurnedImg = numberOfTurnedImg + 1;
            turnedImgArray.push(imgId);
            twoImg.push(imgPosCombArray[2]);
            break;
        case "turnImgRT":
            document.getElementById(imgId).src = "images/" + imgPosCombArray[3] + ".jpg";
            numberOfTurnedImg = numberOfTurnedImg + 1;
            turnedImgArray.push(imgId);
            twoImg.push(imgPosCombArray[3]);
            break;
        case "turnImgId3":
            document.getElementById(imgId).src = "images/" + imgPosCombArray[4] + ".jpg";
            numberOfTurnedImg = numberOfTurnedImg + 1;
            turnedImgArray.push(imgId);
            twoImg.push(imgPosCombArray[4]);
            break;
        case "turnImgId4":
            document.getElementById(imgId).src = "images/" + imgPosCombArray[5] + ".jpg";
            numberOfTurnedImg = numberOfTurnedImg + 1;
            turnedImgArray.push(imgId);
            twoImg.push(imgPosCombArray[5]);
            break;
        case "turnImgId5":
            document.getElementById(imgId).src = "images/" + imgPosCombArray[6] + ".jpg";
            numberOfTurnedImg = numberOfTurnedImg + 1;
            turnedImgArray.push(imgId);
            twoImg.push(imgPosCombArray[6]);
            break;
        case "turnImgId6":
            document.getElementById(imgId).src = "images/" + imgPosCombArray[7] + ".jpg";
            numberOfTurnedImg = numberOfTurnedImg + 1;
            turnedImgArray.push(imgId);
            twoImg.push(imgPosCombArray[7]);
            break;
        case "turnImgId7":
            document.getElementById(imgId).src = "images/" + imgPosCombArray[8] + ".jpg";
            numberOfTurnedImg = numberOfTurnedImg + 1;
            turnedImgArray.push(imgId);
            twoImg.push(imgPosCombArray[8]);
            break;
        case "turnImgId8":
            document.getElementById(imgId).src = "images/" + imgPosCombArray[9] + ".jpg";
            numberOfTurnedImg = numberOfTurnedImg + 1;
            turnedImgArray.push(imgId);
            twoImg.push(imgPosCombArray[9]);
            break;
        case "turnImgId9":
            document.getElementById(imgId).src = "images/" + imgPosCombArray[10] + ".jpg";
            numberOfTurnedImg = numberOfTurnedImg + 1;
            turnedImgArray.push(imgId);
            twoImg.push(imgPosCombArray[10]);
            break;
        case "turnImgId10":
            document.getElementById(imgId).src = "images/" + imgPosCombArray[11] + ".jpg";
            numberOfTurnedImg = numberOfTurnedImg + 1;
            turnedImgArray.push(imgId);
            twoImg.push(imgPosCombArray[11]);
            break;
        case "turnImgLB":
            document.getElementById(imgId).src = "images/" + imgPosCombArray[12] + ".jpg";
            numberOfTurnedImg = numberOfTurnedImg + 1;
            turnedImgArray.push(imgId);
            twoImg.push(imgPosCombArray[12]);
            break;
        case "turnImgId11":
            document.getElementById(imgId).src = "images/" + imgPosCombArray[13] + ".jpg";
            numberOfTurnedImg = numberOfTurnedImg + 1;
            turnedImgArray.push(imgId);
            twoImg.push(imgPosCombArray[13]);
            break;
        case "turnImgId12":
            document.getElementById(imgId).src = "images/" + imgPosCombArray[14] + ".jpg";
            numberOfTurnedImg = numberOfTurnedImg + 1;
            turnedImgArray.push(imgId);
            twoImg.push(imgPosCombArray[14]);
            break;
        case "turnImgRB":
            document.getElementById(imgId).src = "images/" + imgPosCombArray[15] + ".jpg";
            numberOfTurnedImg = numberOfTurnedImg + 1;
            turnedImgArray.push(imgId);
            twoImg.push(imgPosCombArray[15]);
            break;
    }
}
































