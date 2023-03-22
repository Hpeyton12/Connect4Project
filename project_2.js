var gl; // link to what we are drawing on
var canvas;
var numPositions = 5000; //number of positions for the color. 
var positions = []; // array of points
var Ydirection = 0; //default y direction is 0, so that when the puck is dropped this will change to -1. 
var colorpick = 0; //colorchoice for each puck. [1] for player1 and [2] for player2.
var goingY = false;
var yShift = 0.0; //we will use yShift, as on gasketAnimate modified hw assignment, except the pucks will only go down and stop.
var xCenterOfCircle;
var yCenterOfCircle;
var centerOfCircle;
var radiusOfCircle = 200;
var ATTRIBUTES = 2;
var noOfFans = 80;
var anglePerFan;
var verticesData = []
var colors = [
    vec4(0.0, 0.0, 0.0, 1.0), // black
    vec4(1.0, 0.0, 0.0, 1.0), // red
    vec4(0.0, 0.0, 1.0, 1.0), // blue
];
var c = []; //color being used for each point. 

//possible wins does not need a particular order. Do if(playerdeck.contains(possible_wins)) to check, iterate through each array in possible wins. 
var possible_wins = [
/*rows*/[1,2,3,4],[2,3,4,5],[6,7,8,9],[7,8,9,10],[11,12,13,14],[12,13,14,15],[16,17,18,19],[17,18,19,20],[21,22,23,24],[22,23,24,25],
/*columns*/[1,6,11,16],[6,11,16,21],[2,7,12,17],[7,12,17,22],[3,8,13,18],[8,13,18,23],[4,9,14,19],[9,14,19,24],[5,10,15,20],[10,15,20,25],
/*diagonals*/[4,8,12,16],[9,13,17,21],[5,9,13,17],[10,14,18,22],[6,12,18,24],[1,7,13,19],[7,13,19,25],[2,8,14,20]];

var player1_hand = []; //keep track of the elements in each hand to compare them to possible_wins.
var player2_hand = [];

var r1 = []; //row1
var r2 = []; //row2
var r3 = []; //row3
var r4 = []; //row4
var r5 = []; //row5
var player1Turn = true; //variable used to alternate between player turns
var visibleRules = false; //TO-DO: create a 'rules' button that switches screens to show rules then disappears.

function DisplayNames(){

    if (player1Turn == true){
        document.getElementById("Turn_Status").innerHTML = document.getElementById("p1Name").value + "'s turn";
    }
    else if (player1Turn == false){
        document.getElementById("Turn_Status").innerHTML = document.getElementById("p2Name").value + "'s turn";
    }
}

function checkWin(hand){ //takes parameter hand, checks whether most recent player has a winning combination, then returns true or false.
    if (player1Turn == true){
        hand = hand.sort((a, b) => a - b);
        const includes = possible_wins.some(combination => { return combination.every(number => hand.includes(number));});
        console.log("p1",includes);
        if (includes == true) {
            return true;
        }
    }
    else if (player1Turn == false){
        hand = hand.sort((a, b) => a - b);
        const includes = possible_wins.some(combination => { return combination.every(number => hand.includes(number));});
        console.log("p2",includes);
        if (includes == true) {
            return true;
        }
    }
    else {
        console.log(false);
        return false;
    }
}

function playerHand(loc){   //takes parameter loc, which is the number location on the chart and adds this to player1_hand or 2, based on turn.
    
    if (player1Turn == true){ //player 1 turn
        player1_hand.push(loc); //I can see this being an issue, because this is [] and possible_wins is [[]].
        player1_hand = player1_hand.sort((a, b) => a - b);

        console.log("Player 1 hand:", player1_hand); //for testing purposes... checks what is in player 1 hand after each click
        console.log("Player 2 hand:", player2_hand); //for testing purposes... checks what is in player 2 hand after each click
        
        const Drop1 = document.getElementById("one");
        const Drop2 = document.getElementById("two");
        const Drop3 = document.getElementById("three");
        const Drop4 = document.getElementById("four");
        const Drop5 = document.getElementById("five");

        if (checkWin(player1_hand) == true){ //checks to see if hand has winning row combination 
            console.log("WINNER IN PLAYER HAND FUNCTION 1"); //checks to see if this function is operating properly.
            document.getElementById("Victory_Status").innerHTML = document.getElementById("p1Name").value + " wins!";
            Drop1.style.display = 'none';
            Drop2.style.display = 'none'; 
            Drop3.style.display = 'none'; 
            Drop4.style.display = 'none';
            Drop5.style.display = 'none';
        }
        player1Turn = false;
        DisplayNames();
    }
    else if (player1Turn == false){ //player 2 turn

        player2_hand.push(loc); //I can see this being an issue, because this is [] and possible_wins is [[]].
        player2_hand = player2_hand.sort((a, b) => a - b);

        console.log("Player 1 hand:", player1_hand); //for testing purposes... checks what is in player 1 hand after each click
        console.log("Player 2 hand:", player2_hand); //for testing purposes... checks what is in player 2 hand after each click
        
        const Drop1 = document.getElementById("one");
        const Drop2 = document.getElementById("two");
        const Drop3 = document.getElementById("three");
        const Drop4 = document.getElementById("four");
        const Drop5 = document.getElementById("five");

        if (checkWin(player2_hand) == true){
            console.log("WINNER IN PLAYER HAND FUNCTION 2"); //checks to see if this is working properly
            document.getElementById("Victory_Status").innerHTML = document.getElementById("p2Name").value + " wins!";
            Drop1.style.display = 'none';
            Drop2.style.display = 'none'; 
            Drop3.style.display = 'none';
            Drop4.style.display = 'none';
            Drop5.style.display = 'none';
        } 
        player1Turn = true;
        DisplayNames();
    }
}

