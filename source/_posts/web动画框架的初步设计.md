---
title: web动画框架的初步设计
date: 2017-03-22 19:38:00
categories:
- 技术
tags: 
- js
- html
- 开源
- 技术
thumbnail: /img/web动画框架的初步设计/cover.jpg
primarycolor: teal
accentcolor: green
---

我希望有一天webApp能够达到原生应用的用户体验。

<!-- more -->

*最后证实是重复造轮子，人家还比我造的好太多，大家都散了吧。 （ 让我哭一会*
[https://github.com/berzniz/react-overdrive](https://github.com/berzniz/react-overdrive)

<br>

<br>

- - -

> 第一次写这么复杂的东西，我的语文水平我自己清楚，看不懂的可以直接到下面评论区夸我了。

## ~~缘起~~

我是怎么喜欢上material design的？ 多半是因为这张炫酷的图。

![](/img/web动画框架的初步设计/炫酷ui.gif)

哇！炫酷！流畅！

我立即搜索material design的前端框架，发现没有一款可以实现这种效果的。

什么？？？？ 我大前端连区区一个动画都搞不定！！！

> codepen上的虽然有类似的特效，但从复用性，性能等方面考虑都没有能作为框架的。

于是开始造轮之路。

## 效果

初步实现的效果图：

![](/img/web动画框架的初步设计/效果图.gif)

> 效果可能不是很好，可能是因为没有调整动画曲线，不过这都是小问题。
> 源码需要重构，不好意思拿出来。感兴趣的话可以联系我。

## 思路

我们将前面的炫酷ui可以分成两部分。

![](/img/web动画框架的初步设计/分割.png)

上面这两个界面分开来的话，相信对各位前端大神都是小菜一碟的吧。

这个框架的思路就是用程序来自动补间。

我们在每个元素身上放个key。

![](/img/web动画框架的初步设计/key.png)

先记录下所有被标记的元素的位置。

页面改变后将其自动补间到新的位置。包括高度宽度等css属性。

嗯，但这个补间怎么做？`js`？`css transition`？

显然`css transition`是更高效的选择，要使用`css transition`的前提就是页面的转换不能破坏这个元素。

现有路由库如：`react-router`等，都是删掉原来的元素，填入新的元素，所以`css transition`是行不通的。

然而我选了一种特别极端的方法，添加一个布局层。

## 布局层

![](/img/web动画框架的初步设计/float.png)

上图红色部分就是布局层，布局层没有显示，没有动画，由路由负责管理。

图片中有内容的元素是绝对定位的，存在在布局层之上，不受路由管理，称为`Plane`(面)。

用程序把`Plane`放在对应的布局层之上，设置高度宽度，加上`css transition`。当布局层发送改变时，刷新`Plane`的位置，高度，宽度，内容。这个过程中`Plane`是不会被重建的于是`css transition`就产生了补间动画。

> 得益于react的 vdom 和 jsx 我们可以按正常的方式写元素，然后把他们渲染在其他地方。

- - -

再说下[这个站](https://themes.materializecss.com/pages/demo#0)

这个站也有布局转换的过渡效果。

![](/img/web动画框架的初步设计/垃圾1.png)![](/img/web动画框架的初步设计/垃圾2.png)

可以看到布局变化后，原来的元素并没有被清理，codepen上许多方案也有这种缺陷，页面一多，就会有很多元素，肯定不行。

这篇文章的方法会真正释放掉旧的元素，也算个优点。

## 结尾

如果你有更好的方法欢迎与我讨论。

<span style="font-size:12px;color:#888">封面画师: [秋月](http://www.pixiv.net/member.php?id=3376987)</span>