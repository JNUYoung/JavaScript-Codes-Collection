# Professional Javascript for Web Developers, 4th Edition

[TOC]

## chapter2

**2.4 <noscript>元素**

当浏览器不支持脚本或者浏览器对脚本的支持被关闭的时候，noscript内的内容就会被渲染到页面当中。

------



## chapter3

**3.3 变量**

使用let在全局作用域中声明的变量不会成为window对象的属性。

const优先、let次之，使用const声明可以让浏览器运行时强制保持变量不变，也可以让静态代码分析工具提前发现不合法的赋值操作。

**3.4.1 typeof操作符**

该操作符可以判断六种基本数据类型，function类型以及object类型；

特例：typeof null的结果为object，因为特殊值null被认为是一个对空对象的引用。

【实际上typeof判断是根据变量的值的二进制表示计算的，若前三位均为0，则代表是object类型，null的二进制表示全为0，因此typeof null会得到object】

**3.4.5 Number类型**

js中的number类型使用**<u>IEEE754格式</u>**表示整数和浮点数（双精度值）

- 由于浮点数使用的内存空间是整数的两倍，因此ES会尽量将浮点数转换为整数。
- 浮点数的精确度最高可达17位小数，但在运算中有时并不精确，例如0.1+0.2不等于0.3，而是0.30000000000000004；
- ***Number.MAX_VALUE***记录了可表示的最大值，***Number.MIN_VALUE***记录了可表示的最小值；若数值超过最大值，则会转换为Infinity，若小于最小值，则会转换为-Infinity；可以使用***isFinite()***函数检查一个数值是否有限。
- NaN不等于包括NaN在内的任何值；可以使用***isNaN()***函数判断一个值是否为NaN；

**3.4.6 String类型**

toString方法唯一的用途就是返回当前值的***“字符串等价物”***，null和undefined没有toString方法，但是可以使用String()进行转换。

在对数值调用toString方法时，可以传入一个参数表示输出数值的字符串表示。

```js
let num = 10
num.toString()    // 10
num.toString(2)    // 1010
num.toString(8)    // 12
num.toString(16)    // a
```

**3.4.7 Symbol**

1.使用全局符号注册表

- 如果代码不同部分需要共享或重用一个Symbol实例，可以使用Symbol.for()传入一个字符串作为key，在全局symbol表中创建并重用symbol实例


```js
const globalSymbolInstance = Symbol.for('foo')
const globalSymbolInstance1 = Symbol.for('foo')
const symbolnstance = Symbol('foo')

console.log(globalSymbolInstance == globalSymbolInstance1)  // true, 共用一个实例
console.log(globalSymbolInstance == symbolnstance)   // false
```

2.用作对象属性

- Object.getOwnPropertyNames() 返回对象实例的常规属性数组
- Object.getOwnPropertySymbols() 返回对象实例的symbol属性数组
- Object.getOwnPropertyDescriptors() 返回常规属性和symbol属性描述符的对象
- Reflect.ownKeys() 返回两种类型的key【反射API，通常配合proxy使用】

**3.5 位操作符**

负数的二进制编码存储：

1. 确定其绝对值的二进制表示（例如对于-18，先确定18的二进制表示）
2. 对绝对值的二进制表示计算其反码；（0变为1，1变为0）
3. 得到的反码 + 1

**1.按位非 ~**

```js
let num1 = 25
let num2 = ~num1
console.log(num2)    // -26

// 对数值取反并减1
```

**2.按位与 &**

```js
let result = 25 & 1
```

**3.按位或 |**

**4.按位异或 ^**

不相等时得到1，相等得到0

