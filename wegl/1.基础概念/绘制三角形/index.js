"use strict";

function createShader(gl, type, source) {
    var shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    var sucess = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

    if (sucess) return shader;
}

function createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    var sucess = gl.getProgramParameter(program, gl.LINK_STATUS);

    if (sucess) return program;
}

function main() {
    // get webgl context
    var canvas = document.querySelector('#c');
    var gl = canvas.getContext('webgl');

    if (!gl) return;

    // get strings for our GLSL shaders
    var vertexShaderSource = `
        attribute vec4 a_position;

        void main() {
            gl_Position = a_position;
        }
    `;
    var fragmentShaderSource = `
        precision mediump float;

        void main() {
            gl_FragColor = vec4(1, 0, 0.5, 0.8);
        }
    `;
    // create GLSL shaders, upload the GLSL source, compile the shaders
    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    // link the two shaders into a program
    var program = createProgram(gl, vertexShader,fragmentShader );
    
    // look up where the vertex data needs to go
    var positionAttributeLocation = gl.getAttribLocation(program, 'a_position');

    // create a buffer an put three 2d clip space points in it
    var positionBuffer = gl.createBuffer();
    // bind it to ARRAY_BUFFER ( think of it as ARRAY_BUGGER = positionBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    var positions = [
        0,0,
        0,0.5,
        0.7,0
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    webglUtils.resizeCanvasToDisplaySize(gl.canvas);

    // tell webgl how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // tell it to use our program (pair of shaders)
    gl.useProgram(program);

    //  turn on the attribute
    gl.enableVertexAttribArray(positionAttributeLocation);

    // bind the position buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2; // 2 compoents per iteration
    var type = gl.FLOAT; // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0; // start at the beginning of the buffer

    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

    // draw
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 3;
    gl.drawArrays(primitiveType, offset, count);

}

main();