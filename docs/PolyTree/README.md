## PolyTree
PolyTree旨在作为只读数据结构，仅应用于接收来自多边形裁剪操作的解决方案。这是Paths结构的替代数据结构，它也可以接收裁剪解决方案。与“路径”结构相比，它的主要优点在于，它可以正确表示返回的多边形的父子关系，并且还可以区分开放路径和封闭路径。但是，由于PolyTree比Paths结构更复杂，并且由于处理起来在计算上更为昂贵（Execute方法的速度大约慢5-10％），因此仅在需要父子多边形关系或在需要父子多边形关系时才应使用它。开放路径被“剪断”。

可以将一个空的PolyTree对象作为解决方案参数传递给Clipper对象的Execute方法。裁剪操作完成后，此方法将返回PolyTree结构，该结构填充有表示解决方案的数据。

PolyTree对象是用于任何数量的PolyNode子对象的容器，每个包含的PolyNode都代表一个多边形轮廓（外部或孔多边形）。PolyTree本身是专门的PolyNode，其直接子代表示解决方案的顶级外部多边形。（其自己的Contour属性始终为空。）包含的顶级PolyNode可能包含自己的表示孔多边形的PolyNode子级，也可能包含表示嵌套的外部多边形等的子级。外部的子级始终是孔，而孔的子级始终是孔是外在的。

PolyTree也可以包含开放路径。开放路径将始终由顶级PolyNode表示。提供了两个函数以快速从多树中分离出打开路径和闭合路径-ClosedPathsFromPolyTree和OpenPathsFromPolyTree。

![](https://sourceforge.net/p/jsclipper/wiki/_discuss/thread/f3a2fc70/6d6f/attachment/polytree.png)
```
 polytree: 
    Contour = ()
    ChildCount = 1
    Childs[0]: 
        Contour = ((10,10),(100,10),(100,100),(10,100))
        IsHole = False
        ChildCount = 1
        Childs[0]: 
            Contour = ((20,20),(20,90),(90,90),(90,20))
            IsHole = True
            ChildCount = 2
            Childs[0]: 
                Contour = ((30,30),(50,30),(50,50),(30,50))
                IsHole = False
                ChildCount = 0
            Childs[1]: 
                Contour = ((60,60),(80,60),(80,80),(60,80))
                IsHole = False
                ChildCount = 0
```

## ClipperLib.PolyTree()
```c
PolyTree PolyTree()
```
返回PolyTree实例对象。

用法
```javascript
var polytree = new ClipperLib.PolyTree(); // creates PolyTree object
// cpr.Execute ...
```

## ClipperLib.PolyTree.Clear()
```c
void polytree.Clear()
```

此方法清除对象所包含的PolyTree的所有PolyNode子级。

Clear不需要显式调用。接受PolyTree参数的Clipper.Execute方法将在将其与新的PolyNode一起传播之前自动清除PolyTree对象。同样，PolyTree的析构函数还将自动清除任何包含的PolyNode。


## ClipperLib.PolyTree.GetFirst()
```c
PolyNode GetFirst()
```

此方法返回第一个外部多边形轮廓（如果有），否则返回空指针。

此函数几乎等效于调用Childs [0]，不同之处在于，当PolyTree对象为空（没有子代）时，调用Childs [0]将引发超出范围的异常。

用法
```javascript
var polynode = polytree.GetFirst();
```

## ClipperLib.PolyTree.Total()
```c
Number Total() // read only
```
返回包含在PolyTree中的多项式（多边形）的总数。不要将此值与ChildCount混淆，后者只返回PolyTree包含的直接子级（Childs）的数量。
用法
```javascript
var total = polytree.Total();
```
