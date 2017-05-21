---
title: 使用 dokku 自建 PaaS 平台
date: 2017-04-13 10:57:29
categories:
- 技术
tags: 
- 运维
- 教程
- 技术
thumbnail: /img/dokku-get-start/cover.jpg
primarycolor: blueGrey
accentcolor: blueGrey
---

一条命名测试，发布，部署一个全新的应用。

专心开发，省心运维。

<!-- more -->

## 什么是 PaaS

> PaaS是Platform-as-a-Service的缩写，意思是平台即服务。 把服务器平台作为一种服务提供的商业模式。通过网络进行程序提供的服务称之为SaaS(Software as a Service)

## PaaS 的好处

只用 PaaS 平台可以帮软件开发者省去发布和部署的过程，让开发者专注于开发过程。

> 如果你是一个网站站长，想要建立一个网站。不采用云服务，你所需要的投入大概是：买服务器，安装服务器软件，编写网站程序。现在你追随潮流，采用流行的云计算，如果你采用IaaS服务，那么意味着你就不用自己买服务器了，随便在哪家购买虚拟机，但是还是需要自己装服务器软件而如果你采用PaaS的服务，那么意味着你既不需要买服务器，也不需要自己装服务器软件，只需要自己开发网站程序如果你再进一步，购买某些在线论坛或者在线网店的服务,这意味着你也不用自己开发网站程序，只需要使用它们开发好的程序，而且他们会负责程序的升级、维护、增加服务器等，而你只需要专心运营即可，此即为SaaS。

https://www.zhihu.com/question/20387284/answer/28514161

## Heroku

Heroku 是目前最屌的 PaaS 平台，支持超级多语言，插件机制。免费！

缺点是在国内速度慢，稳定性欠佳。

## Dokku

[Github](https://github.com/dokku/dokku)

[![Build Status](https://img.shields.io/circleci/project/dokku/dokku/master.svg?style=flat-square "Build Status")](https://circleci.com/gh/dokku/dokku/tree/master) [![Ubuntu Package](https://img.shields.io/badge/package-ubuntu-brightgreen.svg?style=flat-square "Ubuntu Package")](https://packagecloud.io/dokku/dokku) [![Arch Package](https://img.shields.io/badge/package-arch-brightgreen.svg?style=flat-square "Arch Package")](https://aur.archlinux.org/packages/dokku/) [![IRC Network](https://img.shields.io/badge/irc-freenode-blue.svg?style=flat-square "IRC Freenode")](https://webchat.freenode.net/?channels=dokku) [![Slack Group](https://img.shields.io/badge/irc-slack-blue.svg?style=flat-square "Slack Group")](https://glider-slackin.herokuapp.com/) [![Documentation](https://img.shields.io/badge/docs-viewdocs-blue.svg?style=flat-square "Viewdocs")](http://dokku.viewdocs.io/dokku/) [![OpenCollective](https://opencollective.com/dokku/sponsors/badge.svg?style=flat-square)](#sponsors) [![OpenCollective](https://opencollective.com/dokku/backers/badge.svg?style=flat-square)](#backers) [![Gratipay](https://img.shields.io/gratipay/dokku.svg?style=flat-square)](https://gratipay.com/dokku/)

Docker powered mini-Heroku. The smallest PaaS implementation you've ever seen.

> Docker 驱动的迷你 Heroku。你所见过的最小的 PaaS 实现。

## 安装

推荐系统为 Debian 8.2 x64 , ubuntu 有坑。

``` bash
wget https://raw.githubusercontent.com/dokku/dokku/v0.9.4/bootstrap.sh
sudo DOKKU_TAG=v0.9.4 bash bootstrap.sh
```

> 截止目前 Dokku 版本为 0.9.4 , 不同版本的安装步骤可能不同哦。

然后在你的浏览器中输入站点的域名或 ip 。

![](/img/dokku-get-start/1.png)

> git生成公钥可以 百度 或 google

接下来在服务器上创建 app

此处创建的应用名为 `pixiv-api-server` ，于是在服务器运行

> dokku apps:create pixiv-api-server

然后把代码 push 到 `dokku` 上。

在本机运行

``` bash
git remote add dokku dokku@s.huaji8.top:pixiv-api-server

git push dokku master
```

然后访问 app 的链接 http://pixiv-api-server.s.huaji8.top

![](/img/dokku-get-start/2.png)

app 已经在运行啦！