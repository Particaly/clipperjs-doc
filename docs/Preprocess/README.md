## 预处理器定义
```java
Boolean ClipperLib.use_int32
Boolean ClipperLib.use_xyz
Boolean ClipperLib.use_lines
Boolean ClipperLib.use_deprecated
```
ClipperLib.use_int32:
未在Javascript中实现.

ClipperLib.use_xyz:
将“Z”成员添加到IntPoint，只需少量性能开销。有关详细信息，请参见Clipper的Clipper.ZFillFunction属性。（默认情况下禁用）

ClipperLib.use_lines:
启用打开路径（线）剪裁。如果禁用了线裁剪，通常性能会有非常小的提高（即~5%）。（默认启用）

ClipperLib.use_deprecated:
使使用版本6之前的Clipper版本开发的代码能够编译而无需更改。这将公开在以后的更新中删除的兼容代码。（默认启用）

用法
```javascript
ClipperLib.use_xyz = true;
ClipperLib.use_lines = true;
ClipperLib.use_deprecated = true;
```

## 四舍五入
通过为多边形坐标使用整数类型，Clipper库已经能够避免数字鲁棒性的问题，这些问题可能会给几何计算带来麻烦。[原始文档](http://www.angusj.com/delphi/clipper/documentation/Docs/Overview/Rounding.htm)中讨论了与整数舍入相关的问题及其可能的解决方案。