function Drop(event){ //Determines which button was pressed, specifically which row, and animates the dropping of the puck. 
    if (event == 1){
        console.log("This is event 1.");
        if (r1.length == 0){
            r1.push(21);
            playerHand(21); //adds 21 to list of occupied spaces for player1 or 2, dependent on if/else if in this function. 
        }
        else if (r1.length == 1){
            r1.push(16);
            playerHand(16);
        }
        else if (r1.length == 2){
            r1.push(11);
            playerHand(11);
        }
        else if (r1.length == 3){
            r1.push(6);
            playerHand(6);
        }
        else if (r1.length == 4){
            r1.push(1);
            playerHand(1);
        }
    }
    else if (event == 2){ 
        console.log("This is event 2.");
        if (r2.length == 0) {
            r2.push(22);
            playerHand(22);
        }
        else if (r2.length == 1) {
            r2.push(17);
            playerHand(17);
        }
        else if (r2.length == 2) {
            r2.push(12);
            playerHand(12);
        }
        else if (r2.length == 3) {
            r2.push(7);
            playerHand(7);
        }
        else if (r2.length == 4) {
            r2.push(2);
            playerHand(2);
        }
    }
    else if (event == 3){
        console.log("This is event 3.");
        if (r3.length == 0) {
            r3.push(23);
            playerHand(23);
        }
        else if (r3.length == 1) {
            r3.push(18);
            playerHand(18);
        }
        else if (r3.length == 2) {
            r3.push(13);
            playerHand(13);
        }
        else if (r3.length == 3) {
            r3.push(8);
            playerHand(8);
        }
        else if (r3.length == 4) {
            r3.push(3);
            playerHand(3);
        }
    }
    else if (event == 4){
        console.log("This is event 4.");
        if (r4.length == 0) {
            r4.push(24);
            playerHand(24);
        }
        else if (r4.length == 1) {
            r4.push(19);
            playerHand(19);
        }
        else if (r4.length == 2) {
            r4.push(14);
            playerHand(14);
        }
        else if (r4.length == 3) {
            r4.push(9);
            playerHand(9);
        }
        else if (r4.length == 4) {
            r4.push(4);
            playerHand(4);
        }
    }
    else if (event == 5){
        console.log("This is event 5.");
        if (r5.length == 0) {
            r5.push(25);
            playerHand(25);
        }
        else if (r5.length == 1) {
            r5.push(20);
            playerHand(20);
        }
        else if (r5.length == 2) {
            r5.push(15);
            playerHand(15);
        }
        else if (r5.length == 3) {
            r5.push(10);
            playerHand(10);
        }
        else if (r5.length == 4) {
            r5.push(5);
            playerHand(5);
        }
    }
}

