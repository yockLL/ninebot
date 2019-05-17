define(['jquery'], $ => {
    function Header () {
       this.container = $("#header-container");
       this.load();
    }

    $.extend(Header.prototype, {
        //ES6对象增强写法
        load () {
          //header.html 加载到页面中
            this.container.load('/html/module/header.html');
        }
    })

    return new Header();
});