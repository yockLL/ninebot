define(['jquery'], $ => {
    function Footer () {
       this.container = $("#footer-container");
       this.load();
    }

    $.extend(Footer.prototype, {
        //ES6对象增强写法
        load () {
          //header.html 加载到页面中
            this.container.load('/html/module/footer.html');
        }
    })

    return new Footer();
});