# 360homework

无任何第三方库写成的“手势密码”应用。2017年360前端星作业（已通过）。

- 原生Js实现SPA
- 完全面向对象设计
- MVVM(MVC)结构
- Canvas绘图
- Nodejs自动构建

```text
    build 构建目录
    dist  释出目录
    src   源码目录
```


项目极力避免webpack依赖，因此哪怕无任何nodejs基础的初学者也依旧可以轻松阅读源码~~

项目中还使用了大量ES6语法，如果你正在学习它，或者阅读项目源码能带给你许些启示。

> 避免webpack意味着：你可以直接双击打开`src`源码目录的`index.html`来运行项目！

> `dist/index.html`兼容性良好，兼容各种移动/PC端浏览器，但`src/index.html`兼容性较差，只有最新的Chrome和Firefox浏览器才可以运行它

## 项目部署

实际上，如果你不打算修改项目并重新编译它，只是想简单的运行，那么**直接双击打开**`dist`或`src`目录的`index.html`即可，无需任何额外的操作！

当然，如果你想修改编译项目，那么你需要首先安装项目依赖包

```
    npm install
```

然后进入`src`目录修改项目源码，改动完毕后运行

```
    npm run build
```

Nodejs会自动将src项目文件打包，更新dist目录文件

> dist目录中文件并不是全部都是使用nodejs编译生成的，所以请不要删除整个dist目录

编译完成后，直接双击打开`dist`目录中的`index.html`即可。

值得一提的是，由于项目极力避免webpack依赖，哪怕是`src`源码目录，你可以直接双击`index.html`运行！

## 功能介绍

### 录入手势密码

点击页面上方`设置密码`标签或进入`URL/!#/set`进入录入手势密码页面。

当绘制至少5个点后，进入`ensure`状态，需要再录入一遍相同的密码确保不会因为手误造成问题。

若第二次录入与第一次不一致，退回最初的录入状态；若与第一次一致则将密码存储在本地localStorage中

### 验证手势密码

点击页面上方`验证密码`标签或进入`URL/!#/verify`进入验证手势密码页面。

### 改变点数

点击页面上方`管理`标签或进入`URL/!#/option`进入管理页面，在点数文本框中可以设置手势密码使用的点数

项目默认使用3*3的点数进行手势密码的捕获。

> 该功能不会影响“验证手势密码”功能

### 查看/清除手势密码

点击页面上方`管理`标签或进入`URL/!#/option`进入管理页面，在“存储的密码”中可以查看当前存储的手势密码。

密码以`-`分割，数字代表点的序号，序号**从0**开始。

点击“清除”按钮可以清除保存的密码。

## 构建技术看点

### 模块化设计

项目采用完全面向对象的模块化，极力避免模块之间的耦合度。

```
    LsPoint         一个点
    LsPointManager  一个点管理器
    LsView          一个展板，包括点和线
    LsApp           一个手势密码捕获应用
```

耦合度极低的模块不仅意味着可十分良好的维护性，还意味着实现一些十分灵活的功能会非常简单，或者说是理所当然。

> 比如：你可以在管理页面中更改手势密码录入的总点数。

### MVVM(MVC)的结构设计

项目整体实际上是一个SPA，构建风格受Vue.js影响较大。

```
    URL/#!/set      密码录入
    URL/#!/verify   验证密码
    URL/#!/option   管理选项
```

由于实现MVVM自动数据绑定成本较大，因此项目的结构风格是类似于MVVM的MVC来避免使用数据绑定。可以看到路由（Controller）部分非常厚，所有的业务逻辑都放在那里。

受Vue.js风格影响，项目拥有健全的路由器和路由表，使用Hash进行SPA路由。

### 组件化设计

项目使用组件化设计，因此你可以看到项目HTML文件`body`元素中只有一个挂载点

```html
    <body>
        <div id="app"></div>
    </body>
```

然后通过js挂载元素

```javascript
    new App({
        el:'#app'
    });
```

项目使用的组件树如下

```
    App 根组件
      LsApp 捕获手势密码组件
      Option 管理选项组件
```

### 自动构建

项目使用Nodejs进行构建，使用Nodejs可以很轻松的做到：

- Js文件打包
- Babel转码
- Js压缩
- SCSS编译
- CSS压缩

你可以使用`npm run build`或直接运行`build/build-dist.js`构建目录

## 一些吐槽

说实话，看到这个作业我的内心几乎是崩溃的。因为，我完全没接触过Canvas绘图......

考虑过用div来写，但是那样实在太......总之就是有种说不出来的别扭，所以最后决定现学一下Canvas绘图，结果意外的发现Canvas绘图其实不难。

从拿到手到写完，大概用了4天的时间。

本来一开始只是打算简单的使用面向过程的写法实现就可以了。可能是Vue写多了的原因，写着写着就把项目写成了MVVM风格的SPA，但是没有Vue强大的数据绑定和组件渲染，更没有路由，又不想用第三方库，一切都要自己实现......

由于一开始不打算使用任何第三方库，所以就没打算过上webpack。结果最后真机调试的时候发现移动端对ES6的支持十分令人捉急，所以临时把项目拆成src和dist，dist用babel转码以保证兼容性。

所以结果就是现在这样，一个简单的手势密码写成了一个应用，光Js代码就近600+行。

## 开源协议

MIT



