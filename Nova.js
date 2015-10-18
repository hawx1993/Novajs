/**
 * Created by trigkit4 on 14/11/29.
 * Nova JavaScript framework, version 1.0.0
 *  (c) 2014-2015 trigkit4 http://segmentfault.com/u/trigkit4
 *  Nova is freely distributable under the terms of an MIT-style license.
 */

;(function (window) {

    window.Nova = window.$ = function (args) {
        return new Nova(args);
    };
    var core_version = '1.1.1';
    var class2Type = {},
        emptyArray = [],
        document = window.document,
        root = this,
        slice = emptyArray.slice;
    //为了不被覆盖  Nova不能被定义var or function Nova(){}
    //执行var inst = new Nova(); inst instanceof Nova成立
    Nova = function(args){
        this.elements = [];//创建一个空数组，用来存放节点对象

        //处理参数是字符串的情况
        if (typeof args == 'string') {
            //模拟css选择器，比如$('#selector')
            if (args.indexOf(' ') != -1) {  //参数不存在空格时返回-1
                var elements = args.split(' ');//将节点数组分割成字符串数组，并保存在elements中
                var tempNodes = [];//存放临时节点对象的数组，解决被覆盖的问题
                var parentNodes = [];//存放父节点
                for (var i = 0; i < elements.length; i++) {
                    if (parentNodes.length == 0) parentNodes.push(document);//如果没有父节点，就把document放入
                    switch (elements[i].charAt(0)) {
                        //处理id情况
                        case '#' :
                            tempNodes = [];	//清理临时节点
                            tempNodes.push(this.getId(elements[i].substring(1)));//
                            parentNodes = tempNodes;//保存父节点
                            break;
                        //处理class情况
                        case '.' :
                            tempNodes = [];
                            for (var j = 0; j < parentNodes.length; j++) {
                                var temps = this.getClass(elements[i].substring(1), parentNodes[j]);
                                for (var k = 0; k < temps.length; k ++) {
                                    tempNodes.push(temps[k]);
                                }
                            }
                            parentNodes = tempNodes;
                            break;
                        //处理标签情况
                        default :
                            tempNodes = [];
                            for (var m = 0; m < parentNodes.length; m++) {
                                var tags = this.getTag(elements[i], parentNodes[j]);
                                for (var n = 0; n < tags.length; n++) {
                                    tempNodes.push(tags[n]);
                                }
                            }
                            parentNodes = tempNodes;
                    }
                }
                this.elements = tempNodes;
            } else {
                //charAt(0)即#和.符号
                switch (args.charAt(0)) {
                    case '#' :
                        this.elements.push(this.getId(args.substring(1)));
                        break;
                    case '.' :
                        this.elements = this.getClass(args.substring(1));
                        break;
                    default :
                        this.elements = this.getTag(args);
                }
            }
            //处理参数是object的情况
        } else if (typeof args == 'object') {
            if (args != undefined) {
                this.elements[0] = args;
            }
            //处理参数是function的情况
        } else if (typeof args == 'function') {
            this.ready(args);
        }
    };

    /**************************** Nova.Fn ***********************************/
Nova.fn = Nova.prototype = {

        constructor: Nova,
        //$().Nova => 1.1.1
        Nova: core_version,
        //页面加载完成事件
        /* $(document).ready(function(){
            })
         */

        ready : function(fn){
            if(fn == null){
                fn = document;
            }
            var load = window.onload;
            if(typeof window.onload != 'function'){
                window.onload = fn;
            }else{
                window.onload = function () {
                    load();
                    fn();
                };
            }
        },

        eq : function (num) {
            var eles = this.elements[num];
            this.elements = [];
            this.elements[0] = eles;
            return this;
        },

        last : function(){
            return this.elements[this.elements.length - 1];//无法实现连缀
        },

        get: function(idx){
            return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length];
        },


        each: function(callback){
            emptyArray.every.call(this, function(el, idx){
                return callback.call(el, idx, el) !== false
            });
            return this
        },

        css : function(attr,value){
            for(var i=0; i < this.elements.length; i++){

                //判断参数长度为1的情况
                if(arguments.length ==1){
                    return getStyle(this.elements[i],attr);
                }
                this.elements[i].style[attr] = value;
            }
            return this;
        },

        length : function(){
            return this.elements.length;
        },

        index : function(){
            var children = this.elements[0].parentNode.children;
            for(var i=0;i < children.length;i++){
                if(this.elements[0] == children[i]) return i;
            }
        },

        getId : function (id) {
            return (typeof id !== 'string')?id : document.getElementById(id);
        },

        getClass : function(className,parentNode){
            var node = null,temps = [];
            if(parentNode != undefined){
                node = parentNode;
            }else{
                node = document;
            }
            var nodes = node.getElementsByTagName('*');
            for(var i=0;i<nodes.length;i++){
                if(nodes[i].className == className){
                    temps.push(nodes[i]);
                }
            }
            return temps;
        },

        getTag : function (tag,parentNode) {
            var node = null,temps = [];
            if (parentNode != undefined) {//parentNode与undefined同是对象，数据类型要一致
                node = parentNode;
            } else {
                node = document;
            }
            var tags = node.getElementsByTagName(tag);
            for (var i = 0; i < tags.length; i ++) {
                temps.push(tags[i]);
            }
            return temps;
        },

        html : function(str){
            for(var i=0;i<this.elements.length;i++){
                this.elements[i].innerHTML = str;
            }
            return this;
        },

        //click方法，传递一个匿名函数fn
        click : function(fn){
            for(var i=0;i < this.elements.length;i++){
                this.elements[i].onclick = fn;
            }
        },

        opacity : function(num){
            for (var i = 0; i < this.elements.length; i ++) {
                this.elements[i].style.opacity = num / 100;
                this.elements[i].style.filter = 'alpha(opacity=' + num + ')';
            }
            return this;
        },

        //跨浏览器获取可视窗口大小
        getWindow : function () {
            if(typeof window.innerWidth !='undefined') {
                return{
                    width : window.innerWidth,
                    height : window.innerHeight
                }

            } else{
                return {
                    width : document.documentElement.clientWidth,
                    height : document.documentElement.clientHeight
                }
            }
        },

        //跨浏览器获取滚动条位置,sp=scroll position
        getSP : function () {
            return {
                top : document.documentElement.scrollTop || document.body.scrollTop,
                left : document.documentElement.scrollLeft || document.body.scrollLeft
            }
        },

        //设置物体居中显示
        center : function (width,height) {
            var top = (getWindow().height - height) / 2 + getSP().top;
            var left = (getWindow().width - width) / 2 + getSP().left;
            for(var i =0;i<this.elements.length;i++){
                this.elements[i].style.top = top + 'px';
                this.elements[i].style.left = left + 'px';
            }
            return this;
        },

        //hide 方法
        hide : function(){
            for(var i=0;i<this.elements.length;i++){
                this.elements[i].style.display = 'none'
            }
            return this;
        },

        //show方法
        show : function(){
            for(var i =0;i<this.elements.length;i++){
                this.elements[i].style.display = 'block'
            }
            return this;
        },

        //获取节点attr属性
        attr : function(attr,value){
            for(var i=0;i<this.elements.length;i++){
                if(arguments.length == 1){
                    return this.elements[i].getAttribute(attr);
                }else if(arguments.length ==2){
                    this.elements[i].setAttribute(attr,value)
                }
            }
            return this;
        },

        slice: function(){
            return $(slice.apply(this, arguments));
        },

        //跨浏览器移除事件
        removeEvent : function(element,type,handler){
            if(element.removeEventListener){
                element.removeEventListener(type,handler,false);//false采取事件冒泡
            }else if(element.detachEvent){
                element.detachEvent('on' + type,handler);
            }else{
                element['on' + type] = null;//清空事件
            }
        },

        //阻止事件默认行为
        preventDefault : function(ev){
            if(ev.preventDefault){
                ev.preventDefault();
            }else {
                ev.returnValue = false;
            }
        },

        //获取事件目标
        getTarget : function(ev){
            return ev.target || ev.srcElement;
        },

        //hover事件
        hover : function(fnOver,fnOut){
            for(var i=0;i<this.elements.length;i++){
                addEvent(this.elements[i],'mouseover',fnOver);
                addEvent(this.elements[i],'mouseout',fnOut);
            }
            return this;
        },

        //bind
        bind : function(type,fn){
            for(var i=0; i <this.elements.length;i++){
                addEvent(this.elements[i],type,fn);
            }
            return this;
        },
        //获取某一个节点，并返回这个节点对象
        ret : function (num) {
            return this.elements[num];
        },

        addClass : function(className){
            for (var i = 0; i < this.elements.length; i ++) {
                if (!hasClass(this.elements[i], className)) {
                    this.elements[i].className += ' ' + className;
                }
            }
            return this;
        },

        type : function (obj) {
            return obj == null ? String(obj) : class2Type[toString.call(obj)] || 'object'
        },
        //创建cookie
        setCookie : function(name, value, expires, path, domain, secure) {
        var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
        if (expires instanceof Date) {
            cookieText += '; expires=' + expires;
        }
        if (path) {
            cookieText += '; expires=' + expires;
        }
        if (domain) {
            cookieText += '; domain=' + domain;
        }
        if (secure) {
            cookieText += '; secure';
        }
        document.cookie = cookieText;
    },

     //获取cookie
      getCookie : function(name) {
        var cookieName = encodeURIComponent(name) + '=';
        var cookieStart = document.cookie.indexOf(cookieName);
        var cookieValue = null;
        if (cookieStart > -1) {
            var cookieEnd = document.cookie.indexOf(';', cookieStart);
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
        }
        return cookieValue;
       }



    };

    //判断class是否存在
    function hasClass(element, className) {
        return element.className.match(new RegExp('(\\s|^)' +className +'(\\s|$)'));
    }

    //插件入口
    Nova.prototype.extend = function (name,fn) {
        Nova.prototype[name] = fn;
    };

    //跨浏览器添加事件绑定
    function addEvent(obj, type, fn) {
        if (typeof obj.addEventListener != 'undefined') {
            obj.addEventListener(type, fn, false);
        } else {
            //创建一个存放事件的哈希表(散列表)
            if (!obj.events) obj.events = {};
            //第一次执行时执行
            if (!obj.events[type]) {
                //创建一个存放事件处理函数的数组
                obj.events[type] = [];
                //把第一次的事件处理函数先储存到第一个位置上
                if (obj['on' + type]) obj.events[type][0] = fn;
            } else {
                //同一个注册函数进行屏蔽，不添加到计数器中
                if (addEvent.equal(obj.events[type], fn)) return false;
            }
            //从第二次开始我们用事件计数器来存储
            obj.events[type][addEvent.ID++] = fn;
            //执行事件处理函数
            obj['on' + type] = addEvent.exec;
        }
    }
    addEvent.ID = 1;

    //执行事件处理函数
    addEvent.exec = function (event) {
        var e = event || addEvent.fixEvent(window.event);
        var es = this.events[e.type];
        for (var i in es) {
            es[i].call(this, e);
        }
    };

    //同一个注册函数进行屏蔽
    addEvent.equal = function (es, fn) {
        for (var i in es) {
            if (es[i] == fn) return true;
        }
        return false;
    };
    //跨浏览器获取Style
    function getStyle(element, attr) {
        var value;
        if (typeof window.getComputedStyle != 'undefined') {//W3C
            value = window.getComputedStyle(element, null)[attr];
        } else if (typeof element.currentStyle != 'undeinfed') {//IE
            value = element.currentStyle[attr];
        }
        return value;
    }


})(window);



