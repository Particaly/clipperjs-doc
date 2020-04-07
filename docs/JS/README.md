## ClipperLib.JS.AreaOfPolygon()
```c
Number AreaOfPolygon(Path poly, Number scale = 1);
```

返回封闭路径的面积。如果路径已经按比例放大，则可以设置比例值以强制函数返回按比例缩小的区域。

用法
```javascript
var path = [{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}];
var area = ClipperLib.JS.AreaOfPolygon (path, 1);
// area is 10000
```

## ClipperLib.JS.AreaOfPolygons()
```c
Number AreaOfPolygons(Paths polys, Number scale = 1);
```
返回封闭路径的面积。如果已经放大，则可以设置比例值以强制功能返回缩小的区域。

用法
```javascript
var paths = [[{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}],
            [{X:20,Y:20},{X:20,Y:100},{X:100,Y:100},{X:100,Y:20}]];
var area = ClipperLib.JS.AreaOfPolygons (paths, 1);
// area is now 3600
```

## ClipperLib.JS.BoundsOfPath()
```c
IntRect BoundsOfPath(Path path, Number scale = 1);
```
返回一个IntRect对象，该对象描述Path的边界框。如果路径已经按比例放大，则可以设置比例值以强制函数返回按比例缩小的边界。

用法
```javascript
var path = [{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}];
var bounds = ClipperLib.JS.BoundsOfPath (path, 1);
// bounds is {"left":10,"top":10,"right":110,"bottom":110}
```

## ClipperLib.JS.BoundsOfPaths()
```c
IntRect BoundsOfPaths(Paths paths, Number scale = 1);
```
返回一个IntRect对象，该对象描述路径的边界框。如果已经按比例缩放，则可以设置比例值以强制函数返回按比例缩小的边界。

用法
```javascript
var paths = [[{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}],
            [{X:20,Y:20},{X:20,Y:100},{X:100,Y:100},{X:100,Y:20}]];
var bounds = ClipperLib.JS.BoundsOfPaths (paths, 1);
// bounds is {"left":10,"top":10,"right":110,"bottom":110}
```

## ClipperLib.JS.Clone()
```c
Path Clone(Path path);
Paths Clone(Paths paths);
```

制作一个或多个Path的深层副本，以便克隆IntPoint对象并且引用它。

用法
```javascript
var cloned_path = ClipperLib.JS.Clone(path);
// or
var cloned_paths = ClipperLib.JS.Clone(paths);
```

## ClipperLib.JS.Clean()
```c
Path Clean(Path path);
Paths Clean(Paths paths);
```
连接彼此太近的顶点，并且在未清理的情况下会导致偏移变形。
此函数不同于CleanPolygons和CleanPolygons，后者也清除共线顶点。
非常适合需要防止变形而不做任何其他事情的情况。

用法
```javascript
var cleaned_path = ClipperLib.JS.Clean (path, delta);
// or
var cleaned_paths = ClipperLib.JS.Clean (paths, delta);
```

## ClipperLib.JS.Lighten()
```c
Path Lighten(Path path, Number tolerance);
Paths Lighten(Paths paths, Number tolerance);
```
删除对视觉外观影响不大的点。如果中点位于或低于起点和终点之间线段的某个距离（公差），则删除中点。
有助于加速计算和渲染。

用法
```javascript
var scale = 100;
var lightened_path = ClipperLib.JS.Lighten(path, 0.1 * scale);
// or
var lightened_paths = ClipperLib.JS.Lighten(paths, 0.1 * scale);
```

## ClipperLib.JS.PerimeterOfPath()
```c
Number PerimeterOfPath(Path path, Boolean closed, Number scale = 1);
```
返回路径的周长。如果路径是封闭的（即多边形），则将第一个顶点的克隆添加到路径的末端，并在计算后将其删除以确保考虑整个（“多边形”）周长。

通过仅考虑现有顶点来测量开放路径（即线）。

如果路径以相同的方式返回，则将计算每个线段，这意味着返回的周长比视觉周长。

