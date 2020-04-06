## Clipper
Clipper类封装对多边形（交集，并集，差和XOR）的布尔运算，这也称为多边形裁剪。

输入多边形（主题集和剪辑集）都通过其AddPath和AddPaths方法传递给Clipper对象，并且通过调用其Execute方法来执行剪切操作。可以通过重复调用Execute在相同的输入多边形集上执行多个布尔运算。

## ClipperLib.Clipper()
```c
Clipper Clipper(InitOptions initOptions = 0);
```
Clipper构造函数创建Clipper类的实例。可以将一个或多个InitOptions作为参数传递，以设置相应的属性。（这些属性在构造后仍可以设置或重置。）

用法:
```javascript
var cpr = new ClipperLib.Clipper();
// or
var cpr = new ClipperLib.Clipper(ClipperLib.Clipper.ioStrictlySimple | ClipperLib.Clipper.ioPreserveCollinear);
// or
var cpr = new ClipperLib.Clipper(2 | 4);
```

## ClipperLib.Clipper.Area()
```c
Number Area(Path poly)
```
此函数返回提供的多边形的面积。（假定路径是闭合的。）根据方向，该值可以为正或负。如果方向为真，则该区域为正，反之，如果方向为假，则该区域为负。

用法:
```javascript
var area = ClipperLib.Clipper.Area(polygon);
```

## ClipperLib.Clipper.CleanPolygon()
```c
Path CleanPolygon(Path path, Number distance)
```
此函数用于防止由于顶点太近和/或微自相交而导致的失真.

删除顶点:

- 连接共线边，或连接几乎共线的边（这样，如果顶点移动不超过指定的距离，则边将是共线的）
- 在相邻顶点的指定距离内
- 在半相邻顶点及其外围顶点的指定距离内的

当顶点被一个单独的（外）顶点分隔时，它们是半相邻的.

distance参数的默认值大约为√2，以便当相邻或半相邻顶点的相应X和Y坐标相差不超过1个单位时，将删除顶点。（如果egdes是半相邻的，则也将删除外围顶点。）

Timo：根据测试，偏移之前消除伪影的最合适距离值为0.1 *比例。
![](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/clean1.png)![](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/clean2.png)

用法:
```javascript
var path = [{"X":10,"Y":10},{"X":11,"Y":11},{"X":110,"Y":10},{"X":110,"Y":110},
{"X":10,"Y":110}]; 
var cleaned_path = ClipperLib.Clipper.CleanPolygon(path, 1.1);
// point {"X":11,"Y":11} is now removed
```

## ClipperLib.Clipper.CleanPolygons()
```c
Paths CleanPolygons(Paths polys, Number distance)
```
与CleanPolygon中的功能相同，但参数的类型为Paths。

根据测试，偏移之前消除伪影的最合适距离值为0.1 *比例

