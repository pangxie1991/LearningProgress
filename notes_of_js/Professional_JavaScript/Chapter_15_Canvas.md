## Chapter15.使用Canvas绘图

HTML5的重量级功能。负责在页面中设置一个区域，然后可以通过读取JS动态的在这个区域绘图。

和浏览器环境的其他几个组件类似(DOM/BOM)，Canvas由几组API构成，目前支持这个元素的浏览器都支持2D上下文以及文本API，但是对3D上下文
————WebGL的支持还不够好。

#### 15.1 基本用法

要使用`<canvas>`元素，必须先设置其width和height属性，指定可以绘图的区域的大小。出现在开始和结束标签之间的内容是后备信息，用以在
浏览器不支持时显示(类似`<noscript>`)。

和其他元素一样，canvas元素对应的DOM也有width和height属性，可以随意修改，而且也能通过CSS添加样式。如果没有样式或者不绘制图形，在页
面中是看不到该元素的。

要在canvas上绘图，需要取得绘图上下文，而取得绘图上下文对象的引用，需要调用`getContext()`方法并传入上下文的名字。

    var drawing = document.getElementById(myDrawing);

    if (drawing.getContext) {
        var 2dContext = drawing.getContext('2d');
    }
使用`toDateURL()`方法可以导出在canvas上绘制的图像，这个方法接收一个参数，即如想的MIME
(Multipurpose Internet Mail Extensions————多用途互联网邮件扩展类型)

    // 接上面的代码
    var imgURL = drawing.toDateURL('image/png');

    // 显示图像
    var image = document.createElement('img');
    image.src = imgURL;
    document.body.appendChild(image);

#### 15.2 2D上下文

2D上下文的坐标起始于canvas元素的左上角，原点坐标是(0,0)，x的正方向是向右，y的正方向是向下，默认情况下width和height代表水平和垂直
两个方向上能够使用的像素数。

**15.2.1 填充和描边**

2D上下文有两种基本操作，填充就是用指定的样式来填充图形，描边就是只在图形的边缘画线。大多数2D上下文操作都可以细分为这两种操作，其操作
结果取决于两个属性：fillStyle和strokeStyle。

这两个属性可以是字符串，渐变对象和模式对象，默认值都是"#000000"。如果为它们指定表示颜色的字符串值，可以在CSS使用指定颜色的任意格式。
包括颜色名，十六进制码，rgb，rgba，hsl，hsla。
    // 接上代码

    2dContext.fillStyle = '#0000ff';
    2dContext.strokeStyle = 'rgba(255,0,0,0.5)';

渐变对象和模式对象将在后面讨论。

**15.2.2 绘制矩形(Rectangle)**

绘制矩形是操作2D上下文的基本操作，有三个方法：`fillRect()`/`strokeRect()`/`clearRect()`。

这三个方法都接收四个参数，分别是矩形左上角的x坐标，y坐标，宽和高。

    // 接上代码
    2dContext.fillRect(10, 10, 50, 50);
    2dContext.strokeRect(30, 30, 50, 50);

上面代码分别绘制了一个蓝色实心矩形和一个半透明红色的矩形线框。

`clearRect()`可以把已经生成的图形的某一个矩形部分清除掉，本质上是使得这个区域变得透明。

**15.2.3 绘制路径**

要绘制路径首先要调用`beginPath()`方法，然后通过调用下列方法来实际的绘制路径。

Bezier(贝塞尔曲线)、

* `moveTo(x, y)`

  将绘图游标移动到(x,y)，不画线。

* `lineTo(x, y)`

  从上一点开始绘制一条线段，到(x,y)为止。

* `arc(x, y, radius, startAngle, endAngle, counterclockwise)`

  以(x, y)为圆心，radius为半径，弧度表示的startAngle和endAngle表示起止弧度，按照逆/顺时针方向绘制一个圆弧。第五个参数false表示
  顺时针。

* `arcTo(x1, y1, x2, y2, radius)`

  从上一点开始，以radius为半径绘制一道弧线到(x2,y2)为止并且经过(x1,y1)。