如果将坐标事先按某个比例因子（例如100）进行比例缩放，并且将比例参数提供给函数，则将返回比例缩小的实际周长。

用法
```javascript
var path = [{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}];
var polygonal_perimeter = ClipperLib.JS.PerimeterOfPath(path, true, 1);
// polygonal_perimeter is 400

// But...
var line_perimeter = ClipperLib.JS.PerimeterOfPath(path, false, 1);
// line_perimeter is 300
```

## ClipperLib.JS.PerimeterOfPaths()
```c
Number PerimeterOfPaths(Paths paths, Boolean closed, Number scale = 1);
```
返回路径中包含的各个路径的周长之和。另见PerimeterOfPath。

用法
```javascript
var paths = [[{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}],
            [{X:20,Y:20},{X:20,Y:100},{X:100,Y:100},{X:100,Y:20}]];
var polygonal_perimeter = ClipperLib.JS.PerimeterOfPaths (paths, true, 1);
// polygonal_perimeter is 720

var line_perimeter = ClipperLib.JS.PerimeterOfPaths (paths, false, 1);
// line_perimeter is 540
```

## ClipperLib.JS.ScaleDownPath()
```c
void ScaleDownPath(Path path, Number scale = 1);
```
按比例值划分路径的每个坐标。
用法
```javascript
var path = [{X:1000,Y:1000},{X:11000,Y:1000},{X:11000,Y:11000},{X:1000,Y:11000}];
ClipperLib.JS.ScaleDownPath (path, 100);
// path is [{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}];
```

## ClipperLib.JS.ScaleDownPaths()
```c
void ScaleDownPaths(Paths paths, Number scale = 1);
```
按比例值划分路径的每个坐标。
用法
```javascript
var paths = [[{X:1000,Y:1000},{X:11000,Y:1000},{X:11000,Y:11000},{X:1000,Y:11000}],
             [{X:2000,Y:2000},{X:2000,Y:10000},{X:10000,Y:10000},{X:10000,Y:2000}]];
ClipperLib.JS.ScaleDownPaths (path, 100);
// path is [[{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}],
//          [{X:20,Y:20},{X:20,Y:100},{X:100,Y:100},{X:100,Y:20}]];
```

## ClipperLib.JS.ScaleUpPath()
```c
void ScaleUpPath(Path path, Number scale = 1);
```
将路径的每个坐标乘以缩放系数，并使用Math.round（）舍入到最接近的整数。
用法
```javascript
var path = [{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}];
ClipperLib.JS.ScaleUpPath (path, 100);
// path is now [{X:1000,Y:1000},{X:11000,Y:1000},{X:11000,Y:11000},{X:1000,Y:11000}];
```

## ClipperLib.JS.ScaleUpPaths()
```c
void ScaleUpPaths(Paths paths, Number scale = 1);
```
将路径的每个坐标乘以缩放系数，并使用Math.round（）舍入到最接近的整数。
用法
```javascript
var paths = [[{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}],
            [{X:20,Y:20},{X:20,Y:100},{X:100,Y:100},{X:100,Y:20}]];
ClipperLib.JS.ScaleUpPaths (path, 100);
// path is now [[{X:1000,Y:1000},{X:11000,Y:1000},{X:11000,Y:11000},{X:1000,Y:11000}],
//              [{X:2000,Y:2000},{X:2000,Y:10000},{X:10000,Y:10000},{X:10000,Y:2000}]];
```

## ClipperLib.JS.PolyTreeToExPolygons()
```c
ExPolygons PolyTreeToExPolygons(PolyTree polytree)
```
把 PolyTree 转换为 ExPolygons.

用法
```javascript
var expolygons = ClipperLib.JS.PolyTreeToExPolygons(polytree);
```

## ClipperLib.JS.ExPolygonsToPaths()
```c
Paths ExPolygonsToPaths(ExPolygons expolygons)
```
把 ExPolygons 转换成 Paths.

用法
```javascript
var paths = ClipperLib.JS.ExPolygonsToPaths(expolygons);
```
