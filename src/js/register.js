require(['require.config'], () => {
    require(['url','jquery'], (url) => {
        class Register {
            constructor () {
                this.emailInput = $("#inputEmail");
                this.passwordInput = $("#inputPassword");
                this.repeatPasswordInput = $("#inputRepeatPassword");
                this.nickname = $("#inputNickname");
                this.btn = $("#btn");
                this.bindEvents();
            }

            //给按钮绑事件
            bindEvents () {
                this.btn.on("click", () => {
                    console.log(this);
                    let email = this.emailInput.val(),
                        password = this.passwordInput.val(),
                        repeatPassword = this.repeatPasswordInput.val(),
                        nickname = this.nickname.val();
                        console.log(nickname);
                    $.ajax({
                        url: url.phpBaseUrl + "/user/register.php",
                        type: "post",
                        data: {email, password, nickname},
                        success: data => {
                           if(data.res_code === 1) {
                               alert(data.res_message + "，即将跳转至登录页");
                               location.href = 'login.html';
                           }else if(data.res_code === 0){
                               alert(data.res_message);
                           }
                        },
                        dataType: 'json'
                    })
                })
            }
        }

        new Register();
    })
})