![image](https://github.com/JNUYoung/JavaScript-Codes-Collection/blob/main/imgs/image-20230219160703338.png)

**5.左移<<    右移>>**

**3.5.11 逗号操作符**

逗号操作符可以用来在一条语句中执行多个操作，如下的变量声明和赋值语句

```js
let num1 = 1, num2 = 2, num3 = 3;
```

※ ※ 也可以使用逗号操作符来辅助赋值，***赋值时使用逗号操作符分隔值，最终返回表达式中最后一个值***。

```js
let num = (1, 2, 3, 4, 0)
console.log(num)    // 0
```

**3.6.9 with语句**【扩展作用域链 - 谨慎使用，可以使用一个局部变量来保存引用，减少对于作用域链较前端的对象属性或方法的访问】

with语句的用途是将代码作用域设置为特定的对象。如下所示：

```js
// 原始写法
let qs = location.search.substring(1)
let hostName = location.hostname
let url = location.href

// 使用with的写法
with (location) {
    // 会先查找是否有局部search变量，如果没有，则向上延作用域链先找with指定的对象上是否有该属性
    let qs = search.substring(1)
    let hostName = hostname
    let url = href
}
```

------



## chapter4-变量-作用域-内存

**4.1 typeof 和 instanceof**

判断一个值是否为null类型

```js
function isNull(x) {
	return !x && typeof x !== 'undefined' && x !== 0
}
```

**4.2.2 变量声明**

- let声明的变量，不能再重复进行声明；
- const声明常量的同时必须初始化；
- const声明表示变量的值是单一且不可修改的，**<u>*JS运行时编译器就可以将所有的常量都替换为对应的值，而不会通过查询表进行变量查找*</u>**。v8引擎就执行了这种优化。【p93】

**※ 4.3.3 垃圾回收的性能**

js的垃圾回收**周期性**地进行，如果内存中分配了很多变量，则可能造成性能损失。

因此，垃圾回收的***时间调度***非常重要。

最好的办法：***写代码时就要做到，无论什么时候开始收集垃圾，都能让它尽快结束工作。***



- **IE7之前的垃圾回收程序的调度 - 静态分配**

根据分配数进行调度，若分配了256个变量、4096个对象字面量/数组字面量/数组槽位，或者64KB字符串，则垃圾回收程序就会运行

但是，如果在程序运行过程中始终需要这么多变量，那么垃圾回收程序就会不断地执行。

- **在IE7之后，垃圾回收程序的调度被修改为动态确定**

例如，如果一次垃圾回收时，仅回收了不到15%的内存空间，那么说明大部分内存空间都是需要继续使用的，因此触发垃圾回收的阈值就会翻倍。相反，如果一次垃圾回收回收了大部分内存空间，那么阈值就会变为默认值。【保证垃圾回收程序以最合适的频率进行调用】



**※ 4.3.4 内存管理【p97】**

1. 使用let和const关键字；
2. ***隐藏类***和删除操作 ？？
3. 内存泄漏问题；
4. 静态分配与对象池；

------



## chapter5-基本引用类型

**5.1 Date类型**

Date类型的valueOf方法会返回该日期实例的毫秒表示，进而可以比较两个日期的前后顺序。

```js
if (date1 < date2) {}

// 这里 < 操作符会直接使用date1调用valueOf方法返回的值
```

**5.2 RegExp类型**

**5.3 原始值包装类型 Boolean, Number, String**

每当用到某个原始值的方法或属性时，后台都会创建一个相应原始包装类型的对象，从而暴露出操作原始值的各种方法。这也是为什么能够直接在基本数据类型上调用方法的原因。

**检查整数的方法、安全整数**

```js
Number.isInteger()

Number.MIN_SAFE_INTEGER
Number.MAX_SAFE_INTEGER
Number.isSafeInteger()
```

**5.3.3 String**

**※ 字符串截取操作**

- slice()：第一个参数表示截取的起始位置，第二个参数表示截取的终止位置（若为空表示截取到末尾）【前闭后开】
- substring()：与slice类似
- substr()：第一个参数表示起始位置，第二个参数表示截取长度

**※ 上述三个方法若传入的参数为 负数 时，会表现出很大的区别**

- slice方法会将负数转换为 “传入的负数 + 字符串的长度”
- substring方法会将所有负参数转换为0；
- substr方法会将第一个负参数加上字符串长度，第二个负参数转换为0；

![image-20230220202333044](https://github.com/JNUYoung/JavaScript-Codes-Collection/blob/main/imgs/image-20230220202333044.png)

**5.4 单例内置对象**

**※ 5.4.1 Global**

ES规范规定Global对象为一种兜底对象，它所针对的是不属于任何对象的属性和方法。事实上并不存在全局变量或全局函数，在全局作用域中定义的变量或函数都会变成Global对象的属性。

**1.URL编码方法**

![image-20230220203018242](https://github.com/JNUYoung/JavaScript-Codes-Collection/blob/main/imgs/image-20230220203018242.png)

- encodeURL()对uri进行编码
- encodeURLComponent()会编码所有的非标准字符

**2.URL解码方法**

![image-20230220203139421](https://github.com/JNUYoung/JavaScript-Codes-Collection/blob/main/imgs/image-20230220203139421.png)

------



## chapter6-集合引用类型

**6.2 Array类型**

- Array.from()


```js
// Array.from可以将类数组对象转换为真正的数组
// 第一个参数表示要转换的对象
// 第二个参数可以是一个类似于Array.prototype.map的映射函数
// 第三个参数是第二个参数的this绑定
Array.from([1, 2, 3, 4], () => x**this.exponent, {exponent: 2})    // [1, 4, 9, 16]
```

- **数组的sort方法**

默认情况下，sort函数会按照升序重新排列数组。***在排列的过程中，会在数组每一项上调用String()转型函数，将每个元素都转换为字符串类型再进行大小比较***。

因此，使用sort函数时，需要传入一个比较函数 CompareFunc。

- **数组的splice方法**

```javascript
const arr = [1, 2, 3]

// splice方法
// 删除元素 arr.splice(起始位置，删除数目)
// 插入元素 arr.splice(起始位置，0，插入元素)
// 替换元素 arr.splice(起始位置，删除数目，添加元素)
```

- **严格相等的数组元素查找方法**

1. indexOf()
2. lastIndexOf()
3. includes()

**按照定义的断言函数搜索数组 p152**

```js
// find()    findIndex()
const people = [
    {
        name: 'aaa',
        age: 20
    },
    {
        name: 'bbb',
        age: 18
    }
]
people.find((element, index, arr) => element.age <= 18)
// {name: 'bbb', age: 18}
people.findIndex((element, index, arr) => element.age <= 18)
// 1

// 这两个方法找到匹配项后，都不会再继续搜索
```

------



## chapter12 -BOM

### 1.window对象

1.3 窗口位置和像素比

通过window对象的**<u>screenLeft</u>**和**<u>screenTop</u>**属性，可以获得窗口相对于屏幕左侧和顶部的位置。

window.moveTo(x, y) 和 window.moveBy(x, y)方法可以移动窗口位置【chrome上不起作用】

1.4 窗口大小

window.innerWidth, window.innerHeight 返回浏览器窗口中页面视口的宽高；

window.outerWidth, window.outerHeight 返回浏览器窗口的宽高；

window.resizeTo(x, y) 窗口宽度和高度缩放到多大

window.resizeBy(x, y) 窗口宽度和高度缩放多少

1.5 视口位置

用户上下或者左右滚动滚动条时，度量文档相对于视口滚动距离的属性有两对：

- **<u>window.scrollX / window.scrollY</u>**
- **<u>window.pageXoffset / window.pageYoffset</u>**

同时还提供了方法通过js来执行页面的滚动操作：

- window.scrollTo(0, 0)：滚动到页面左上角【点击回到顶部】
- window.scrollBy(100, 1000)：向左滚动100像素，向下滚动1000像素

上述方法还可以接收一个选项对象，通过对象的形式设置x和y以及***滚动的行为模式***：

```js
// 正常滚动
window.scrollTo({
    x: 0,
    y: 0,
    behaviour: 'auto'
})

// 平滑滚动
window.scrollTo({
    x: 0,
    y: 0,
    behaviour: 'smooth'
})
```

1.6 导航与打开新窗口

window.open()打开新窗口

- 第一个参数：新窗口的url
- 第二个参数：打开的目标窗口（_self, _blank, _parent, _top）
- 第三个参数：特性字符串，指定新打开的窗口包含的特性。例如是否全屏、窗口大小等；

```js
// 示例
window.open('https://www.baidu.com', '_blank', 'height=400,width=400,top=10,left=10,resizable=yes')
```

***window.open()方法返回新创建的窗口的引用***，因此可以使用js对新打开的窗口进行后续操作。

**1.7 ※ 定时器**

- setTimeout(callback, delay)    -    clearTimeout()  

  > ※ 所有setTimeout中的函数都会在全局作用域中的一个匿名函数中运行，因此函
  >
  > 数中的 this 值在非严格模式下始终指向 window，而在严格模式下是 undefined。如果
  >
  > 给 setTimeout()提供了一个箭头函数，那么 this 会保留为定义它时所在的词汇作用域。

- setInterval(callback, timeInterval)  - clearInterval()

  > ※ 这里的关键点是，第二个参数，也就是间隔时间，指的是向队列添加新任务之前等
  >
  > 待的时间。比如，调用 setInterval()的时间为 01:00:00，间隔时间为 3000 毫秒。这意
  >
  > <u>*味着 01:00:03 时，浏览器会把任务添加到执行队列。**浏览器不关心这个任务什么时候执行***</u>
  >
  > <u>***或者执行要花多长时间**。因此，到了 01:00:06，它会再向队列中添加一个任务。由此可看*</u>
  >
  > 出，执行时间短、非阻塞的回调函数比较适合 setInterval()。

1.8 系统对话框

- alert() 

- confirm() 确认对话框，其返回值为布尔值

  ```js
  if (confirm('are you sure')) {
      console.log('yes')
  } else {
      console.log('no')
  }
  ```

- prompt() 提示用户输入信息，其包含两个参数。第一个参数是展示给用户的提示信息，第二个参数是输入框的默认值。该方法返回用户输入在文本框中的内容

### 2.location对象

location对象既是window的属性，也是document的属性。主要保存url相关的属性信息。

- location.protocol
- location.host：服务器名及端口号
- location.hostname：服务器名
- location.pathname：url中请求的资源的路径
- ***location.search：url中的查询字符串***
- location.hash：url中#后的内容
- location.href：url完整地址

对url中的查询字符串的处理方法

1.使用字符串方法进行解析

```js
// ?q=javascript&num=10
const getQueryStringArgs = function() {
    const qs = location.search.length > 0 ? location.search.substring(1) : ''
    const args = {}
    
    if (qs.length > 0) {
        for (let item of qs.split('&').map(kv => sv.split('='))) {
            const name = decodeURIComponent(item[0])
            const value = decodeURIComponent(item[1])
            if (name.length) {
                args.name = value
            }
        }
    }
    
    return args
}
```

2.使用URLSearchParams构造函数

URLSearchParams提供了一组标准API方法，给其传入一个查询字符串，即可创建一个实例。

实例上暴露了get()，set(), delete() 等方法

```js
let qs = '?q=javascript&num=10'

let searchParams = new URLSearchParams(qs)

searchParams.has('num')
searchParams.get('num')
searchParams.set('page', 3)
searchParams.delete('q')
```

操作地址

1. location.assign(url)
2. location.href = 'xxx'
3. window.location = 'xxx'
4. location.replace(url)
5. location.reload()：重新加载
6. location.reload(true)：从服务器重新加载

### 3.navigator对象

### 4.screen对象

window.screen保存的是浏览器窗口外面的客户端显示器的信息，比如像素宽度和高度等。

![image-20230226165732880](https://github.com/JNUYoung/JavaScript-Codes-Collection/blob/main/imgs/image-20230226165732880.png)

### 5.history对象

**1.导航（在历史记录中前进或后退）**

```js
history.go(1)
history.go(-1)

// go方法有两个简写方法
history.forward()
history.back()

// length属性记录了历史记录中有多少条目
history.length === 1    // 确定页面是不是用户历史记录的第一条记录
```

**2.历史状态管理**

hashchange事件。

状态管理API可以让开发者改变浏览器URL而不会加载新页面。

```js
history.pushState()
history.replaceState()
```



------



## chapter 18 - 动画与Canvas

canvas是HTML5最受欢迎的特性，该元素占据一块页面区域，让JS可以动态地在上面绘制图片。

### 1.requestAnimationFrame

1.mozRequestAnimationFrame()

2.早期定时动画的实现方式

### 2.canvas元素

创建canvas元素，需要至少设置宽度和高度属性，canvas标签中的内容会在浏览器不支持canvas元素时显示。

要在canvas上进行绘制，首先需要通过***getContext***方法获取canvas元素的绘图上下文。

可以通过toDataURL()方法导出canvas元素上绘制的图像，该方法接收一个参数：要生成的图像的MMIME类型。

**2D绘图上下文**

> 绘制矩形、弧形、路径

**1.填充和描边**

填充和描边的显示效果取决于绘图上下文的两个属性：

- fillStyle：设置填充的样式
- strokeStyle：设置轮廓的样式

**2.绘制矩形**

> 矩形是唯一一个可以直接在2D绘图上下文中绘制的形状

- fillRect(x, y, width, height)：绘制并填充矩形
- strokeRect(x, y, width, height)：绘制矩形轮廓
- clearRect(x, y, width, height)：擦除画布中某个区域

**3.绘制路径**

首先需要调用***beginPath()***方法表示要开始绘制新路径

- arc(x, y, radius, startAngle, endAngle, counterclockwise)：以x，y为圆心，radius为半径，起始角度为startAngle，结束角度为endAngle绘制一条弧线。counterclockwise参数为布尔值，表示是否逆时针计算角度。
- arcTo(x1, y1, x2, y2, radius)：从x1，y1到x2，y2的半径为radius的弧线。
- bezierCurveTo(c1x, c1y, c2x, c2y, x, y)：绘制三次贝塞尔曲线
- lineTo(x, y)：绘制从上一个点到（x，y）的直线；
- moveTo(x, y)：不绘制，仅将绘制光标移动到(x, y)
- quadraticCurveTo(cx, cy, x, y)：绘制二次贝塞尔曲线
- rect(x, y, width, height)：绘制矩形路径，而不是图像。

可以调用closePath()方法绘制一条返回起点的路径。

路径绘制完成后，可以指定fillStyle属性并调用fill()方法来填充路径。

路径绘制完成后，可以指定strokeStyle属性并调用stroke方法来描绘路径。

还可以调用***clip方法***基于已有路径创建一个新剪切区域。

使用isPointInPath(x, y)方法，检查某个点（x，y）是否在路径上。

**4.绘制文本**

绘制上下文属性：

- font
- textAlign
- textBaseline

文本绘制方法：

- fillText(字符串，x，y，可选的最大像素宽度)
- strokeText(字符串，x，y，可选的最大像素宽度)

**5.※ 变换**

功能：操作画布上的图像。

在创建绘制上下文时，会以默认值初始化图像的***变换矩阵***。

可以使用以下方法改变绘制上下文的变换矩阵：

- rotate(angle)
- scale(scaleX, scaleY)
- translate(x, y)：把原点移动到x，y
- transform()
- setTransform()

**可以使用两个方法save和restore来保存和恢复变换过程中的绘制上下文属性和状态。**

在某一时刻调用save方法后，所有这一时刻下的设置会被放到一个***栈结构***中，通过调用store方法可以轻松获取到最近一次所保存的状态设置。

> 相当于save拍照记录，restore则是按照从后往前的顺序查看相片，看完即将相片删除。

**6.绘制图像**

drawImage()方法

------



## Chapter25-客户端存储

与用户相关的信息应该保存在用户的机器上，例如登录信息、个人偏好、或者其它数据，都需要有解决方案将其保存在客户端。

该问题的第一个解决方案就是cookie，由网景公司发明，由一份名为***Persistent Client State: HTTP Cookies***的规范所定义。

### 1.cookie

1.what is cookie

服务器在响应HTTP请求时，在响应报文的首部字段中设置 Set-Cookie选项，将key-value类型的cookie字段发送给浏览器存储。

![image-20230211182935400](https://github.com/JNUYoung/JavaScript-Codes-Collection/blob/main/imgs/image-20230211182935400.png)

浏览器在之后对于该站点的每个请求中都会通过HTTP头部的cookie字段将其发送给服务器用来进行**唯一标识发送请求的客户端**。

浏览器会对存储在客户端的cookie施以一些限制规则：

- 不超过300个cookie
- 每个cookie不超过4096字节
- 每个域不超过20个cookie
- 每个域不超过81920字节

2.cookie的构成

cookie由以下参数构成：

- cookie名称：cookie的唯一标识
- 值：存储在cookie中的字符串
- 域：发送到这个域的请求才会加上该cookie信息
- 路径：请求url中包含这个路径才会发送该cookie，指定某个域上的特定资源路径
- 过期时间：到这个时刻时在客户端删除该cookie
- 安全标志：设置后，***只有使用SSL***才会把cookie发送到服务器【只需要在Set-Cookie字段后添加 secure即可】

![image-20230211183925472](https://github.com/JNUYoung/JavaScript-Codes-Collection/blob/main/imgs/image-20230211183925472.png)



***！！域名、路径、过期时间、安全标志等只是告诉浏览器在什么情况下才会将cookie包含在请求中发送给服务器，实际发送的只有key-value键值对！！***

3.javascript中的cookie

- document.cookie 可以直接获取当前页面的cookie
- document.cookie = '' 可以按照响应头中Set-Cookie的字符串形式添加cookie信息
- 获取cookie信息时，因为cookie名和cookie值都是经过url编码的，所以需要decodeURIComponent()进行解码
- 添加cookie信息时，也需要对cookie名和cookie值进行编码，使用encodeURIComponent进行编码

【可以借用第三方库来实现对于cookie的操作】

4.子cookie

将cookie名对于的cookie值设置为一个新的cookie键值对内容。

例如：

```http
Set-Cookie: name=name1=value1&name2=value2&name3=value3&name4=value4
```

这里cookie名为：name，cookie值为name1=value1&name2=value2&name3=value3&name4=value4【子cookie】

5.使用cookie的注意事项

1. 还有一种HTTP-only的cookie，既可以在客户端设置，也可以在服务端设置，但是只能在服务端读取；
2. cookie保存大量信息会影响请求的性能，因此尽可能只使用cookie保存必要信息，避免性能问题；
3. 不要在cookie中存储敏感信息，cookie保存的环境并非安全的环境。；

> Q：什么是http-only？
>
> A：http-only相当于服务器设置cookie信息时的一个标识符，设置之后，在客户端无法通过js获取cookie信息，可以较好防范基于客户端发起的xss攻击。所以http-only相当于网页cookie信息的一个***护身符***。
>
> Set-Cookie: name=Nicholas; HttpOnly

### 2.Web Storage

为了解决客户端存储不需要频繁发送给服务器的数据时使用cookie的问题。

Web Storage定义了两个对象，localStorage和sessionStorage。

Storage类型用于保存键值对数据，直至达到存储空间的上限。

常用方法：

- clear()：删除所有存储的键值对
- getItem(name)：获取指定键名的值
- key(index)：获取给定数值位置的名称
- removeItem(name)：删除给定键名的键值对
- setItem(name, value)：设置存储键值对

2.1 sessionStorage

sessionStorage对象只存储会话数据，数据只会存在到浏览器关闭。

该对象主要用于存储只在会话期间有效的小块数据，如果需要跨会话持久存储数据，应该使用localStorage。

2.2 localStorage

在修订的 HTML5 规范里，localStorage 对象取代了 globalStorage，作为在客户端持久存储数据的机制。要访问同一个 localStorage 对象，页面必须来自同一个域（子域不可以）、在相同的端口上使用相同的协议。

2.3 IndexedDB

> 1.indexedDB中的数据存储在内存还是磁盘中？
>
> 2.哪些数据适合存储在indexedDB中？
>
> 3.indexedDB有哪些限制？
>
> - indexedDB数据库与页面源绑定；不同源对应不同的数据库；
> - 每个源都有存储空间限制，firefox是50MB，chrome是5MB；
> - firefox下本地文件不能访问indexDB数据库，chrome无此限制；
>
> 4.实际开发中可能在哪里会用到？
>
> - 3D WebGL
> - 数据可视化界面

Indexed Database API，简称IndexedDB，是浏览器中***存储结构化数据***的一个方案，方便***js对象的存储和获取***，同时也支持查询和搜索。【cookie和Storage对象都是存储key-value类型的字符串键值对】

IndexedDB的设计是异步的，***大多数操作以请求的形式进行***，这些请求可能成功或失败，绝大多数IndexedDB的操作需要添加onerror和onsuccess事件处理程序确定输出。

**step one**

使用IndexDB数据库的第一步是调用indexedDB.open()方法，并传入要打开的数据库名称。如果给定的数据库已存在，则会发送打开它的请求；如果不存在，则会发送创建这个数据库的请求；

```js
// 调用indexedDB.open()打开已有数据库或创建新的数据库
let db, request, version = 1
// 请求打开名为admin的数据库，若没有该数据库，则创建
request = indexedDB.open('admin', version)
// 指定请求成功或失败的回调
request.onerror = (e) => {
    console.error(e.target.errorCode)
}
request.onsuccess = (e) => {
    db = e.target.result
}
```

**step two**

建立数据库连接后，使用对象进行存储，需要对象中的一个key作为存储的键。

### 3.conclusion

1. cookie是最早的用于在客户端存储数据的解决方法，用以向服务器表明用户的身份；
2. 在每次请求时都会把cookie中的所有信息发送给服务器，但是有些非必要的数据没有必要发送给服务器，因此浏览器存储的两个对象，localStorage和sessionStorage用以解决该问题；
3. indexedDB可以存储非结构化的数据，相当于运行于浏览器中的非关系型数据库；

------



## chapter28-最佳实践

### **1.可维护性**

**编码规范**

1.可读性（代码缩进和注释）

2.变量和函数命名

- 变量名应该是名词；
- 函数名应该以动词开始，返回布尔值的函数通常以is开始；
- 变量和函数都应该使用符合逻辑的名称；
- 变量、函数和方法应该以小写字母开头，使用camelCase形式；
- 类名应该首字母大写；常量值应该全部大写并以下划线连接，例如REQUEST_TIMEOUT;
- 名称尽量使用描述性和直观的词汇，见名知意；

3.变量类型透明化

- 定义变量时就将其初始化为所属的类型值；

- 使用匈牙利表示法，变量首字母o表示对象，s表示字符串，i表示整数，f表示浮点数，b表示布尔值；

  ```js
  let bValid = true
  let iCount = 1
  let sName = 'name'
  let oStudent = {}
  ```

- 使用类型注释，放在变量名后面，初始化表达式的前面

  ```js
  let valie /*:Boolean*/ = false
  ```

**松散耦合**

减少代码或模块之间的耦合程度。

### 2.性能

**1.作用域意识**

> 任何可以缩短遍历作用域链时间的举措都能提升代码性能；

**※ 避免全局查找**

```js
function updateUI() {
    let doc = document  // ※ 将全局对象保存为一个引用，避免对于document对象的重复查询
    let imgs = document.getElementsByTagName('img')
    for (const img of imgs) {
        img.title = `${doc.title} image ${img.indexOf(imgs) + 1}`
    }
    let msg = doc.getElementById('msg')
    msg.innerHTML = 'update completed'
}
```

**※ 不使用with语句**

with语句创建了自己的作用域，加长了代码的作用域链。在with语句中执行的代码一定比在它外部执行的代码慢，因为作用域查找时多一步。

**2.选择正确的方法**

- 避免不必要的属性查找
- 优化循环
  - 简化终止条件
  - 简化循环体
  - 使用后测试循环 do-while
- 原生方法很快，因为其是使用C或C++等编译性语言写的；
- switch语句很快，如果有复杂的if-else语句，可以将其转换为switch结构；并且把最可能的选项放在最前面；
- 位操作很快；

**3.语句最少化**

> 一条可以执行多个操作的语句，比多条语句中每条语句执行一个操作要快

- 多个变量声明

  ```js
  let a, b, c = 1, 2, 3
  ```

- 插入迭代性值（会递增或递减的值）

  ```js
  let name = values[i++]
  ```

- 使用数组和对象字面量

**4.优化DOM交互**

- 实时更新最小化

- 大量DOM更新时使用innerHTML

  在给节点的innerHTML赋值时，后台会创建HTML解析器，***使用原生DOM调用***而不是JS的DOM方法来创建DOM结构；而原生DOM方法会更快，因为该方法是执行编译代码而非解释代码；

- 使用事件委托；

- 注意HTMLCollections ※

  只要访问HTMLCollection对象，无论是访问属性还是方法，就会触发查询文档，而这个查询相当耗时，因此需要减少访问HTMLCollection的次数；

  ```js
  let imgs = document.getElementsByTagName("img")
  for (let i = 0, len = imgs.length; i < len; i++) {
      // 这里相较于i<imgs.length，只访问了一次length属性
  }
  ```

**5.部署**

**构建**

- ***tree shaking***
- 打包工具：Webpack、rollup、gulp

**验证**：在代码运行前发现JS代码中的语法错误和编码错误

- eslint、jsLint

**压缩 compression**

- 代码大小
  - 删除空格、注释
  - 缩短变量名、函数名、标识符等
- Javascript编译 compilation：把源代码转换为一种逻辑相同但字节更少的形式；
- Javascript转译 transpilation：将现代的js代码转换为更早ES版本的代码，保证兼容性；
- 传输负载：服务器发送给浏览器的实际字节数
  - HTTP压缩：服务器压缩JS文件，并且使用***Content-Encoding***字段标明使用了哪种压缩格式；浏览器看到这个字段后，就会根据这个压缩格式对文件进行解压；

