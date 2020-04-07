## ClipperOffset
ClipperOffset类封装了对打开和关闭路径进行偏移（充气/放气）的过程。

此类替换了现在不建议使用的，不灵活的OffsetPaths函数。可以使用不同的偏移量（Delta）多次调用Execute方法，而不必重新分配路径。现在，可以在单个操作中混合使用开放路径和封闭路径来执行偏移。而且，OffsetPaths的Limit参数的双重功能不仅使某些用户感到困惑，而且还阻止了EndType为etRound且JoinType为jtMiter时分配的自定义RoundPrecision。

偏移闭合路径（多边形）时，重要的是：

1. 它们的方向是一致的，因此外部多边形具有相同的方向，而孔具有相反的方向
2. 他们不会自我相交。

## ClipperLib.ClipperOffset()
```c
ClipperOffset ClipperOffset(Number miterLimit = 2.0, Number roundPrecision = 0.25);
```
ClipperOffset构造函数接受两个可选参数：MiterLimit和ArcTolerance。这两个参数对应于同名的属性。MiterLimit仅在JoinType为jtMiter时相关，ArcTolerance仅在JoinType为jtRound或EndType为etOpenRound时相关。
用法
```javascript
var co = new ClipperLib.ClipperOffset(2.0, 0.25);
```

## ClipperLib.ClipperOffset.AddPath()
```c
void AddPath(Path path, JoinType jointype, EndType endtype);
```
添加ClipperOffset对象的路径以准备偏移。此方法可以多次调用。

用法
```javascript
var path = [{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}];
var co = new ClipperLib.ClipperOffset(2, 0.25);
co.AddPath(path, ClipperLib.JoinType.jtMiter, ClipperLib.EndType.etClosedPolygon);
```

## ClipperLib.ClipperOffset.AddPaths()
```c
void AddPaths(Paths paths, JoinType jointype, EndType endtype);
```
将路径添加到ClipperOffset对象以准备偏移。此方法可以多次调用。

用法
```javascript
var paths = [[{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}],
             [{X:20,Y:20},{X:20,Y:100},{X:100,Y:100},{X:100,Y:20}]]; 
var co = new ClipperLib.ClipperOffset(2, 0.25);
co.AddPaths(paths, ClipperLib.JoinType.jtMiter, ClipperLib.EndType.etClosedPolygon);
```

## ClipperLib.ClipperOffset.Clear()
```c
void Clear();
```

此方法清除ClipperOffset对象中的所有路径，允许分配新路径。
用法
```javascript
var path = [{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}];
var co = new ClipperLib.ClipperOffset();
co.AddPath(path, ClipperLib.JoinType.jtRound, ClipperLib.EndType.etClosedPolygon);
co.Clear();
```

## ClipperLib.ClipperOffset.Execute()
```c
void Execute(Paths solution, Number delta);
void Execute(PolyTree polytree, Number delta);
```
此方法有两个参数。第一个是将接收偏移操作结果的结构（PolyTree或Paths）。第二个参数是所提供路径的偏移量-负增量值以收缩多边形，正增量值以扩展多边形。

可以多次调用此方法，将相同的路径偏移不同的量（即使用不同的增量）。

::: warn 关于缩放的注意事项：

因为ClipperOffset使用整数坐标，所以您必须缩放坐标以保持精度并使圆弧平滑-在整数输入的情况下也是如此。

Javascript Clipper为此提供了四个功能：ScaleUpPath，ScaleUpPaths，ScaleDownPath和ScaleDownPaths。

如果JoinType为jtRound或EndType为etRound，则强烈建议进行缩放。
:::

用法
```javascript
var subj = new ClipperLib.Paths();
var solution = new ClipperLib.Paths();
subj[0] = [{"X":348,"Y":257},{"X":364,"Y":148},{"X":362,"Y":148},{"X":326,"Y":241},{"X":295,"Y":219},{"X":258,"Y":88},{"X":440,"Y":129},{"X":370,"Y":196},{"X":372,"Y":275}];
var scale = 100;
ClipperLib.JS.ScaleUpPaths(subj, scale);
var co = new ClipperLib.ClipperOffset(2, 0.25);
co.AddPaths(subj, ClipperLib.JoinType.jtRound, ClipperLib.EndType.etClosedPolygon);
co.Execute(solution, -7.0);
ClipperLib.JS.ScaleDownPaths(subj, scale);
//draw solution with your own drawing function...
DrawPolygons(solution, 0x4000FF00, 0xFF009900);
```

## ClipperLib.ClipperOffset.ArcTolerance
```c
Number ArcTolerance
```

首先，仅当JoinType = jtRound和/或EndType = etRound时，此字段/属性才相关。

由于展平的路径永远无法完美地表示圆弧，因此在偏移操作中近似圆弧时，此字段/属性会指定最大可接受的不精确度（“公差”）。较小的值将“平滑度”提高到一个点，尽管这会降低性能，并会增加创建顶点的弧度。

默认的ArcTolerance为0.25单位。这意味着，展平路径偏离“真实”弧的最大距离将不超过0.25个单位（在四舍五入之前）。

将公差减小到0.25以下不会改善平滑度，因为顶点坐标仍将舍入为整数值。达到亚整数精度的唯一方法是通过偏移前后的坐标缩放（请参见下面的示例）。

使ArcTolerance成为偏移增量（弧半径）的合理分数非常重要。相对于偏移增量的较大公差将产生较差的电弧近似值，但同样重要的是，非常小的公差将大大降低偏移性能，同时提供不必要的精度。当偏移其坐标已缩放以保持浮点精度的多边形时，这很可能是一个问题。

示例：想象一组使用圆角连接要偏移10个单位的多边形（在浮点坐标中定义），解决方案是将浮点精度保持到至少6个小数位。
为了保持这种浮点精度，并且考虑到Clipper和ClipperOffset都在整数坐标上运行，则在偏移之前，多边形坐标将按比例放大108（并四舍五入为整数）。偏移增量和ArcTolerance都将需要使用相同的因子进行缩放。如果将ArcTolerance保留为默认的0.25单位不缩放，则解决方案中的每个弧将包含44个千个顶点的一部分，而最终的弧不精确度将为0.25×10-8单位（即，一旦缩放被反转）。但是，如果在最终的非缩放解决方案中不可接受的单位为0.1单位，则应将ArcTolerance设置为0.1×scale_factor（0.1×108）。现在，如果将缩放比例均等地应用于ArcTolerance和Delta Offset，

用法
```javascript
var co = new ClipperLib.ClipperOffset();
co.ArcTolerance = 1.23;
```

## ClipperLib.ClipperOffset.MiterLimit
```c
Number MiterLimit
```
此属性以增量的倍数设置最大距离，该距离可以在应用平方之前将顶点从其原始位置偏移。（通过从原始顶点开始以1×增量距离“切断”斜角来截断斜接）。

MiterLimit的默认值为2（即两次增量）。这也是允许的最小MiterLimit。如果斜切不受限制（即不进行任何平方运算），则以非常锐角偏移将产生不可接受的长“尖峰”。

使用较大的MiterLimit（25）导致的一个狭窄角度的“尖峰”偏移示例...
![](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/miterlimit.png)

用法
```javascript
var co = new ClipperLib.ClipperOffset();
co.MiterLimit = 4.1;
```

