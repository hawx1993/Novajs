//2015.10.17 By trigkit4
//图片延迟加载插件
//获取某一个元素到最外层顶点的位置
//IE的offsetTop属性只能获取到父元素节点的位置

$().extend('delay', function (delay) {
    function offsetTop(element){
        var top = element.offsetTop;
        var parent = element.offsetParent;
        while(parent != null){
            top += parent.offsetTop;
            parent = parent.offsetParent;
        }
        return top;
    }

    var load = $('.loading');//载入img图片的class样式
    $(window).bind('scroll', function () {
        for(var i = 0;i < load.length();i++){
            var _that = load.ret(i);
            if($().getWindow().height + $().getSP().top >= offsetTop(_that)){
                $(_that).attr('src',$(_that).attr('xsrc'));
            }
        }
    });
});


  
