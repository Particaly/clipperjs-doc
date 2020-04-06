## ClipperBase
ClipperBase是Clipper的抽象基类。ClipperBase对象不应直接实例化。

## ClipperBase.AddPath()
```c
Boolean AddPath(Path pg, PolyType polyType, Boolean closed);
```
可以通过AddPath()方法单独添加任意数量的subject和clip paths，也可以通过AddPaths()方法或者甚至同时使用这两种方法将任意数量的subject和clip paths添加到剪辑任务中。

“subject”路径可以是开放的（直线）或闭合的（多边形），甚至是两者的混合，但是“subject”路径必须始终是封闭的。Clipper允许多边形同时修剪线和其他多边形，但不允许线条修剪线或多边形。

对于闭合路径，方向应符合将通过Clipper的Execute方法传递的填充规则。

路径坐标范围：
路径坐标必须在±4503599627370495（sqrt（2 ^ 106 -1）/ 2）之间，否则在尝试将路径添加到Clipper对象时会引发范围错误。如果坐标可以保持在±47453132（sqrt（2 ^ 53 -1）/ 2）之间，则可以通过避免使用大整数数学来在较大范围内提高性能（大约40-50％）。

返回值：
如果路径为空或几乎为空，则该函数将返回false。在以下情况下，路径几乎为空：

它的顶点少于2个。
它有2个顶点，但不是开放路径
顶点都是共线的，不是开路

用法:
```javascript
var cpr = new ClipperLib.Clipper();
var path = [{"X":10,"Y":10},{"X":110,"Y":10},{"X":110,"Y":110},{"X":10,"Y":110}];
cpr.AddPath(path, ClipperLib.PolyType.ptSubject, true);
```

## ClipperBase.AddPaths()
```c
Boolean AddPaths(Paths ppg, PolyType polyType, Boolean closed);
```
与AddPath()中的功能相同，但参数是path。

用法:
```javascript
var cpr = new ClipperLib.Clipper();
var paths = [[{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}],
             [{X:20,Y:20},{X:20,Y:100},{X:100,Y:100},{X:100,Y:20}]];;
cpr.AddPaths(paths, ClipperLib.PolyType.ptSubject, true);
```

## ClipperBase.Clear()
```c
void Clear();
```
Clear方法删除任何现有的主题和剪辑多边形，允许在不同多边形集上的剪辑操作中重用剪辑器对象.

用法:
```javascript
cpr.Clear();
```