* `bezierCurveTo(c1x, c1y, c2x, c2y, x, y)`

  从上一点开始绘制一道弧线到(x,y)，以(c1x,c1y)和(c2x,c2y)为控制点

* `quadraticCurveTo(cx, cy, x, y)`

  绘制一条二次曲线到(x,y)，以(cx,cy)作为控制点。

* `rect(x, y, width, height)`

  绘制一条矩形路径，(x,y)点作为左上角开始，width和height分别作为宽和高。

绘制完路径之后可以调用`closePath()`方法创建一条从终点到起点的连线，可以使用`fill()`方法用fillStyle填充它。也可以使用`stroke()`
方法用strokeStyle来描边，最后还可以使用`clip()`方法来创造一个剪切区域。

以下是一段示例代码，引用上文的context。

    context.beginPath();

    context.arc(100, 100, 99, 0, 2*Math.PI, false);
    context.arc(100, 100, 94, 0, 2*Math.PI, false);

    context.moveTo(100, 100);
    context.lineTo(100, 15);

    context.moveTo(100, 100);
    context.lineTo(30, 100);

    context.fill();

2D上下文中的路径API已经十分稳定，结合各种方法可以绘制出十分复杂的图形，由于使用十分频繁，所以有一个名为`isPointInPath()`的检测、
方法可以在路径未关闭的时候确定画布上的一点是不是位于路径上。

**15.2.4 绘制文本**

绘制文本有两个基本方法，`fillText()`和`strokeText()`，这两个方法都接收4个参数，要绘制的文本字符串，x坐标，y坐标，和可选的最大
像素宽度。这两个方法都以下面3个属性为基础。

* font：文本样式和字体大小，使用CSS格式来指定。例如'10px Arial'
* textAlign：文本对齐方式，可能的值有'start'/'end'/'left'/'right'/'center'。横向对齐方式。
* textBaseline：表示文本的基线，可能的值有'top'/'hanging'/'middle'/'alphabetic'/'ideographic'/'bottom'

  top则y坐标表示文本的顶端。bottom则y坐标表示文本的底端。其他三个对应不同的特定基线。

这几个属性都有默认值，因此不需要每次都设置，`fillText()`和`strokeText()`使用两种样式来为文本填充或者描边。

**15.2.5 变换**

通过对上下文的变化可以把处理后的图像绘制到画布上。2D绘制的上下文支持各种基本的绘制变换。

* `rotate(angle)`：围绕原点旋转图形angle弧度。
* `scale(scaleX, scaleY)`：缩放图像，在x方向乘以scaleX，在y方向乘以scaleY。
* `translate(x, y)`：将坐标原点移动到(x,y)。
* `transform(m1_1, m1_2, m2_1, m2_2, dx, dy)`：直接修改变换矩阵，方式是乘以以下矩阵

        m1_1 m1_2 dx
        m2_1 m2_2 dy
        0    0    1

* `setTransform(m1_1, m1_2, m2_1, m2_2, dx, dy)`：将变换矩阵重置为默认状态，然后再调用`transform()`

另外有一些方法可以用来跟踪上下文状态的变化。

* `save()`：可以将当前属性和变换的组合缓存在一个栈里。
* `restore()`：返回上一组属性和变换的组合。

**15.2.6 绘制图像**

2D上下文对象内置了对图像的支持，基础的方法是`drawImage()`，根据期望结果的不同调用这个方法时可以传入三种不同的参数组合。

* 传入一个HTML元素，以及图像起点(左上角)的x和y坐标
* 可选参数为目标宽度和高度
* 可选参数也可以选择图像的某个区域，此时用2-5参数位指定部分图片的内容部分，仍可以用8-9号参数位指定画布上图像的大小。

        var image = document.images[0];
        context.drawImage(image, 10, 10);
        context.drawImage(image, 10, 10, 20, 30);   // 指定图像的大小为20*30
        context.drawImage(image, 0, 10, 50, 50, 0, 100, 40, 60);   //

需要注意的一点是drawImage方法应该在图片加载完成之后再进行调用。

