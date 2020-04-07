## ClipperLib.ClipType()
```c
Number ClipType {ctIntersection: 0, ctUnion: 1, ctDifference: 2, ctXor: 3};
```
有四个布尔操作-AND，OR，NOT&XOR。

鉴于主题和剪辑多边形笔刷“填充”由其顶点和各自的填充规则定义，四个布尔操作可应用于多边形以定义新的填充区域：

- AND（intersection交集）-创建对象和剪辑多边形都被填充的区域
- OR（union并集）-创建填充主题或剪辑多边形（或两者）的区域
- NOT（difference差异）-创建填充对象多边形的区域，但填充clip*多边形的区域除外
- XOR（异或）-创建填充主题或剪辑多边形的区域，而不是填充两者的区域

![](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/cliptype.png)
![](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/intersection.png)![](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/union.png)![](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/difference.png)![](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/xor.png)

所有多边形裁剪都是通过Clipper对象执行的，该对象具有通过其Execute方法中传递的ClipType参数指示的特定布尔操作。

关于开放路径（折线），剪切规则通常与封闭路径（多边形）的规则匹配。

但是，当同时存在折线和多边形主题时，将应用以下裁剪规则：

并集操作-折线将被任何重叠的多边形裁剪，以便非重叠部分将与并集的多边形一起返回到解决方案中
相交，差和异或运算-折线将仅被“剪切”多边形剪裁，折线与主题多边形之间将不存在交互作用。
混合折线和多边形主题时的剪切行为示例：
![](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/line_clipping2.png)

用法
```javascript
var cliptype = ClipperLib.ClipType.ctIntersection;
var cliptype = ClipperLib.ClipType.ctUnion;
var cliptype = ClipperLib.ClipType.ctDifference;
var cliptype = ClipperLib.ClipType.ctXor;
```

## ClipperLib.EndType
```c
ClipperLib.EndType = {etOpenSquare: 0, etOpenRound: 1, etOpenButt: 2, etClosedLine: 3,  etClosedPolygon: 4 };
```

EndType枚举器具有5个值：

etOpenSquare：两端平方和扩展的增量单位
etOpenRound：端点四舍五入并扩展了增量单位
etOpenButt：两端不加扩展名。
etClosedLine：使用JoinType值和以折线填充的路径连接末端
etClosedPolygon：使用JoinType值连接末端，并将路径填充为多边形
etOpenSingle：在单个方向上偏移开放路径。计划将来进行更新。
:::tip
注意：对于etClosedPolygon和etClosedLine类型，无论路径中的第一个和最后一个顶点是否匹配，路径闭合都将相同。
:::
![](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/endtypes1.png)
![](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/endtypes2.png)

用法
```javascript
var endtype = ClipperLib.EndType.etOpenSquare;
var endtype = ClipperLib.EndType.etOpenRound;
var endtype = ClipperLib.EndType.etOpenButt;
var endtype = ClipperLib.EndType.etClosedLine;
var endtype = ClipperLib.EndType.etClosedPolygon;
```

## ClipperLib.EndType_
```c
if (use_deprecated)
  ClipperLib.EndType_ = {etSquare: 0, etRound: 1, etButt: 2, etClosed: 3};
```
::: danger
已弃用。请参见ClipperOffset和EndType。
:::

EndType枚举器有4个值：

- etSquare：以精确的增量单位对端点进行平方
- etRound：末端以精确的增量单位舍入
- etButt:两端突然成方形
- etClosed：使用JoinType值和填充为多边形的路径连接端点。

![](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/endtypes.png)

用法
```javascript
var endtype = ClipperLib.EndType_.etSquare;
var endtype = ClipperLib.EndType_.etRound;
var endtype = ClipperLib.EndType_.etButt;
var endtype = ClipperLib.EndType_.etClosed;
```

## ClipperLib.ExPolygon()
```c
ExPolygon ExPolygon();
```
创建ExPolygon对象的实例。
这在原来的Clipper中已经不存在了，但是在JS版本中，我们提供它来确保向后兼容。

用法
```javascript
var expolygon = new ClipperLib.ExPolygon();
```

## ClipperLib.ExPolygons()
```c
ExPolygons ExPolygons();
```
创建ExPolygons对象ie数组的实例。
这在原来的Clipper中已经不存在了，但是在JS版本中，我们提供它来确保向后兼容。

