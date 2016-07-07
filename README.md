# Novajs

- 轻量级`js`框架，用于操作`DOM`元素，处理跨浏览器事件和模拟`css`选择器
- demo文件夹为一款基于`Nova.js`开发的轻量级图片延迟加载插件

## Overview

### API

>`$().ready`

DOM ready downloads

```js
$().ready(function(){})

```

>`$().eq()`

选取带有指定 index 值的元素。

>`$().last()`

选取最后一个元素    

>`$().get()`

获取元素

>`$().css(attr,value)`

为所选元素设置css属性值，当只有attr属性的时候，返回属性值

>`$().length()`

返回元素数值

>`$().html(str)`

返回DOM元素的innerHTML

>`$().click(fn)`

click事件

>`$().opacity(num)`

设置元素透明度，传入数值


>`$().getWindow()`

跨浏览器获取可视窗口大小

>`$().getSP()`

跨浏览器获取滚动条位置，返回top和left值


>`$().center(width,height)`

设置物体居中对齐

>`$().hide()`

hide方法，设置物体隐藏不显示，也不占据文档流

>`$().show()`

show方法，显示隐藏的DOM元素

>`$().attr(attr,value)`

获取节点的attribute属性或设置其属性值


>`$().slice()`

slice切片方法

>`$().removeEvent(element,type,handler)`

跨浏览器移除事件

>`$().preventDefault(event)`

阻止事件的默认行为

>`$().getTarget(event)`

获取事件的目标，taregt/srcElement


>`$().hover(fnOver,fnOut)`

hover事件

>`$().each(fn)`

each方法

>`$().bind(type,fn)`

bind方法

>`$().ret(num)`

获取某一个节点，并返回这个节点对象


>`$().addClass(className)`

为DOM元素添加类

>`$().type()`

判断数据类型

>`$().setCookie(name, value, expires, path, domain, secure)`

设置cookie


>`$().getCookie(name)`

获取cookie

>`$().hasClass(element,className)`

判断class是否存在

>`$().addEvent(obj,type,fn)`

跨楼兰器添加事件绑定

>`$().getStyle(element,attr)`

跨浏览器获取style
