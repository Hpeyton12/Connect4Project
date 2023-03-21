var gl; // link to what we are drawing on
var canvas;
var numPositions = 5000;
var positions = []; // array of points
var Ydirection = 1;
var colorpick = 0;
var goingY = false;
var yShift = 0.0;
var colors = [
    vec4(0.0, 0.0, 0.0, 1.0), // black
    vec4(1.0, 0.0, 0.0, 1.0), // red
    vec4(0.0, 0.0, 1.0, 1.0), // blue
];
var c = [];
//possible wins does not need a particular order. Do if(playerdeck.contains(possible_wins)) to check, iterate through each array in possible wins. 
var possible_wins = [
/*rows*/[1,2,3,4],[2,3,4,5],[6,7,8,9],[7,8,9,10],[11,12,13,14],[12,13,14,15],[16,17,18,19],[17,18,19,20],[21,22,23,24],[22,23,24,25],
/*columns*/[1,6,11,16],[6,11,16,21],[2,7,12,17],[7,12,17,22],[3,8,13,18],[8,13,18,23],[4,9,14,19],[9,14,19,24],[5,10,15,20],[10,15,20,25],
/*diagonals*/[16,12,8,4],[21,17,13,9],[17,13,9,5],[22,18,14,10],[6,12,18,24],[1,7,13,19],[7,13,19,25],[2,8,14,20]];

var player1_hand = []; //keep track of the elements in each hand to compare them to possible_wins.
var player2_hand = [];

var player1Turn = true; //variable used to alternate between player turns
var visibleRules = false; //TO-DO: create a 'rules' button that switches screens to show rules then disappears.

function Drop(event){
    if (event == 1){
        console.log("This is event 1.");

    }
    else if (event == 2){
        console.log("This is event 2.");
    }
    else if (event == 3){
        console.log("This is event 3.");
    }
    else if (event == 4){
        console.log("This is event 4.");
    }
    else if (event == 5){
        console.log("This is event 5.");
    }
}

function drawgrid(){
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
    positions = [];
    c = []
}

window.onload = function init() {
    canvas = document.getElementById("gl-canvas"); // get link to canvas
    gl = canvas.getContext("webgl2"); // get context for drawings

    var Drop1 = document.getElementById("one");
    Drop1.addEventListener("click", function(){Drop(Drop1.value)});

    var Drop2 = document.getElementById("two");
    Drop2.addEventListener("click", function(){Drop(Drop2.value)});

    var Drop3 = document.getElementById("three");
    Drop3.addEventListener("click", function(){Drop(Drop3.value)});

    var Drop4 = document.getElementById("four")
    Drop4.addEventListener("click", function(){Drop(Drop4.value)});

    var Drop5 = document.getElementById("five");
    Drop5.addEventListener("click", function(){Drop(Drop5.value)});

    if (!gl) { alert("WebGL 2.0 isn't available"); }
    drawgrid();
}

function vgridrender(){
    gl.clear(gl.COLOR_BUFFER_BIT); // completely clear color
    gl.drawArrays(gl.LINES, 0, 16); // draw lines
}