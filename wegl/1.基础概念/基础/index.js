
const vertexShaderSource = `
    
    attribute vec4 a_position;

    void main() {

        gl_Position = a_position;
    }

`;
const fragmentShaderSource = `
    precision mediump float;

    void main() {
        gl_FragColor = vec4(1, 0, 0.5, 1);
    }
`;

function createShader(gl, type, source) {

    const shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.complieShader(shader);

    const sucess = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

    if (sucess) {
        return shader;
    }

    gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {

    const program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    const sucess = gl.getProgramParameter(program, gl.LINK_STATUS);
    
    if (sucess) {
        return program;
    }

    gl.deleteProgram(program);
}

function main() {

    // 1.初始化画布，获取webgl 实例
    const canvas = document.querySelector('#canvas');
    const gl = canvas.getContext('webgl');
    
    if (!gl) {
        return;
    }

    // 2. 创建 顶点着色器和片元着色器
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    // 3. 根据 vertexShader 和 fragmentShader 创建 program
    const program = createProgram(gl, vertexShader, fragmentShader);

    // 4. 在 program 中寻找顶点着色器中参数的 内存位置, 以便后续数据填充
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');

    
}