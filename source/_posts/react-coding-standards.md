---
title: 如何写出优雅的组件
date: 2017-05-20 18:54:10
categories:
- 技术
tags: 
- react
- js
- 技术
thumbnail: /img/react-coding-standards.png
---

个人的 `react` 编码规范。不仅仅适用于 `react` 适用所有需要组件化的地方，比如 `ejs`。

<!-- more -->

这篇文章同时还发在了 [知乎专栏](https://zhuanlan.zhihu.com/p/27022251) ，喜欢的帮忙顶一下。

> 最近在做 mad 。github 十多天没绿了。

## 技术栈

我当前的使用的技术栈：

- react 15.4
- webpack 2.4
- typescript 2.1
- tslint + tslint-react
- styled-jsx 0.5
- babel + babel-preset-env + babel-preset-react
- 可选： redux react-router4

详情可以看我的 [`react-kit`](https://github.com/EYHN/react-kits)

最近在学习使用 [`recompose`](https://github.com/acdlite/recompose)有很多高效的高阶组件, 等我用上了再来更新(有生之年)。

## 组件类型

我把组件分为3种类型

- 业务组件
  处理业务逻辑，无样式，组件本身没有内容。

- 布局组件
  处理布局，有布局，组件本身没有内容，没有业务逻辑，但可以有动画逻辑。

- 样式组件
  负责显示内容，高复用性，使用事件和 `props` 与业务组件通讯，没有业务逻辑，但可以有动画逻辑。

## 编写纯组件

在 `react` 中继承自 `PureComponent` 类的为纯组件(pure component)。当组件更新时，如果组件的 `props` 和 `state` 都没发生改变，`render` 方法就不会触发，省去 `Virtual DOM` 的生成和比对过程，达到提升性能的目的。

编写纯组件也可以避免大量玄学问题，大幅度提升性能。

## 尽可能编写无状态组件

[无状态组件(stateless component)](https://github.com/vasanthk/react-bits/blob/master/patterns/01.stateless-functions.md)

无状态函数是定义高可重用性组件的好方法。他们不没有 `state`, 它们只是 `functions`。

``` js
const Greeting = () => <div>Hi there!</div>;

// They get passed props and context
const Greeting = (props, context) =>
  <div style={{color: context.color}}>Hi {props.name}</div>;
```

在 `typescript` 中无状态组件接口为 `React.SFC<P>`。

``` ts
const Greeting:React.SFC<{}> = () => <div>Hi there!</div>;
```

## 编写代理组件

样式组件 和 布局组件 尽量编写成代理组件(proxy component)。

代理组件指高级组件代理低级组件的全部 `props`。

``` js
const Button = props => <button type="button" {...props}>
```

在 `typescript` 中则要复杂一些:

``` ts
const Button:React.SFC<React.HTMLProps<HTMLButtonElement>> = 
    ({...other}) => <button type="button" {...other}/>;
```

## 状态管理

业务相关的所有状态应当位于业务组件中。

`state` 应该放在尽可能高级的组件中。理想情况是所有状态均由最顶层的一个组件管理。

如果应用需要管理多个业务组件，应该考虑使用 `redux`。

## 高阶组件处理副作用

[Higher Order Component](https://github.com/vasanthk/react-bits/blob/master/patterns/15.higher-order-component.md)

在编写业务组件是应当尽量保证业务逻辑是纯的，便于测试，可以使用高阶组件将异步操作隔离。

> 我很少用到高阶组件，应用复杂了直接上 `redux` ,可能还是我太菜了。

如果使用了 `redux` 就不再需要高阶组件了。

## 测试

我前端是不写测试的。。。

## 拒绝 jQuery

在 react 应用中，需要操作 dom 的场景已经很少了，我们不在需要 jQuery 这么庞大的库，浏览器 API 已经足够好用。

这里推荐一个教程 [You Don't Need jQuery](https://github.com/oneuijs/You-Dont-Need-jQuery)。教程有很多语言翻译包括简体中文。