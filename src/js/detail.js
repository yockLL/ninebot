require(['require.config'], () => {
    require(['url','template','aside', 'header','footer', 'zoom', 'fly'], (url, template, aside) => {
        class Detail {
            constructor () {
              this.init();  
              this.addCart();
              this.buyNow();
            }
            //获取id值，请求数据，详情页初始化
            init () {
              //获取id值
              let id = Number(location.search.slice(4));
              //请求数据
              $.get(url.rapBaseUrl + 'detail/get', {id}, res => {
                //   console.log(res);
                  if(res.res_code ===1 ){
                     let {data} = res.res_body;
                     data = {...data, id};//data展开，添加id：id 若接口为真实接口，不需要这句代码
                     this.data = data; //把当前数据存下来
                     this.render(data);
                  }
              })
            }
            
            //用请求到的数据渲染页面
            render(data) {
                $("#detail-container").html(template("detail", {data})); 
                this.zoom();//渲染结束后，调放大镜方法
                aside.goTop();
            }

            //事件委托完成加购物车,"#detail-container"父级容器，"#cart"事件源-加购物车按钮
            addCart() {
                $("#detail-container").on('click', '#cart',  e => {
                    console.log(this.data.imgs[0]);
                    //完成抛物线加购物车动画
                    $(`<img src='${this.data.imgs[0]}' style='width:30px;height:30px;border-radius:50%;display:block;'>`).fly({
                        start: {
                            left: e.clientX,
                            top: e.clientY
                        },
                        end: {
                            left: $("#total-num").offset().left,
                            top: $("#total-num").offset().top
                        },
                        onEnd: function () {
                            // console.log(aside);
                            this.destroy(); //销毁抛物体
                            aside.calcCartNum();// 调用一次计算购物车数量的方法
                        }
                      
                    });

                    //let id = $(this).attr("data-id"); //列表页自定义属性取id，详情页可以不用
                    //获取这条id对应的数据
                    //把this.data 存localStorage里

                    //先取出cart
                    let cart = localStorage.getItem('cart');
                    if(cart) {
                        //已经存过购物车了
                        //判断有没有当前的商品
                        cart = JSON.parse(cart);
                        // console.log(cart);
                        let index = -1;
                        if(cart.some((shop, i) => {
                            index = i;
                            return shop.id === this.data.id;
                        })) {
                            //有这条数据
                            cart[index].num++;
                        }else{
                            //没有这条数据
                            cart.push({...this.data, num: 1});
                        }

                    }else{
                        //购物车为空
                        //第一次加购物车的时候，商品数量+1，从0变成1；
                        cart = [{...this.data, num: 1}];
                    }
                    //再重新存cart
                    localStorage.setItem('cart', JSON.stringify(cart));
                })
            } 

            //放大镜插件
            zoom() {
                $(".zoom-img").elevateZoom({
                    gallery:'box',
                    cursor: 'pointer',
                    galleryActiveClass: 'active',
                    borderSize:'1',    
                    borderColor:'#888'
                });
            }

            buyNow() {
                $("#detail-container").on('click', '#buy',  () => {
                    location.href = '/html/cart.html';
                }) 
            }    


        }
        new Detail();
    })
})