在[CleanPolygon](https://sourceforge.net/p/jsclipper/wiki/documentation/#clipperlibclippercleanpolygon)中了解更多信息。

用法:

```javascript
var paths = [[{X:10,Y:10},{X:11,Y:11},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}],
             [{X:20,Y:20},{X:20,Y:100},{X:100,Y:100},{X:100,Y:20}]];
var cleaned_paths = ClipperLib.Clipper.CleanPolygons(paths, 1.1);
// point {"X":11,"Y":11} is removed
```

## ClipperLib.Clipper.ClosedPathsFromPolyTree()
```c
Paths ClosedPathsFromPolyTree(PolyTree polytree)
```
此函数从PolyTree结构中筛选出开放路径，并仅返回路径结构中的闭合路径。

用法:
```javascript
// ... polytree is populated automatically by Execute()
var polygons = ClipperLib.Clipper.ClosedPathsFromPolyTree(polytree);
```

## ClipperLib.Clipper.Execute()
```c
Boolean Execute(ClipType clipType,
  Paths solution,
  PolyFillType subjFillType,
  PolyFillType clipFillType);

Boolean Execute(ClipType clipType,
  PolyTree solution,
  PolyFillType subjFillType,
  PolyFillType clipFillType);
```

一旦指定了主题和剪辑路径（通过AddPath 和/或 AddPaths），Execute就可以执行clipType参数指定的剪辑操作（交集，并集，差异或XOR）。

解决方案参数可以是Paths或PolyTree结构。与PolyTree结构相比，“路径”结构更简单，更快（大约10％）。PolyTree保留路径的父子关系芯片的信息，以及它们是打开还是关闭的信息。

当在开放路径的剪切操作中使用PolyTree对象时，提供了两个辅助函数以快速从解决方案中分离出开放路径和封闭路径-OpenPathsFromPolyTree和ClosedPathsFromPolyTree。PolyTreeToPaths也可用于将路径数据转换为Paths结构（无论它们是打开还是关闭）。

关于返回的解决方案路径，需要注意几件事：

- 他们没有任何特定的顺序
- 它们不应重叠或自相交（但请参见有关四舍五入的注释）
- 孔将与外部多边形相对
- 解决方案填充类型可以被视为EvenOdd或NonZero，因为它符合任一填充规则
- 多边形可能很少共享公共边（尽管从版本6开始，这非常罕见）

subjFillType和clipFillType参数定义分别应用于主题路径和剪辑路径中的多边形（即闭合路径）的多边形填充规则。（通常很明显，两组多边形都使用相同的填充规则虽然不是必需的。）

可以多次调用Execute，而无需重新分配主题和剪贴多边形（即，在同一多边形集上需要不同的剪贴操作时）。
![](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/common_edges.png)

用法:

```javascript
function DrawPolygons(paths, color)
{/* ... */}

function Main(args)
{
  var subj = [[{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}],
                  [{X:20,Y:20},{X:20,Y:100},{X:100,Y:100},{X:100,Y:20}]]; 
  var clip = [[{X:50,Y:50},{X:150,Y:50},{X:150,Y:150},{X:50,Y:150}],
                  [{X:60,Y:60},{X:60,Y:140},{X:140,Y:140},{X:140,Y:60}]];   
  DrawPolygons(subj, 0x8033FFFF);
  DrawPolygons(clip, 0x80FFFF33);

  var solution = new ClipperLib.Paths();
  var c = new ClipperLib.Clipper();
  c.AddPaths(subj, ClipperLib.PolyType.ptSubject, true);
  c.AddPaths(clips, ClipperLib.PolyType.ptClip, true);
  c.Execute(ClipperLib.ClipType.ctIntersection, solution);

  DrawPolygons(solution, 0x40808080);
}
Main();
```

## ClipperLib.Clipper.GetBounds()
```c
IntRect GetBounds(Paths paths);
```
此方法返回路径的轴对齐边框。

用法:
```javascript
var paths = [[{"X":10,"Y":10},{"X":110,"Y":10},{"X":110,"Y":110},{"X":10,"Y":110}]];
var bounds = ClipperLib.Clipper.GetBounds(paths);
// bounds is {"left":10,"top":10,"right":110,"bottom":110}
```

## ClipperLib.Clipper.MinkowskiDiff()
```c
Paths MinkowskiDiff(Path poly, Path path, Boolean isClosed)
```
Minkowski Difference是通过从开放或封闭路径中的点集合中减去多边形中的每个点来实现的。Minkowski Difference的一个关键特性是，当它应用于两个多边形时，当两个多边形接触或重叠时，生成的多边形将包含坐标空间原点。（此函数通常用于确定多边形碰撞的时间。）

## ClipperLib.Clipper.MinkowskiSum()
```c
Paths MinkowskiSum(Path pattern, Path path, Boolean pathIsClosed)
Paths MinkowskiSum(Path pattern, Paths paths, PolyFillType pathFillType, Boolean pathIsClosed)
```
Minkowski Addition是通过将多边形“模式”中的每个点添加到开放或闭合路径中的点集来执行的。生成的多边形定义了“pattern”在从“path”的开头移动到结尾时将经过的区域。

用法:
```javascript
// Star shape ...
var path = [{"X":89.85,"Y":355.85},{"X":131.72,"Y":227.13},{"X":22.1,"Y":147.57},{"X":157.6,"Y":147.57},{"X":199.47,"Y":18.85},{"X":241.34,"Y":147.57},{"X":376.84,"Y":147.57},{"X":267.22,"Y":227.13},{"X":309.09,"Y":355.85},{"X":199.47,"Y":276.29}];
// Diagonal brush shape ...
var shape = [{"X":4,"Y":-6},{"X":6,"Y":-6},{"X":-4,"Y":6},{"X":-6,"Y":6}];
var solution = ClipperLib.Clipper.MinkowskiSum(shape, path, true);
```

## ClipperLib.Clipper.OffsetPaths()
```c
Paths OffsetPaths(Paths polys, Number delta, JoinType jointype = JoinType.jtSquare, EndType endtype = EndType.etClosed, Number limit)
```
不推荐使用。（请参见ClipperOffset。）

此函数使“ polys”参数偏移“ delta”量。“垄断”可能是开放的或封闭的道路。对于闭合路径（多边形），正增量值会“扩展”外部轮廓，并“缩小”内部“孔”轮廓。负增量则相反。使用开放路径（线）时，由于无法“缩小”开放路径，因此会忽略增量值的符号。

边结合可能是三个一jointypes - jtMiter，jtSquare或jtRound。（有关示例，请参见下图。）

![](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/jointypes.png)

limit参数的含义和使用取决于jointype：

- jtMiter：限制以增量的倍数设置最大距离，在应用平方之前，顶点可以从其原始位置偏移。默认值为2（即两次增量），这也是最小的允许值。如果角度足够锐利，需要平方，则平方将以1倍增量发生。如果允许偏移而没有任何限制（即不平方），则以非常锐角偏移将产生无法接受的长“尖峰”。

- jtRound：限制设置了圆角连接可以偏离其真实圆弧的最大距离（因为它需要无限数量的顶点才能完美地表示圆弧）。默认限制为0.25个单位尽管实际上精度永远不会优于0.5，因为圆弧坐标仍将舍入为整数值。当偏移具有非常大的坐标值的多边形（通常是缩放的结果）时，建议增加限制以在所有连接处保持一致的精度，因为在任何弧中允许的最大顶点数为222。（此硬编码上限为之所以选择这种方法，是因为用222个顶点构成的圆中的不精确度仅为其半径的1/10000，并且不仅创建大量的弧形顶点在计算上是昂贵的，而且还可能导致内存不足的问题。）

- jtSquare：由于将以1倍增量均匀地应用平方，因此将忽略limit参数。

必须先删除闭合路径中的自相交，然后再将路径传递给OffsetPaths。

用法:
```javascript
var paths = [
	[
		{"X":224,"Y":146},
		{"X":224,"Y":213},
		{"X":201,"Y":191},
		{"X":179,"Y":235},
		{"X":134,"Y":191},
		{"X":179,"Y":168},
		{"X":157,"Y":146}
	]
];
var offset_paths = ClipperLib.Clipper.OffsetPaths(paths, 10, ClipperLib.JoinType.jtRound, ClipperLib.EndType.etClosed, 0.25);
```

## ClipperLib.Clipper.OpenPathsFromPolyTree()
```c
Paths OpenPathsFromPolyTree(PolyTree polytree)
```
此函数从PolyTree结构中筛选出闭合路径，并仅返回路径结构中的开放路径。

用法:
```javascript
// ... polytree is populated automatically by Execute()
var lines = ClipperLib.Clipper.OpenPathsFromPolyTree(polytree);
```

## ClipperLib.Clipper.Orientation()
```c
Boolean Orientation(Path poly)
```
如果多边形区域大于等于0，则返回true。

方向只对闭合路径重要。如果顶点是按特定顺序声明的，则方向是指这些顶点围绕闭合路径前进的方向（顺时针或逆时针）。

方向也取决于轴方向：

- 在Y轴正向上显示中，如果多边形的方向是逆时针方向，则Orientation将返回true。

- 在Y轴正向下显示中，如果多边形的方向是顺时针，则“方向”将返回true。

![](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/orientation.png)

::: tip
- 自相交多边形的方向不确定，在这种情况下，此函数将不会返回有意义的值。
- 大多数2D图形显示库（例如GDI，GDI +，XLib，Cairo，AGG，Graphics32），甚至是SVG文件格式，其坐标原点都位于其各自视口的左上角，其Y轴向下增加。但是，某些显示库（例如Quartz，OpenGL）的坐标原点未定义，或者在其传统的左下角位置，其Y轴向上增大。
- 对于非零填充多边形，孔的方向必须与外部多边形的方向相反。
- 对于Clipper的Execute方法返回的解决方案中的闭合路径（多边形），外部多边形的方向始终为true，而洞孔多边形的方向始终为false（除非已启用ReverseSolution属性）。
:::

用法:
```javascript
var orientation = ClipperLib.Clipper.Orientation(polygon);
```

## ClipperLib.Clipper.PointInPolygon()
```c
Number PointInPolygon(IntPoint pt, Path poly)
```
如果为false，则返回0；如果pt在poly上，则返回-1；如果pt在poly中，则返回+1。

用法:
```javascript
var poly = [{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}];
var pt = new ClipperLib.IntPoint(50,50);
var inpoly = ClipperLib.Clipper.PointInPolygon(pt, poly);
// inpoly is 1, which means that pt is in polygon
```

## ClipperLib.Clipper.PolyTreeToPaths()
```c
Paths PolyTreeToPaths(PolyTree polytree)
```
此函数用于将多叉树结构转换为路径结构（无论它们是打开的还是关闭的）。要区分开放路径和闭合路径，请使用OpenPathsFromPolyTree或ClosedPathsFromPolyTree。

用法:
```javascript
// ... polytree is populated automatically by Execute()
var paths = ClipperLib.Clipper.PolyTreeToPaths(polytree);
```

## ClipperLib.Clipper.ReversePath()
```c
// Call Path.reverse().
```
反转路径中的顶点顺序（以及方向）。

用法:
```javascript
var path = [{"X":10,"Y":10},{"X":110,"Y":10},{"X":110,"Y":110},{"X":10,"Y":110}];
path.reverse();
// path is now [[{"X":10,"Y":110},{"X":110,"Y":110},{"X":110,"Y":10},{"X":10,"Y":10}]]
```

## ClipperLib.Clipper.ReversePaths()
```c
void ReversePaths(Paths p)
```
反转每个包含路径中的顶点顺序（以及方向）。

用法:
```javascript
var paths = [[{"X":10,"Y":10},{"X":110,"Y":10},{"X":110,"Y":110},{"X":10,"Y":110}]];
ClipperLib.Clipper.ReversePaths(paths);
// paths is now [[{"X":10,"Y":110},{"X":110,"Y":110},{"X":110,"Y":10},{"X":10,"Y":10}]]
```

## ClipperLib.Clipper.SimplifyPolygon()
```c
Paths SimplifyPolygon(Path poly, PolyFillType fillType = PolyFillType.pftEvenOdd)
```
从提供的多边形中删除自相交（通过使用指定的PolyFillType执行布尔并集操作）。具有不连续重复顶点（即“接触”）的多边形将被拆分为两个多边形。

![](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/simplify.png)![](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/simplify2.png)![](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/simplify3.png)

用法:
```javascript
// five-pointed star with self-intersections...
var five_pointed_star = [{"X":147,"Y":313},{"X":247,"Y":34},{"X":338,"Y":312},{"X":86,"Y":123},{"X":404,"Y":124}];
var ten_pointed_star = ClipperLib.Clipper.SimplifyPolygon(five_pointed_star, ClipperLib.PolyFillType.pftNonZero);
// ten_pointed_star is a ten-pointed star with no self-intersections
var fifteen_pointed_star = ClipperLib.Clipper.SimplifyPolygon(five_pointed_star, ClipperLib.PolyFillType.pftEvenOdd);
// fifteen_pointed_star is a fifteen-pointed star with no self-intersections
```

## ClipperLib.Clipper.SimplifyPolygons()
```c
Paths SimplifyPolygons(Paths polys, PolyFillType fillType = PolyFillType.pftEvenOdd)
```
与SimplifyPolygon中的功能相同，但参数是Paths类型。

用法:
```javascript
// five-pointed star with self-intersections...
var five_pointed_star = [[{"X":147,"Y":313},{"X":247,"Y":34},{"X":338,"Y":312},{"X":86,"Y":123},{"X":404,"Y":124}]];
var ten_pointed_star = ClipperLib.Clipper.SimplifyPolygons(five_pointed_star, ClipperLib.PolyFillType.pftNonZero);
// ten_pointed_star is a ten-pointed star with no self-intersections
var fifteen_pointed_star = ClipperLib.Clipper.SimplifyPolygon(five_pointed_star, ClipperLib.PolyFillType.pftEvenOdd);
// fifteen_pointed_star is a fifteen-pointed star with no self-intersections
```

## ClipperLib.Clipper.PreserveCollinear
```c
Boolean PreserveCollinear;
```
默认情况下，当三个或更多顶点在输入多边形（主题或剪辑）中共线时，剪辑器对象在剪辑之前移除“内部”顶点。启用后，PreserveColiner属性将阻止此默认行为允许这些内部顶点出现在解决方案中。

用法:
```javascript
var cpr = new ClipperLib.Clipper();
cpr.PreserveCollinear = true;
```

## ClipperLib.Clipper.ReverseSolution
```c
Boolean ReverseSolution;
```
当此属性设置为true时，Execute（）方法的solution参数中返回的多边形将具有与其正常方向相反的方向。

用法:
```javascript
var cpr = new ClipperLib.Clipper();
cpr.ReverseSolution = true;
```

## ClipperLib.Clipper.StrictlySimple
```c
Boolean StrictlySimple;
```
术语：
简单多边形是不自相交的多边形。弱简单多边形是包含“接触”顶点或“接触”边的简单多边形。
*严格简单多边形是不包含“接触”顶点或“接触”边的简单多边形。

如果顶点共享相同的坐标（且不相邻），则它们会“接触”。如果一条边的一个端点接触另一条边（不包括其相邻边），或者如果它们是共线和重叠的（包括相邻边），则该边会接触另一条边。

裁剪操作返回的多边形（请参见Clipper.Execute()）应始终为简单多边形。当StrictlySimply属性启用时，返回的多边形将严格简单，否则它们可能是弱简单的。确保多边形严格简单是计算开销很大的，因此默认情况下禁用此属性。

![](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/simplify3.png)![](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/simplify2.png)

在上图中，两个示例显示弱简单多边形被分解为两个严格简单多边形。（带箭头的轮廓旨在帮助可视化顶点顺序。）另见维基百科上关于简单多边形的文章。

用法:
```javascript
var cpr = new ClipperLib.Clipper();
cpr.StrictlySimple = true;
```

## ClipperLib.Clipper.ZFillFunction
```c
void ZFillCallback ZFillFunction;
```
仅在定义了预处理程序指令use_xyz时，才显示此属性。在这种情况下，IntPoint结构中将包含一个“ Z”成员，用户可以在其中存储自定义数据。裁剪解决方案中的大多数顶点将与输入（主题和裁剪）顶点相对应，但在边相交的任何地方也会有新的顶点。此属性将自定义回调函数分配给Clipper对象，以便可以将自定义'Z'值分配给这些交点顶点。（请注意，不相交顶点处解中的“ Z”值将简单地从匹配的输入顶点以及X和Y值中复制出来。）

库用户可以为新的相交顶点指定“ Z”值（否则这些值将保持为0）。定义相交线段的四个顶点将传递给回调函数（以及新的相交顶点），以帮助用户确定适当的Z值。

用法:
```javascript
var cpr = new ClipperLib.Clipper();
cpr.ZFillFunction = function (bot1, top1, bot2, top2, pt) { /* function body */ };
// or
var ClipCallback = function (bot1, top1, bot2, top2, pt) { /* function body */ };
cpr.ZFillFunction = ClipCallback;
```
