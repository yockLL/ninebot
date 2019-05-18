define(['jquery'], $ => {
    function Aside () {
        this.container = $("#aside-container");
        this.load() .then (() => {
            this.calcCartNum(); 
            this.goTop();
        });
    }

    $.extend(Aside.prototype, {
        load() {
            return new Promise(resolve => {
                this.container.load('/html/module/aside.html', () => {
                    resolve ();
                });
            });
        },


        calcCartNum () {
            let cart = localStorage.getItem('cart');
            let num = 0;
            if(cart) {
                //计算总量
                cart = JSON.parse(cart);
                //num放的可能是商品数量，也有可能是种类的数量，以总数量为例
                num = cart.reduce((n, shop) => {
                    n += shop.num;
                    return n;
                },0);
            }
            $("#total-num").html(num);
        },

        goTop () {
            $(".goTop").click(function(){
                let height = 100;
                $("html,body").animate({'scrollTop':0}, "normal");
              });
              
        },
        

    })

    return new Aside();
});
