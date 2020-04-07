## PolyNode
PolyNode封装在PolyTree容器中，并一起提供一个数据结构，该数据结构表示Clipper的Execute方法返回的多边形轮廓的父子关系。

PolyNode对象代表一个多边形。它的IsHole属性指示它是外部还是孔。PolyNode可以拥有任意数量的PolyNode子代（Childs），其中外部多边形的子代是孔，而孔的子代是（嵌套）外部多边形。

## ClipperLib.PolyNode()
```c
PolyNode PolyNode() // read only
```
创建新的PolyNode对象。

用法
```javascript
var polynode = new ClipperLib.PolyNode();
```

## ClipperLib.PolyNode.ChildCount()
```c
Number ChildCount() // read only
```
返回PolyNode对象直接拥有的PolyNode子代的数目。
用法
```javascript
var count = polynode.ChildCount();
```

## ClipperLib.PolyNode.Childs()
```c
Array < PolyNode > Childs() // read only
```
多项式数组。外多项式子节点包含空穴多项式，空穴多项式子节点包含嵌套的外多项式。

用法
```javascript
var childs = polynode.Childs();
```
## ClipperLib.PolyNode.Contour()
```c
Path Contour() // read only
```
返回包含任意数量顶点的路径列表。
用法
```javascript
var contour = polynode.Contour();
```

## ClipperLib.PolyNode.GetNext()
```c
PolyNode GetNext()
```

返回的Polynode将是第一个子节点（如果有），否则是下一个兄弟节点，否则是父节点的下一个兄弟节点等。
通过在循环中调用GetFirst（）后跟GetNext（），可以非常容易地遍历多叉树，直到返回的对象是空指针。。。

用法
```javascript
var polytree = new ClipperLib.PolyTree();
//call to Clipper.Execute method here which fills 'polytree'

var polynode = polytree.GetFirst();
while (polynode)
{
  //do stuff with polynode here

  polynode = polynode.GetNext();
}
```

## ClipperLib.PolyNode.IsHole()
```c
Boolean IsHole() // read only
```
当PolyNode的多边形（轮廓）是孔时返回true。
外部多边形的子对象始终是孔，并且孔的子对象始终是（嵌套的）外部多边形。
PolyTree对象的IsHole属性未定义，但其子对象始终是顶级外部多边形。
用法
```javascript
var ishole = polynode.IsHole();
```
## ClipperLib.PolyNode.Parent()
```c
PolyNode Parent(); // read only
```
返回父多项式。
PolyTree对象（也是PolyNode）没有父对象，将返回空指针。

用法
```javascript
var parent = polynode.Parent();
```

## ClipperLib.PolyNode.IsOpen
```c
Boolean IsOpen // read only property
```

当对开放轮廓（路径）执行剪裁操作时，返回true。只有顶级多项式才能包含开放轮廓。

用法
```javascript
var isopen = polynode.IsOpen;
```