用法
```javascript
var expolygons = new ClipperLib.ExPolygons();
```

## InitOptions
```c
Number ioReverseSolution = 1;
Number ioStrictlySimple = 2;
Number ioPreserveCollinear = 4;
```

用法
```javascript
var cpr = new ClipperLib.Clipper(ClipperLib.Clipper.ioStrictlySimple | ClipperLib.Clipper.ioPreserveCollinear);
// or
var cpr = new ClipperLib.Clipper(2 | 4);
```

## ClipperLib.IntPoint()
```c
IntPoint IntPoint(Number X, Number Y)
IntPoint IntPoint()
IntPoint IntPoint(IntPoint point)
```

IntPoint结构用于表示裁剪器库中的所有顶点。为了保持数值稳健性，特意选择了“integer”存储类型。（早期版本的库使用浮点坐标，但很明显，浮点的不精确性总是会导致偶尔的错误。）

路径结构中包含一系列的点来表示单个轮廓。

从版本6开始，IntPoint现在有一个可选的第三个成员'Z'。这可以通过公开（即取消注释）预处理器定义“use xyz”来启用。使用Z成员时，其值将被复制到剪切操作解决方案中相应的垂直位置。但是，在没有对应Z值的交点处，除非用户提供的回调函数提供了新值，否则该值将被赋值为零。

希望剪裁或偏移包含浮点坐标的多边形的用户在将这些值转换为IntPoints或从IntPoints转换为IntPoints时，需要使用适当的缩放比例。

另请参见有关舍入的注释。

用法
```javascript
var point = new ClipperLib.IntPoint(10,20); // Creates object {"X":10,"Y":20}
var point2 = new ClipperLib.IntPoint(); // Creates object {"X":0,"Y":0}
var point3 = new ClipperLib.IntPoint(point); // Creates clone of point
```

## ClipperLib.IntRect()

```c
IntRect IntRect(Number left, Number top, Number right, Number bottom);
IntRect IntRect(IntRect intRect);
IntRect IntRect();
```

Clipper的GetBounds方法返回的结构。

## ClipperLib.JoinType
```c
ClipperLib.JoinType = {jtSquare: 0, jtRound: 1, jtMiter: 2};
```
通过AddPaths方法向ClipperOffset对象添加路径时，joinType参数可以是三种类型之一：jtMiter、jtSquare或jtwround。
![](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/86de/attachment/jointypes.png)

- jtMiter：斜切连接有必要的限制，因为以非常锐角连接的偏移边会产生过长而又狭窄的“尖峰”。为了包含这些潜在的尖峰，ClipperOffset对象的MiterLimit属性指定顶点将被偏移的最大距离（以增量的倍数表示）。对于任何给定的边连接，当斜接偏移量将超过最大距离时，将应用“正方形”连接。
- jtRound：虽然展平的路径永远无法完美地跟踪圆弧，但它们由一系列圆弧弦近似（请参见ClipperObject的ArcTolerance属性）。
- jtSquare：在所有凸边连接处以1×delta均匀地应用平方。

用法
```javascript
var jointype = ClipperLib.JoinType.jtSquare;
var jointype = ClipperLib.JoinType.jtRound;
var jointype = ClipperLib.JoinType.jtMiter;
```


## ClipperLib.Path()
```c
Path Path()
```

此结构包含定义单个轮廓的点顶点序列（另请参见术语）。路径可以是开放的，表示由2个或更多顶点包围的线段，也可以是闭合的，表示多边形。

可以将多个路径组合到一个路径结构中。

用法
```javascript
var path = new ClipperLib.Path(); // Creates an empty array []
// or
var path = new Array();
// or
var path = [];
```

## ClipperLib.Paths()
```c
Paths Paths()
```

这种结构是Clipper库的基础。它是由一个或多个路径结构组成的数组。（路径结构包含形成单个轮廓的有序顶点数组。）

路径可以是开放的（直线），也可以是闭合的（多边形）。

用法
```javascript
var paths = new ClipperLib.Paths(); // Creates an empty array []
// or
var paths = new Array();
// or
var paths = [];
```

