define(['jquery', 'cookie'], $ => {
    function Header () {
       this.container = $("#header-container");
       this.load().then(() => {
            this.isLogin();

       });
    }

    $.extend(Header.prototype, {
        //ES6对象增强写法
        load () {
          //header.html 加载到页面中
          return new Promise(resolve => {
            this.container.load('/html/module/header.html', () =>{
                resolve();
            });
          })
        },

        isLogin () {
            this.loginBtn = $("#unlogin");
            this.login = $("#login");
            this.nameSpan = $("#username-span");
            this.logout = $("#quit");
            let username = $.cookie("username");
            if(username){
                this.loginBtn.hide();
                this.login.show();
                this.nameSpan.html(username);
            }
            this.logout.on('click', () => {
                if(confirm("确定要退出吗")){
                    $.removeCookie("username", {path: '/'});
                    this.loginBtn.show();
                    this.login.hide();
                }
            })
        },
    })

    return new Header();
});