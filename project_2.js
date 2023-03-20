var gl; // link to what we are drawing on
var canvas;
var positions = []; // array of points
var colorpick = 0;
var colors = [
    vec4(1.0, 0.0, 0.0, 1.0), // red
    vec4(0.0, 0.0, 1.0, 1.0), // blue
]; // array of colors
var c = [];
var vgrid = new Float32Array([-0.6,-1 , -0.6,1 , -0.2,-1 , -0.2,1 , 0.2,-1 , 0.2,1 , 0.6,-1 , 0.6,1]);

function drawgrid(){

}

window.onload = function init() {
    canvas = document.getElementById("gl-canvas"); // get link to canvas
    canvas.addEventListener("mousedown", drawHouse);
    gl = canvas.getContext("webgl2"); // get context for drawings
    if (!gl) { alert("WebGL 2.0 isn't available"); }
    drawgrid;
}