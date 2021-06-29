---
title: About页面的自定义布局
date: 2021-06-27
author: Wayne.Wong
category: Blog
lang: zh-CN
tags: 
- Blog
- Chat
---

> 本博客使用的Maker主题并没有About页面的模板，所以花了点时间研究了页面的自定义布局，并给About页面写了个布局。

<!-- more -->

## 动机

单页面没有自定义布局时，显示的效果就会像本文一样。文章页会有文章信息、授权协议、打赏、评论系统等无关信息。本人并不喜欢这样的About页面，所以准备写个自定义布局。

## 实现过程

文章的布局可以使用`YAML front matter`来指定。例如：

```Yaml
---
layout: AboutLayout
---
```

文章会被渲染成 `.vuepress/components/AboutLayout.vue`布局。

因为本人的需求是不想要无关信息，其余样式保持不变，只需要把  
`node_modules\vuepress-theme-maker\components\Post.vue`的`Post.vue`  
`node_modules\vuepress-theme-maker\components\SideBar.vue`的`SideBar.vue`  
注释掉不要的信息，缝合进`AboutLayout.vue`即可。

## 成果

就是现在的About页面。

## 疑问点

缝合出自定义布局后，About页面能正常显示...一次。出现了刷新后样式丢失的bug。
没仔细研究过样式引用的流程，不知道样式是定义在哪个文件的，准备「万策尽きた」时，发现再import一次主题的Layout可解。额...

```JavaScript
import Layout from 'vuepress-theme-maker/layouts/Layout';
```

## 最后

虽然About内容在写这篇文章的时候还没写，本博客终于迈出了Hello World后的第一步。