以及用来提取最终结果的`toDataURL()`是定义在Canvas对象上的。

**15.2.7 阴影**

2D上下文对象有几个专属的属性用来操作形状或者路径的阴影。

* shadowColor：使用CSS颜色格式来控制阴影颜色，默认为黑色。
* shadowOffsetX：X轴方向的阴影偏移量，默认为0。
* shadowOffsetY：Y轴方向的阴影偏移量，默认为0。
* shadowBlur：模糊的像素数，默认为0

**15.2.8 渐变**

渐变由CanvasGradient实例进行表示，很容易通过2D上下文进行创建和修改。一般使用的是线性渐变，创建的方法如下。

* `createLinearGradient(x_1, y_1, x_2, y_2)` ：创建的渐变以(x_1,y_1)为起点，(x_2,y_2)为终点。

* `addColorStop(pos, color)`：这个方法定义在渐变对象上，创建颜色校准点，pos位于0-1之间，color可以使用CSS颜色格式的字符串值。

以下是一个应用实例

    var gradient = createLinearGradient(30, 30, 70, 70);

    gradient.addColor(0, '#ffffff');
    gradient.addColor(1, '#000000');

    // 具体使用需要将gradient对象赋值给fillStyle属性或者strokeStyle属性。
    context.fillStyle = gradient;
    context.strokeStyle = gradient;

还需要注意一个坐标匹配的问题。为了确保坐标合适一般使用辅助函数。

    function createRectLinearGradient(context, x, y, width, heiget) {
        return context.creatGradient(x, y, x + width, y + height);
    }

* `createRadialGradient(x_1, y_1, radius_1, x_2, y_2, radius_2)`：创建一个圆心(x_1,y_1)，半径radius_1的圆到圆心(x_2,y_2)，
半径radius_2的圆的放射渐变(径向渐变)。

  这种方法创建的渐变比较难以控制，一般两个圆使用同心圆。

**15.2.9 模式**

模式实际上就是用来在画布上重复的图像。可以用来填充或者描边图形。创建方法如下

* `createPattern(img, repeat/repeat-x/repeat-y/no-repeat)`

以下是示例

    var img = ....

    var pattern = context.createPattern(img, 'repeat');

    context.fillStyle = pattern;

    context.fillRect(10, 10, 150, 150);

需要注意的是模式和渐变一样，默认都是从画布的原点(0,0)开始的，填充样式设置为某种模式不意味着以某个形状的起点开始重复图形。

**15.2.10 使用图像数据**

2D上下文对象的一个优势就是可以通过`getImageData()`取得原始图像数据。这个方法接收四个参数，要取得其数据的画面区域的x,y坐标以及该区域
的像素宽度和高度。

使用这种方法获得原始图像数据是ImageData对象的实例，每个对象有三个属性，width，height和data。其中data是个长数组，依次保存着每一个
像素点的r、g、b、a，第一个像素对应`ImageData.data[0]~ImageData.data[3]`，以此类推。

以下是一个示例的灰阶过滤器。

    imageData = context.getImageData(0, 0, 300, 300);
    data = imageData.data;

    for (var i = 0, len = data.length; i < len; i+=4) {
        var red = data[i],
            green = data[i+1],
            blue = data[i+2],
            alpha = data[i+3];

        var average = Math.floor((red + green + blue) / 3);

        data[i] = average;
        data[i+1] = average;
        data[i+2] = average;

    }

    // 回写图像数据
    imageData.data = data;
    context.putImageData(imageData, 0, 0);

注意只有在画布干净的情况下才能获得图像数据，如果图像来自其他域，获取数据会报错。

**15.2.11 合成**

两个影响2D上下文全局的属性

* globalAlpha：改变全局透明度，默认为0。

* globalCompositionOperation：这个属性有一些列可能的字符串值，代表了后绘制的图像相对于先绘制的图像的相对位置。

    * source-over：后绘制的位于先绘制的上方，默认值。
    * source-in：重叠部分可见，其他部分完全透明。
  等等。。。 详见p462

#### 15.3 WebGL

TODO


























