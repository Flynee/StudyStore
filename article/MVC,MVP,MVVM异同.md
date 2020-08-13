# MVC

> MVC是指视图（View）,控制器（Controller）,模型（Model）
>
> View: 用户界面
>
> Controller: 业务逻辑
>
> Model: 数据保存

## 通信过程

- View传指令到Controller
- Controller完成业务逻辑后，要求Model改变状态
- Model将新的数据发送到View,用户得到反馈

**所有的通信都是单向的**

![MVC](https://www.ruanyifeng.com/blogimg/asset/2015/bg2015020105.png)
**优点：**
- 耦合性低
- 重用性高
- 生命周期成本低
- MVC使开发和维护用户接口的技术含量低
- 可维护性高
- 部署快

**缺点：**

- 不适合小型，中等型应用程序
- 视图和控制器间过于紧密连接
- 视图对模型数据访问效率低




# MVP

> mvp模式将Controller改为Presenter,同时改变了通信方向
>
> View: 用户界面
>
> Presenter: 业务逻辑
>
> Model: 数据保存

## 通信过程

- 各部分通信都是双向的
- View与Model不发生联系，都通过Presebter传递
- View 非常薄，内部没有任何业务逻辑，称为“被动视图”，即没有任何主动性，而Presenter非常厚，所有业务逻辑都在里面

**view<=>Presenter<=>Model各部分双向通信，View与Model不发生联系**

![MVP](https://www.ruanyifeng.com/blogimg/asset/2015/bg2015020109.png)
**优点：**

- 模型和视图完全分离，可以修改视图而不影响模型
- 高效实用模型，因为所有交互都在Presenter
- 一个Presenter可以对应多个视图，而不需要变动逻辑
- 方便单元测试

**缺点：**

- 视图和Presenter交互过于频繁，耦合度高，view变更，Presenter也要变更



# MVVM

> MVVM将Presenter改名为ViewModel，它与MVP基本一致，
>
> 唯一区别：此模式采用双向绑定，View变动，自动反应在ViewModel,反之亦然

![MVVN](F:\Program\vsCode\StudyStore\article\assets\bg2015020110.png)
**优点：**

- 低耦合，视图可独立于model的变化和修改，一个ViewModel可以绑定到不同的View上，当View变化的时候，Model可以不变化，当Model变化的时候，View可以不变
- 可重用性，可以把一些视图逻辑放在ViewModel中，让很多View重用此段视图逻辑
- 独立开发，开发人员可以专注于业务逻辑和数据的开发（ViewModel），设计人员可以专注于页面设计，使用Expression Blend可以很容易设计界面并生成xml代码
- 可测试，界面向来是比较难于测试的，而现在测试可以针对ViewModel来写





作者：旧城tk

链接：https://juejin.im/post/6844903881369976839

来源：掘金

著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。


- 参考文献
  - [阮一峰MVC, MVP,MVVP](https://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html)