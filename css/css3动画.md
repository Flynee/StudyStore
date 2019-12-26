# Css3动画

---



## 定时函数

- cubic-bezier(x1, y1, x2, y2)，x1, x2必须在[0, 1]范围内
- steps(2, start), steps(4, end), 参数1是[0, 1]分为几步，参数二是方向，start: 代表从左向右执行，end:代表从右向左执行
- liner 相当于cubic-bezier(0.0, 0.0, 1.0, 1.0)
- ease相当于cubic-bezier(0.25, 0.1, 0.25, 1.0)
- ease-in相当于cubic-bezier(0.42, 0.0, 1.0, 1.0)
- ease-in-out相当于cubic-bezier(0.42, 0.0, 0.58, 1.0)
- ease-out相当于cubic-bezier(0.0, 0.0, 0.58, 1.0)
- step-start相当于steps(1, start)
- step-end相当于setps(1, end)



## animation

 - animation是animation-name, animation-duration, animation-timing-function, animation-delay, animation-iteration-count, animation-direction, animation-fill-mode, animation-play-state 所有属性的简写形式

 - animation可以指定一组或多组动画，每组动画之间用逗号间隔

 - animate-name 属性指定应用的一系列动画，每个名称代表一个由[`@keyframes`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@keyframes)定义的动画序列。

   ``` css
   /* Single animation 
   none
   特殊关键字，表示无关键帧。可以不改变其他标识符的顺序而使动画失效，或者使层叠的动画样式失效*/
   animation-name: none;
   animation-name: test_05;
   animation-name: -specific;
   animation-name: sliding-vertically;
   
   /* Multiple animations */
   animation-name: test1, animation4;
   animation-name: none, -moz-specific, sliding;
   
   /* Global values */
   animation-name: initial
   animation-name: inherit
   animation-name: unset
   
   ```

   

 - animate-delay 表示动画延时开始的时间， 如果指定负值，则起始时元素是隐藏的

   ``` css
   animation-delay: 3s;
   animation-delay: 2s, 4ms;
   ```

   

 - animation-direction 确定动画播放父方向

   ``` css
   /* 每个循环内，动画从头至尾播放，这是默认属性 */
   animation-direction: normal;
   /* 每个循环内动画从尾到头播放 */
   animation-direction: reverse;
   /* 动画交替反向执行，定时函数也会跟随反向执行，比如ease-in 会变成ease-out*/
   animation-direction: alternate;
   /* 先是反向，然后是正向，然后又是反向，然后又是正向，依次执行 */
   animation-direction: alternate-reverse;
   ```

- animation-duration表示动画一个周期的时长，默认值为0s，表示无动画

  ``` css
  /*一个动画的时长，单位可以是秒(s)或者毫秒(ms), 无单位无效*/
  
  animation-duration: 6s;
  animation-duration: 120ms;
  animation-duration: 1s, 15s;
  animation-duration: 10s, 30s, 230ms;
  ```

  

- animation-fill-mode, 动画的填充模式，可以在动画执行结束时显示一帧

  ``` css
  /* Single animation */
  animation-fill-mode: none;
  animation-fill-mode: forwards;
  animation-fill-mode: backwards;
  animation-fill-mode: both;
  
  /* Multiple animations */
  animation-fill-mode: none, backwards;
  animation-fill-mode: both, forwards, none;
  ```

  

- animation-iteration-count 表示动画播放的次数

  ``` css
  /* infinite 表示无限执行 */
  animation-iteration-count: infinite;
  
  /* 值为数字 */
  animation-iteration-count: 3;
  animation-iteration-count: 2.4;
  
  /* 指定多个值 */
  animation-iteration-count: 2, 0, infinate;
  ```



  - animation-iteration-play-state 定义一个动画是否运行或者暂停，可以通过查询它来确定动画是否在正常运行。另外它的值可以被设置为暂停和恢复动画的重放，恢复一个已暂停的动画，将从暂停的位置重放

    ``` css
    /* Single animation */
    animation-play-state: running;
    animation-play-state: paused;
    
    /* Multiple animations */
    animation-play-state: paused, running, running;
    
    /* Global values */
    animation-play-state: inherit;
    animation-play-state: initial;
    animation-play-state: unset;
    ```

    

- animation-timing-function 动画定时函数，控制动画执行速度

   ``` css
/* Keyword values */
animation-timing-function: ease;
animation-timing-function: ease-in;
animation-timing-function: ease-out;
animation-timing-function: ease-in-out;
animation-timing-function: linear;
animation-timing-function: step-start;
animation-timing-function: step-end;

/* Function values */
animation-timing-function: cubic-bezier(0.1, 0.7, 1.0, 0.1);
animation-timing-function: steps(4, end);

/* Steps Function keywords */ 
animation-timing-function: steps(4, jump-start);
animation-timing-function: steps(10, jump-end);
animation-timing-function: steps(20, jump-none);
animation-timing-function: steps(5, jump-both);
animation-timing-function: steps(6, start);
animation-timing-function: steps(8, end);

/* Multiple animations */
animation-timing-function: ease, step-start, cubic-bezier(0.1, 0.7, 1.0, 0.1);

/* Global values */
animation-timing-function: inherit;
animation-timing-function: initial;
animation-timing-function: unset;
   ```

