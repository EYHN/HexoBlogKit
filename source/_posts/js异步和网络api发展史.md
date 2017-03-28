---
title: js异步和网络Api发展史
date: 2017-03-27 19:06:50
categories:
- 技术
tags: 
- 技术
- js
- web
thumbnail: /img/js异步和网络api发展史/cover.jpg
primarycolor: white
accentcolor: grey
---

> 从ajax到fetch，从回调到async，滑稽带你领略js异步和网络Api发展史。
> 仅仅是速览不会深入

<!-- more -->

js是事件驱动的语言，单进程单线程。js主线程中有一个`Event Loop`（事件循环）。

## js运行顺序

js先执行一遍所有js文件，然后进入`Event Loop`，等到有事件进入，就执行事件处理程序，执行完后再次回到`Event Loop`。

举个例子:

``` js
setTimeout(()=>{
  console.log("hello");
},0);
//死循环
while(true){
}
```

> 如果你在浏览器中运行，页面会卡死（在一些浏览器中仍可以滚动），因为js不执行完，浏览器不会做任何响应。

上面的代码永远不会输出hello，因为`setTimeout(...,0)`，虽然是延时0ms，但还是会在下一个事件循环中被调用。

而后面的`while`循环是死循环，js引擎永远执行不完，所以不会进入事件循环的，也就永远执行不到`timeout`里的代码

更详细的介绍可在[阮老师的博客](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)中看见。

## 异步

所以啥是异步呢？

我们先讲异步的反义词同步。

> 同步就是在发出一个功能调用时，在没有得到结果之前，该调用就不返回。

比如你发出一个网络请求请求一个数据，程序一直等待数据返回，不返回就不继续执行，这就是同步。

异步要智能得多。在网络请求没有返回之前程序还会继续执行。

延迟一秒在不同语言中同步、异步的不同写法:

JS 异步
``` js
console.log(1);
setTimeout(()=>{
  console.log(2);
},1000);
console.log(3);
//输出 1 3 2
```

Java 同步
``` java
System.out.print(1);
//延迟1000ms
Thread.sleep(1000);
System.out.print(2);
System.out.print(3);
//输出 1 2 3
```

显然`Java`的同步跟符合人类的思想，顺序执行非常简单。

但`JS`的优势也特别明显，在延迟时程序不会卡死，而是继续执行下去。

## 回调（callback）

回调是JS异步编程最常见的方式。

[回调函数（callback）是什么？(逼乎)](https://www.zhihu.com/question/19801131)

``` js
function callback(){
  console.log("hello");
}

setTimeout(callback,1000);
```

上面的`callback()`就作为回调函数，在1000ms后会被调用。

## Ajax

回到我们的主题，运用最广泛的网络api `ajax`就是以回调方式使用的。

``` js
var xmlhttp;
xmlhttp=new XMLHttpRequest();
//定义回调函数
xmlhttp.onreadystatechange=function()
{
	//如果请求完成 且 返回状态码为200
	if (xmlhttp.readyState==4 && xmlhttp.status==200)
	{
		//输出内容
		console.log(xmlhttp.responseText);
	}
}
xmlhttp.open("GET","https://about.huaji8.top/links.json",true/*异步运行*/);
//发送
xmlhttp.send();
```

> 复制到浏览器`console`可以运行。

> `jquery`封装的ajax写法要比原版简单的多，对这是原版。

> ajax也可以同步运行，只要将`XMLHttpRequest.open()`最后一个参数改成`false`，就是同步运行，执行`send()`后浏览器会卡住，直到请求返回。

## Promise （承诺）

Promise是一种更高级的回调接口。

> 详细的介绍在这[ECMAScript 6 入门](http://es6.ruanyifeng.com/#docs/promise)，`Promise`的好处千千万，建议大家全部使用`Promise`，`jquery`的所有异步api也全部支持`Promise`

> ES6 原生支持 Promise ， 在不支持的浏览器上可以使用垫片库 [es6-promise](https://github.com/stefanpenner/es6-promise)

下面是一个将`setTimeout()`改造成`Promise`的例子。

``` js
//返回一个Promise 就可以无限then()啦 还可以用catch()捕获异常
function setTimeoutP(ms){
	//创建Promise 如果成功就调用resolve，失败就调用reject
	return new Promise((resolve,reject)=>{
		setTimeout(resolve,ms);
	})
}

setTimeoutP(1000).then(()=>{
	console.log('Hello');
	// 返回Promise 可以在then()中继续执行
	return setTimeoutP(1000);
}).then(()=>{
	console.log('world');
	// 返回数据 可以在then()中获取
	return 123;
}).then((r)=>{
	console.log(r);
})
//一秒后输出Hello
```

## fetch

fetch 是新的网络api 基于 Promise 设计。在旧的浏览器上可以使用 [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch)，这个api是 node 和 浏览器环境通用的，实现同构应用必备的库。

> 注：同构(isomorphic/universal)就是使前后端运行同一套代码的意思，后端一般是指 NodeJS 环境。

范例
``` js
fetch("https://about.huaji8.top/links.json")
	.then((e)=>{return e.json()})
	.then((e)=>{console.log(e)});
```

> 尝试在浏览器`console`中运行

## Generator 函数

`Generator 函数` 是 `ES6` 提供的语法，不过很快就被 `ES2017` 的 `async 函数` 代替，所以不多说了，感兴趣的可以看[ECMAScript 6 入门](http://es6.ruanyifeng.com/?search=fetch&x=0&y=0#docs/generator)

> 第一次看到 `Generator 函数` 是在 `unity` 中的协程，现在js也有这个语法了。

## async 函数

重头来了，这是目前最屌的写法，真正用同步的写法写异步程序。

> async 实际是 `Generator 函数` 的语法糖， `Generator` 才是技术

我们继续拿上面建的 `setTimeoutP()` 举例。

``` js
//返回一个Promise
function setTimeoutP(ms){
	//创建Promise 如果成功就调用resolve，失败就调用reject
	return new Promise((resolve,reject)=>{
		setTimeout(resolve,ms);
	})
}

async function asyncDelay(){
	// await可以拿到Promise的返回值
	let O = await fetch("https://about.huaji8.top/links.json")
		.then((e)=>{return e.json()})
	await setTimeoutP(1000)
	console.log(O);
	//一秒后输出 https://about.huaji8.top/links.json 内容
}

asyncDelay();
```

> 尝试在浏览器`console`中运行

## async 异常处理

`async` 可以以同步的方式编写异常处理。

``` js
async function asyncDelay(){
	try{
		let O = await fetch("https://about.huaji8.top/links.json")
			.then((e)=>{return e.json()})
	}catch(e){
		//输出异常
		console.log(e)
		....
	}
	await setTimeoutP(1000)
	console.log(O);
}
```

是不是超级方便呢。

关于`async`的更多信息，可以查看[ECMAScript 6 入门](http://es6.ruanyifeng.com/#docs/async)或[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction)