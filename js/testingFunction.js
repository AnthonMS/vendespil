function imageIdClick(imgId) {
    //alert(imgId);

    var startStopBtn = document.getElementById("startStop");
    if (startStopBtn.innerHTML == "Stop Spil") {
        // The game has been started, so it is here the game logic should be.
        //alert(imgId + " - " + getRandomPicNo());
        var randomInt = getRandomPicNo();
        //alert("" + randomInt);

        if (checkNumber == false) {
            // The random number is not found in the array
            var arrayLength = numberArray.length;
            numberArray[arrayLength] = randomInt;
            document.getElementById("pointP").innerHTML = "";

            for (i = 0; i < numberArray.length; i++) {
                document.getElementById("pointP").innerHTML += " " + numberArray[i];
            }
        } else {
            // Number is found in the array
            // checkNumber back to false.
            checkNumber = false;
        }
    }
    else if (startStopBtn.innerHTML == "Start Spil") {
        // The game has not yet been started
    }
}



function getRandomPicNo()
{
    // get a random number 1,2,3,4,5,6,7,8
    var tempInt = Math.floor(Math.random() * 8)
    tempInt = tempInt + 1;
    //alert("" + tempInt);

    // Go through numberArray to check if it already holds the random number
    for (i = 0; i < numberArray.length; i++) {
        var number = numberArray[i];
        //alert("" + number);
        if (tempInt == numberArray[i]) {
            // The random number is already found in array
            checkNumber = true;
        } else {
            // The random number is NOT found in the array
            //checkNumber = false;
        }
    }

    alert(tempInt + " " + numberArray.length + " " + checkNumber);
    //alert("" + tempInt);

    return tempInt;
}


function imageIdClick2(imgId) {
    //alert(imgId);

    var startStopBtn = document.getElementById("startStop");
    if (startStopBtn.innerHTML == "Stop Spil") {
        // The game has been started, so it is here the game logic should be.
        //alert(imgId + " - " + getRandomPicNo());
        //alert("Testing");
        var randomNo = getRandomNo();
        //alert("" + randomNo);

        if (numberOfTurnedImg == 0) {
            numberOfTurnedImg = 1;
            document.getElementById(imgId).src = "images/" + randomNo + ".jpg";
            imgIdArray[0] = imgId;
            numberArray[0] = randomNo;
        } else if (numberOfTurnedImg == 1) {
            numberOfTurnedImg = 2;
            document.getElementById(imgId).src = "images/" + randomNo + ".jpg";
            imgIdArray[1] = imgId;
            numberArray[1] = randomNo;

            if (numberArray[0] == numberArray[1]) {
                // The same picture!!
                //alert("The same picture!!!");
                document.getElementById("pointP").innerHTML += 1;
            }

        } else if (numberOfTurnedImg > 1) {
            for (i = 0; i < imgIdArray.length; i++) {
                document.getElementById(imgIdArray[i]).src = "images/grey.jpg";
            }
            numberOfTurnedImg = 0;
        }


    }
    else if (startStopBtn.innerHTML == "Start Spil") {
        // The game has not yet been started
    }
}

function getRandomNo()
{
    // get a random number 1,2,3,4,5,6,7,8
    var randomNo = Math.floor(Math.random() * 8)
    randomNo = randomNo + 1;
    //alert("" + randomNo);

    return randomNo;
}
