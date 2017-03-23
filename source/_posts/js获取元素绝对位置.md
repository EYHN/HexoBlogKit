---
title: js获取元素绝对位置
date: 2017-03-20 19:30:50
categories:
- 技术
tags: 
- 技术
- js
- html
thumbnail: /img/二次元/源氏半藏.jpg
primarycolor: deepPurple
accentcolor: lightBlue
---

众：哇！不会吧！博主你这都不会！

我：我...我还真的不会。

<!--more-->

今天搞事情想搞个react动画框架。需要获取元素的绝对位置。

百度： <span style="font-size:12px;color:#888">不要和我说google 一样的货色</span>

``` js
//获取元素的纵坐标 
function getTop(e){ 
  var offset=e.offsetTop; 
  if(e.offsetParent!=null) offset+=getTop(e.offsetParent); 
  return offset; 
} 
//获取元素的横坐标 
function getLeft(e){ 
  var offset=e.offsetLeft; 
  if(e.offsetParent!=null) offset+=getLeft(e.offsetParent); 
  return offset; 
} 
```

嗯 很合理嘛 Element.offsetTop + 递归。

可偶然发现这是获取元素在文档流中的位置，但 transform 属性是不会改变文档流中的位置的。好，我们换一个方法。结果百度 google翻了几页都是这一个方法

![](/img/表情/喷.png)


继续寻找，突然想到jq，试了一下jq的offset方法，完美支持 transform 属性，mmp。

经查看jq源码，方法如下：

``` js
offset: function( options ) {
  // Preserve chaining for setter
  if ( arguments.length ) {
    return options === undefined ?
      this :
      this.each( function( i ) {
        jQuery.offset.setOffset( this, options, i );
      } );
  }

  var doc, docElem, rect, win,
    elem = this[ 0 ];

  if ( !elem ) {
    return;
  }

  // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
  // Support: IE <=11 only
  // Running getBoundingClientRect on a
  // disconnected node in IE throws an error
  if ( !elem.getClientRects().length ) {
    return { top: 0, left: 0 };
  }

  rect = elem.getBoundingClientRect();

  doc = elem.ownerDocument;
  docElem = doc.documentElement;
  win = doc.defaultView;

  return {
    top: rect.top + win.pageYOffset - docElem.clientTop,
    left: rect.left + win.pageXOffset - docElem.clientLeft
  };
}
```

查阅mdn的 [getBoundingClientRect()](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/getBoundingClientRect) 词条。

>Range.getBoundingClientRect() 返回一个 ClientRect 对象，该对象限定了选定的文档对象的内容，该方法返回了一个矩形，这个矩形包围了该文档对象中所有元素的边界矩形集合（译者注：关于边界矩形可以参考 [Minimum Bouding Rectangles](http://en.wikipedia.org/wiki/Minimum_bounding_rectangle)）。 

以及 [getClientRects()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getClientRects#Syntax)

> 返回值是ClientRect对象集合，该对象是与该元素相关的CSS边框。每个ClientRect对象包含一组描述该边框的只读属性——left、top、right和bottom，单位为像素，**这些属性值是相对于视口的top-left的。**即使当表格的标题在表格的边框外面，该标题仍会被计算在内。

注意上文的 `这些属性值是相对于视口的top-left的。` 也就是说算出元素在页面的绝对位置还有加上视口滚动的距离。

所以jq的实现就是：

``` js
{
  top: 元素顶部到视口顶部 + 视口到页面顶部 - 文档偏移
  left: 元素左侧到视口左侧 + 视口到页面左侧 - 文档偏移
}
```

<span style="font-size:12px;color:#888">封面画师: [squidsmith](http://www.pixiv.net/member.php?id=3273478)</span>