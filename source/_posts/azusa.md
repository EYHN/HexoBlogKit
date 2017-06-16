---
title: WEBGL驱动的音乐展示器 - Azusa
date: 2017-06-01 10:31:29
categories:
- 发布
tags: 
- web
- 发布
- 技术
thumbnail: /img/azusa/cover.jpg
primarycolor: brown
accentcolor: blueGrey
---

> 懒！所以直接把 README 粘贴上来啦。
> 最近玩 osu 把手打断啦 qwq。

项目 [github](https://github.com/EYHN/Azusa)

# Azusa

[![Author](https://img.shields.io/badge/author-EYHN-blue.svg?style=flat-square)](https://delusion.coding.me)[![QQ](https://img.shields.io/badge/QQ-1106996185-blue.svg?style=flat-square)](http://wpa.qq.com/msgrd?v=3&uin=&site=qq&menu=yes)[![Email](https://img.shields.io/badge/Emali%20me-cneyhn@gmail.com-green.svg?style=flat-square)]()[![npm version](https://badge.fury.io/js/azusa.svg)](https://badge.fury.io/js/azusa)

![](/img/azusa/azusa.jpg)

A WEBGL Audio Spectrum Music Visualizer.

![](/img/azusa/example.gif)

# How to use

- webpack
  ```
  npm install azusa --save
  ```
  ```
  import Azusa from 'azusa'
  ```

# example

```
const azusa = new Azusa({
  view: document.getElementById('app') as HTMLCanvasElement,
  subdivisionSize: 1024,
  cutEnd: 256
});

azusa.audio.load(testSound, undefined, (xhr: any) => {
  console.log((xhr.loaded / xhr.total * 100) + '% loaded');
});

azusa.audio.Volume = 0.5;

window.addEventListener('resize', () => {
  azusa.resize(window.innerWidth, window.innerHeight);
})
```

[Click here to demo](https://eyhn.github.io/Azusa/example)