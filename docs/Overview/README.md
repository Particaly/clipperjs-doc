## 文档简述

Clipper.js可用来对线和多边形的裁剪和偏移
与其他的js库相比，主要有以下区别：

1. 它接受所有类型的多边形，包括自相交的多边形
2. 它支持多种多边形填充规则（EvenOdd，NonZero，Positive，Negative）
3. 相对于其他库而言，它非常快
4. 它还执行线和面偏移
5. 在数值上很健壮
6. 在免费软件和商业应用程序中均可免费使用

当前的Javascript Clipper版本： 6.4.2.2（C＃6.4.2）

原始C＃版本的作者和版权：
Angus Johnson。版权所有©2010-2017
许可，条款和条件：Boost软件许可

Javascript Clipper的作者和版权：
TimoKähkönen。版权所有©2012-2017
许可，条款和条件：Boost Software许可

Javascript Clipper使用Tom Wu的JSBN库的实现，该库具有BSD许可证。

## 术语

- 裁剪：通常是指从一组二维几何形状中删除（切除）矩形“剪裁”窗口之外的部分的过程。这可以通过将主题路径（直线和多边形）与剪切矩形相交来实现。从更一般的意义上讲，裁剪窗口不必是矩形，而可以是任何类型的多边形，甚至是多个多边形。同样，虽然裁剪通常是指相交运算，但在本文档中，它将指代四个布尔运算（相交，并集，差分和异或）之一。
- 路径：是有序的顶点序列，定义了一个单一的几何轮廓，该轮廓可以是直线（开放路径）或多边形（封闭路径）。
- 轮廓：路径的同义词。
- 线：或折线是包含2个或多个顶点的开放路径。
- 多边形：一般来说是一个二维区域，该区域由外部闭合路径界定，并且包含零个到多个“孔”。但是，在本文档中，多边形是指已知为闭合的路径。
- 孔：是多边形中不属于多边形的封闭区域。形成孔的外部边界的多边形称为孔多边形。
- 多边形填充规则：与路径列表一起，填充规则定义了多边形内部（即图形显示中的“填充”）和外部多边形所包围的区域。

## 分发包内容

ZIP压缩包包含Clipper库的源代码（已压缩和未压缩）。该库最初是用Delphi Pascal编写的，但随后也可以在C ++，C＃和Python中使用。每种语言的库源代码约为5000行。由于JSBN库和一些帮助器功能，JavaScript的实现更长，大约有7625行。

演示应用程序和示例未包含在分发包中。可以在[这里](http://jsclipper.sourceforge.net/6.4.2.2/)访问它们。示例应用程序展示了Clipper如何与SVG和Canvas一起使用。