### attribute

- 只用于顶点着色器中，用来存储每个顶点的输入
- 通常用来存储位置坐标，法向量，纹理坐标，和颜色等

### gl_Position

- webgl内置变量，标识最终传入片元着色器光栅化要用的顶点坐标
- gl_Position 值为四维向量vec4(x, y, z, w) 第四个参数为浮点数，默认为1.0

### gl_FragColor

- webgl内置变量, 用来绘制像素的颜色
- gl_FragColor 值为四维向量vec4(r, g, b, a), 前三个表示颜色RGB, 第四个参数表示透明度

### precision
  
- 设置数据精度，有lowp, mediump, hightp 三种精度
- 片元着色器中的 precision mediump float; 表示在此着色其中所有的浮点数都为中等精度

### gl.createBuffer()

- 