function drawgrid(){ //draws a 5x5 grid on page loadup
    colorpick = 0;
    var temp = 0;
    while (temp < 5000){
    c.push(colors[colorpick]);
    temp++;
    }
    var vgrid = new Float32Array([-0.6,-1 , -0.6,1 , -0.2,-1 , -0.2,1 , 0.2,-1 , 0.2,1 , 0.6,-1 , 0.6,1 ,
    -1,-0.6 , 1,-0.6 , -1,-0.2 , 1,-0.2 , -1,0.2 , 1,0.2 , -1,0.6 , 1,0.6]);
    positions.push(vgrid);

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0); // clear color then make canvas white to start

    var program = initShaders(gl, "vertex-shader", "fragment-shader"); //compiles shaders
    gl.useProgram(program);

    // load data into GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId); // What comes next should affect bufferId
    gl.bufferData(gl.ARRAY_BUFFER, flatten(positions), gl.STATIC_DRAW);

    // tie aPosition to the data in the buffer
    var aPosition = gl.getAttribLocation(program, "aPosition"); // connect to variable in shader
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0); // describing positions in the array
    gl.enableVertexAttribArray(aPosition);

    // load data into GPU
    var bufferColorId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferColorId); // what comes next should affect bufferId
    gl.bufferData(gl.ARRAY_BUFFER, flatten(c), gl.STATIC_DRAW);

    // tie color info to the data in the buffer
    var aColor = gl.getAttribLocation(program, "aColor"); // connect to variable in shader
    gl.vertexAttribPointer(aColor, 4, gl.FLOAT, false, 0, 0); // describing positions in array
    gl.enableVertexAttribArray(aColor);

    vgridrender();
    positions = []; //clear positions and c to be used by other functions.
    c = []
}

window.onload = function init() {
    canvas = document.getElementById("gl-canvas"); // get link to canvas
    gl = canvas.getContext("webgl2"); // get context for drawings

    var Drop1 = document.getElementById("one"); //event Listeners for each of the buttons to get their value (1-5) as an event.
    Drop1.addEventListener("click", function(){Drop(Drop1.value)});

    var Drop2 = document.getElementById("two");
    Drop2.addEventListener("click", function(){Drop(Drop2.value)});

    var Drop3 = document.getElementById("three");
    Drop3.addEventListener("click", function(){Drop(Drop3.value)});

    var Drop4 = document.getElementById("four")
    Drop4.addEventListener("click", function(){Drop(Drop4.value)});

    var Drop5 = document.getElementById("five");
    Drop5.addEventListener("click", function(){Drop(Drop5.value)});

    const start = document.getElementById('submit');
    const p1Name = document.getElementById("p1Name");
    const p2Name = document.getElementById("p2Name");
    const p1txt = document.getElementById("p1txt");
    const p2txt = document.getElementById("p2txt");
    const restart = document.getElementById("restart");

    const centerX = document.getElementById("centerX");
    const centerY = document.getElementById("centerY");
    const radius = document.getElementById("radius");
    const startAngle = document.getElementById("startAngle");
    const endAngle = document.getElementById("endAngle");
    const anticlockwise = document.getElementById("anticlockwise");

    start.addEventListener('click', () => { start.style.display = 'none', p1txt.style.display = 'none', p2txt.style.display = 'none',
    p1Name.style.display = 'none', p2Name.style.display = 'none', Drop1.style.display = 'inline-block', 
    Drop2.style.display = 'inline-block', Drop3.style.display = 'inline-block', Drop4.style.display = 'inline-block', 
    Drop5.style.display = 'inline-block', restart.style.display = 'inline-block', DisplayNames;});

    if (!gl) { alert("WebGL 2.0 isn't available"); }
    drawgrid();
}

function vgridrender(){ //render function ONLY for the grid. We will use a separate one for the pucks since it can not utilize gl.LINES.
    gl.clear(gl.COLOR_BUFFER_BIT); // completely clear color
    gl.drawArrays(gl.LINES, 0, 16); // draw lines
}

function puckrender(){ //render function ONLY for the pucks.
    gl.clear(gl.CCOLOR_BUFFER_BIT); //completely clear color
    gl.drawArrays(gl.TRIANGLE_FAN, 0, positions.length); //draw pucks
}

function circlerender(){
    function drawCircle()
{
    xCenterOfCircle = -.8;
    yCenterOfCircle = -8;
    centerOfCircle = vec2(-.8,-.8);
    anglePerFan = (.5*Math.PI) / noOfFans;
    verticesData = [centerOfCircle];

    for(var i = 0; i <= noOfFans; i++)
    {
        var index = ATTRIBUTES * i + 1;
        var angle = anglePerFan * (i+1);
        var xCoordinate = xCenterOfCircle + Math.cos(angle) * radiusOfCircle;
        var yCoordinate = yCenterOfCircle + Math.sin(angle) * radiusOfCircle;
        document.write(xCoordinate);
        document.write("\n");
        document.write(yCoordinate);
        var point = vec2(xCoordinate, yCoordinate);
        verticesData.push(point);
   }
}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, verticesData.length/ATTRIBUTES );
}
}
