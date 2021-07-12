"use strict";

function main() {
    var canvas = document.querySelector('#c');
    var gl = canvas.getContext('webgl');

    if (!gl) return;

    // setup GLSL program
    var program = webglUtils.createProgramFromScripts(gl, ['vertex-shader-2d', 'fragment-shader-2d']);

    // look up where the vertex data needs to go
    var positionAttributeLocation = gl.getAttribLocation(program, 'a_position');

    // look up uniform locations
    var resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
    var colorUniformLocation = gl.getUniformLocation(program, 'u_color');

    // create a buffer to put three 2d clip space points in
    var positionBuffer = gl.createBuffer();

    // bind it to ARRAY_BUFFER(think of it as ARRAY_BUFFER = positionBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    webglUtils.resizeCanvasToDisplaySize(gl.canvas);

    // tell webgl how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // tell it ro use our program (pair of shaders)
    gl.useProgram(program);

    // turn on the attribute
    gl.enableVertexAttribArray(positionAttributeLocation);

    // bind the position buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2;
    var type = gl.FLOAT;
    var normalize = false;
    var stride = 0;
    var offset = 0;
    
    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

    // set the resolution
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

    // draw 50 random rectangles in random colors
    for(var ii = 0; ii < 50; ++ii) {
           /**
            * setup a random rectangle 
            * this will write to positionBuffer because
            * its the last thing we bound on the  ARRAY_BUFFER
            * bind point
            */
           setRectangle(gl, randomInt(300), randomInt(300), randomInt(300), randomInt(300 ));

           // set a random color
           gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);

           // draw the rectangle
           var primitiveType = gl.TRIANGLES;
           var offset = 0;
           var count = 6;
           gl.drawArrays(primitiveType, offset, count);
    }
    
}

// return a random integer from 0 to range -1
function randomInt(range) {
    return Math.floor(Math.random() * range);
}

// fill the buffer with the values that define a rectangle
function setRectangle(gl, x, y, width, height) {
    var x1 = x;
    var x2 = x + width;
    var y1 = y;
    var y2 = y + height;

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        x1, y1,
        x2, y1,
        x1, y2,
        x1, y2,
        x2, y1,
        x2, y2
    ]), gl.STATIC_DRAW);
}
main();