## ClipperLib.PolyFillType
```c
ClipperLib.PolyFillType = {pftEvenOdd: 0, pftNonZero: 1, pftPositive: 2, pftNegative: 3};
```
填充表示多边形内部的区域（即在图形显示中用笔刷颜色或图案“填充”），而非填充表示多边形外部的区域。Clipper库支持4种填充规则：奇数，非零，正数和负数。

最简单的填充规则是奇偶填充。给定一组多边形并从外部的某个点开始，每当与等高线交叉时，填充就会开始（如果已停止）或停止（如果已开始）。例如，给定一个矩形多边形，当其第一个（例如，左）边缘相交时，填充开始，并且我们位于该多边形内。越过下一个（例如右）边缘时，填充将再次停止。

除了偶数奇数填充以外，所有其他填充规则都依赖于边沿方向和卷绕数来确定填充。边的方向由构造多边形时声明顶点的顺序确定。边缘方向用于确定多边形区域和子区域的卷绕数。

任何给定多边形子区域的绕组数可以通过以下公式得出：

1. 从零的绕组数开始
2. 从所有多边形之外的点（P1）画一条假想线到给定子区域（P2）内的点
3. 在从P1到P2的直线上移动时，对于从右到左越过该线的每个多边形边，递增绕组数，对于从左到右越过该线的每个多边形边，递减绕组数。
4. 到达给定的子区域后，您将获得其绕线编号。

![](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/winding_number.png)

偶数奇数Even-Odd（备用）：填充奇数编号的子区域，而不填充偶数编号的子区域。
非零Non-Zero （缠绕）：填充所有非零子区域。
正数Positive：绕组计数> 0的所有子区域均被填充。
负数Negative：填充计数小于0的所有子区域。

![](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/evenodd.png)![](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/nonzero.png)![](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/positive.png)![](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/negative.png)

到目前为止，使用最广泛的填充规则是偶数奇数（又名备用）和非零（又称缠绕）。大多数图形渲染库（AGG，Android Graphics，Cairo，GDI +，OpenGL，Quartz 2D等）和矢量图形存储格式（SVG，Postscript，Photoshop等）都支持这两个规则。但是，某些库（例如Java的Graphics2D）仅支持一个填充规则。Android Graphics和OpenGL是唯一支持多种填充规则的库（据我所知）。

值得注意的是，边沿方向不会影响绕组号的奇数或偶数。（这就是为什么使用“ 偶数-奇数”规则时会忽略方向的原因。）

Y轴的方向确实会影响多边形的方向和边缘方向。但是，更改Y轴方向只会更改绕组编号的符号，而不会更改其大小，并且不会影响奇偶填充或非零填充。

用法
```javascript
var polyfilltype = ClipperLib.PolyFillType.pftEvenOdd;
var polyfilltype = ClipperLib.PolyFillType.pftNonZero;
var polyfilltype = ClipperLib.PolyFillType.pftPositive;
var polyfilltype = ClipperLib.PolyFillType.pftNegative;
```

## ClipperLib.PolyType
```c
Number ClipperLib.PolyType = {ptSubject: 0, ptClip: 1};
```

布尔（剪切）操作通常应用于两组多边形，在此库中分别表示为主题和剪切多边形。每当将多边形添加到Clipper对象时，都必须将其分配给主题或剪贴多边形。

可以对一组多边形或对两组多边形执行UNION操作，但是所有其他布尔运算都需要对两组多边形进行有意义的求解。

用法
```javascript
var polytype = ClipperLib.PolyType.ptSubject;
var polytype = ClipperLib.PolyType.ptClip;
```

## ClipperLib.Clipper.ZFillCallback()
```c
void ZFillCallback(IntPoint bot1, IntPoint top1, IntPoint bot2, IntPoint top2, IntPoint pt);
```
如果启用了use_xyz预处理程序指令，则IntPoint类将具有一个额外的“ Z”成员，并且Clipper类的ZFillFunction属性将公开，因此可以为其分配自定义回调函数。

此自定义回调过程需要五个IntPoint参数：前两个参数是定义相交中涉及的一个线段的顶点，而后两个参数是定义另一个线段的顶点。（由于Clipper库是在使用反转的Y轴显示的环境中开发的，因此e1bot和e2bot的Y值始终大于或等于其相应的e1top和e2top Y值。）最后一个IntPoint参数包含位于的实际坐标十字路口。最后一个参数通过引用传递，以便可以为其Z成员分配自定义值。


