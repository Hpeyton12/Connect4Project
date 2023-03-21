var gl; // link to what we are drawing on
var canvas;
var positions = []; // array of points
var Ydirection = 1;
var colorpick = 0;
var goingY = false;
var yShift = 0.0;
var colors = [
    vec4(1.0, 0.0, 0.0, 1.0), // red
    vec4(0.0, 0.0, 1.0, 1.0), // blue
    vec4(1.0, 1.0, 0.0, 1.0) //yellow
]; // array of colors

var game;
var player1Turn = true;
var visibleRules = false;

function Drop(event){
    if (event = 1){
        console.log("This is event 1.");
    }
    else if (event = 2){
        console.log("This is event 2.");
    }
    else if (event = 3){
        console.log("This is event 3.");
    }
    else if (event = 4){
        console.log("This is event 4.");
    }
    else if (event = 5){
        console.log("This is event 5.");
    }
}

function drawgrid(){

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

    vgridrender();
    positions = [];
}

window.onload = function init() {
    canvas = document.getElementById("gl-canvas"); // get link to canvas
    gl = canvas.getContext("webgl2"); // get context for drawings
    if (!gl) { alert("WebGL 2.0 isn't available"); }
    drawgrid();

    var Drop1 = document.getElementById("move1").value;
    Drop1.addEventListener("click", Drop);
    var Drop2 = document.getElementById("move2").value;
    Drop2.addEventListener("click", Drop);
    var Drop3 = document.getElementById("move3").value;
    Drop3.addEventListener("click", Drop);
    var Drop4 = document.getElementById("move4").value;
    Drop4.addEventListener("click", Drop);
    var Drop5 = document.getElementById("move5").value;
    Drop5.addEventListener("click", Drop);
}

function vgridrender(){
    gl.clear(gl.COLOR_BUFFER_BIT); // completely clear color
    gl.drawArrays(gl.LINES, 0, 16); // draw lines
}