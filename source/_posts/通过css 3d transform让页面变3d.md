---
title: 通过css 3d transform让页面变3d
date: 2017-03-26 09:48:29
categories:
- 技术
tags: 
- 技术
- css
thumbnail: /img/通过css 3d transform让页面变3d/cover.jpg
primarycolor: blueGrey
accentcolor: blueGrey
---

通过`css 3d transform`让页面变3d。

<!-- more -->

我只是实在想不到写什么，水文罢了。

顺便试试hexo的`html`,连js都可以写。

## 预览

<button onClick="postCSS3d()">3D</button>

<script>
  (function(){
    var flag = false;
    $("body").css({
      "transition": "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms"
    })
    function postCSS3d(){
      if(flag == false){
        flag = true;
        $("body").css({
            "transform": "perspective(6000px) rotateY(30deg) translateZ(-1000px) translateX(550px)",
            "transform-style": "preserve-3d",
            "perspective-origin": "50% 1000px",
            "height": "100%",
            "overflow": "scroll",
            "pointer-events": "auto"
        })
        $("html").css({
            "height": "100%"
        })
      }else{
        flag = false;
        $("body").css({
            "transform": "inherit",
            "transform-style": "inherit",
            "perspective-origin": "inherit",
            "height": "inherit",
            "overflow": "inherit",
            "pointer-events": "inherit"
        })
        $("html").css({
            "height": "inherit"
        })
      }
    }
    window.postCSS3d = postCSS3d;
  })()
</script>

## 代码

``` html
<button id="3Dtransition">3D</button>

<script>
  (function(){
    var flag = false;
    $("body").css({
      "transition": "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms"
    })
    function postCSS3d(){
      if(flag == false){
        flag = true;
        $("body").css({
            "transform": "perspective(6000px) rotateY(30deg) translateZ(-1000px) translateX(550px)",
            "transform-style": "preserve-3d",
            "perspective-origin": "50% 1000px",
            "height": "100%",
            "overflow": "scroll",
            "pointer-events": "auto"
        })
        $("html").css({
            "height": "100%"
        })
      }else{
        flag = false;
        $("body").css({
            "transform": "inherit",
            "transform-style": "inherit",
            "perspective-origin": "inherit",
            "height": "inherit",
            "overflow": "inherit",
            "pointer-events": "inherit"
        })
        $("html").css({
            "height": "inherit"
        })
      }
    }
    $("3Dtransition").onClick(postCSS3d);
  })()
</script>
```

## PS

我发现有些人js是定义是写在全局的[@halyul](https://halyul.com)，这不是好习惯，变量多了容易重复定义。

``` js
(function(){
 ...
})()
```

这种写法可以避免这个问题。

等同于：

``` js
function a(){

}

a()
```

## 再见

<span style="font-size:12px;color:#888">封面画师: [Miv4t](http://www.pixiv.net/member.php?id=11246082)</span>