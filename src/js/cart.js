require(['require.config'], () => {
    require(['template', 'aside', 'header', 'footer'], (template, aside) => {
        class Cart {
            constructor (Selector) {
                this.container = document.querySelector(Selector);
                this.allCheck = document.querySelector("#allCheck");
                this.moneyContainer = $("#moneyContainer");
                this.check = null;
                this.n = 0;
                this.allMoney = 0;
                this.init(); 
            }

            init () {
                let cart = localStorage.getItem('cart');
                if(cart){
                    //渲染列表
                    cart = JSON.parse(cart);
                    this.render(cart);
                }else{
                    $(".empty").removeClass("hide");
                    $(".list-container").addClass("hide");
                }
                if(cart.length === 0) {
                    $(".empty").removeClass("hide");
                    $(".list-container").addClass("hide");
                }
                
            }

            render(cart) {
                $("#cart-container").html(template('cart-template', {cart}));
                this.check = Array.from($(".p-checkbox"));
                this.bindEvents();
                aside.goTop();
                // console.log(this.check);
            }

            bindEvents () {
                let _this = this;
                    // price = $('.goods-price');
                let cart = localStorage.getItem('cart');
                cart = JSON.parse(cart);
                //加号绑定事件  
                $("#cart-container").on("click", '.plus', (e) => {
                    let plusId = e.currentTarget.getAttribute("data-id");
                    let count = Number(e.currentTarget.previousElementSibling.value);
                    let price = Number(e.currentTarget.parentNode.parentNode.previousElementSibling.innerHTML);
                    let sum = Number(e.currentTarget.parentNode.parentNode.nextElementSibling.innerHTML);
                    count++; 
                    e.currentTarget.previousElementSibling.value = count;
                    for(let i = 0; i < cart.length; i++){
                        if(cart[i].id == plusId){
                            cart[i].num = count;
                            localStorage.setItem("cart", JSON.stringify(cart));
                            break;
                        }
                    }
                    e.currentTarget.parentNode.parentNode.nextElementSibling.innerHTML = price * count;
                    aside.calcCartNum();

                })
                //减号绑定事件
                $("#cart-container").on("click", '.minus', (e) => {
                    let minusId = e.currentTarget.getAttribute("data-id");
                    let count = Number(e.currentTarget.nextElementSibling.value);
                    let price = Number(e.currentTarget.parentNode.parentNode.previousElementSibling.innerHTML);
                    let sum = Number(e.currentTarget.parentNode.parentNode.nextElementSibling.innerHTML);
                    if(count > 1){
                        count--;  
                    }else{
                        count = 1;
                    }
                    e.currentTarget.nextElementSibling.value = count;  
                    for(let i = 0; i < cart.length; i++){
                        if(cart[i].id == minusId){
                            cart[i].num = count;
                            localStorage.setItem("cart", JSON.stringify(cart));
                            break;
                        }
                    }   
                    e.currentTarget.parentNode.parentNode.nextElementSibling.innerHTML = price * count;
                    aside.calcCartNum();
                })
                //删除事件
                $("#cart-container").on('click', '.goods-action', (e) => {
                    let dataId = e.currentTarget.getAttribute("data-id");
                    // let cart = localStorage.getItem('cart');
                    let flag = false;
                    // cart = JSON.parse(cart);
                    for(var i = 0; i < cart.length; i++) {
                        if(cart[i].id == dataId) {
                            let list = e.currentTarget.parentNode.parentNode;
                            cart.splice(i, 1);
                            localStorage.setItem("cart", JSON.stringify(cart));
                            list.remove();
                            break;
                        }

                    }
                    aside.calcCartNum();
                    if(cart.length === 0){
                        $(".empty").removeClass("hide");
                        $(".list-container").addClass("hide"); 
                    }
                       
                })

                //给所有的单选按钮绑事件
                this.check.forEach(check => {
                    check.onchange = () => {
                        this.checkChange(check);
                    }
                })

                //给全选按钮绑事件
                this.allCheck.onchange = this.allcheckChange.bind(this);
            }

            checkChange (check) {
                let box = check.children[0];
                this.n += box.checked ? 1 : -1;
                this.allCheck.checked = this.n === this.check.length;
                this.calcMoney ();
            }

            allcheckChange () {
                this.check.forEach(check => {
                    let box = check.children[0];
                    box.checked = this.allCheck.checked;
                })
                this.n = this.allCheck.checked ? this.check.length : 0;
                this.calcMoney();
            }

            
            calcMoney () {
                this.allMoney = 0;
                let allList = Array.from($('.cart-item'));
                // console.log($('.goods-sum'))
                for(var i = 0; i < allList.length; i++) {
                    if($('.checkbox-p')[i].checked ){
                        this.allMoney += Number($('.goods-sum')[i].innerHTML);
                    }
                }
                // console.log(this.allMoney);
          
                this.moneyContainer.html(this.allMoney);
            }
        }

        new Cart("#list-container");
    })
})