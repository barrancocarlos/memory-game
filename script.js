//global variables

var clickedArray = [];
var interval;
var started = false;
var time = 0;
var ready = true;
var numCompleted = 0;


//run main function

setUp();


//function definitions


//shuffle numbers
function randomAnswers() {
    var answers = [1, 1, 2, 2, 3, 3, 4, 4, 5];

    answers.sort(function(item) {
        return 0.5 - Math.random();
    });
    return answers;
}

//show tile after click
function reveal(cell) {
    cell.style.backgroundColor = "#3a739a";
    cell.innerHTML = cell.value;
    cell.clicked = true;
}

//hide wrong tile
function hide(cell) {
    cell.style.backgroundColor = "#48b0f7";
    cell.innerHTML = "";
    cell.clicked = false;
}

//show correct tile
function complete(cell) {
    numCompleted++;
    cell.completed = true;
    cell.style.backgroundColor = "#3a739a";
}

//timer
function startTimer() {
    if (started == false) {
        interval = setInterval(function() {
            time++;
            document.getElementById("timer").innerHTML = time;
        }, 1000);
        started = true;
    }
}


//main
function setUp() {

    //restart button
    document.getElementById('restart').addEventListener('click', function() {
        location.reload();
    });

    //add values to tiles
    var grid = document.getElementsByTagName("td");
    var answers = randomAnswers();

    for (i = 0; i < grid.length; i++) {
        var cell = grid[i];

        cell.completed = false;
        cell.clicked = false;
        cell.value = answers[i];

        //mouse hover enter
        cell.addEventListener("mouseenter", function() {
            if (this.completed == false && this.clicked == false)
                this.style.background = "orange";
        });

        //mouse hover exit
        cell.addEventListener("mouseleave", function() {
            if (this.completed == false && this.clicked == false)
                this.style.background = "#48b0f7";
        });

        //click event
        cell.addEventListener('click', function() {
            if (ready == false)
                return;
            startTimer();
            if (this.clicked == false && this.completed == false) {
                clickedArray.push(this);
                reveal(this);
            }

            //compare results
            if (clickedArray.length == 2) {

                if (clickedArray[0].value == clickedArray[1].value) {
                    //if a matching pair is found
                    complete(clickedArray[0]);
                    complete(clickedArray[1]);

                    clickedArray = [];
                    //win game
                    if (numCompleted == 8) {
                        alert("You won in " + time + " seconds!");
                        clearInterval(interval);
                    }

                } else {
                    //if a matching pair is not found
                    ready = false;
                    document.getElementById("gridTable").style.border = "5px solid red";

                    setTimeout(function() {
                        //after a 500ms delay
                        hide(clickedArray[0]);
                        hide(clickedArray[1]);

                        clickedArray = [];

                        ready = true;
                        document.getElementById("gridTable").style.border = "white";

                    }, 500);


                }

            }


        });


    }


}
