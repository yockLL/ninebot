require(['require.config'], () => {
    require(['url', 'template', 'swiper', 'header', 'footer', 'aside'], (url, template, Swiper) => {
        class Index {
            constructor () {
                this.getType();
                this.getBot();
                this.getParts();
                this.getSegway();
                this.banner();
            }
            //首页轮播图
            banner() {
                var mySwiper = new Swiper ('.swiper-container', {
                    
                    autoplay: {
                        delay: 3000,
                        stopOnLastSlide: false,
                        disableOnInteraction: true,
                    },
                    loop: true, // 循环模式选项
                    
                    // 如果需要分页器
                    pagination: {
                      el: '.swiper-pagination',
                      clickable: true
                    },
                    
                    // 如果需要前进后退按钮
                    navigation: {
                      nextEl: '.swiper-button-next',
                      prevEl: '.swiper-button-prev',
                    },
                    
                })        
            }
            //获取分类数据
            getType () {
                //ajax请求数据
                $.get(url.rapBaseUrl + 'index/type', data => {
                    // console.log(data);
                    if(data.res_code === 1) {
                       this.renderType(data.res_body.list); 
                    }
                })
            }

            //数据渲染推荐商品
            renderType (list) {
                let html = template("list-recommend", {list});
                $("#list-container").html(html);
            }

            //获取Ninebot栏数据
            getBot () {
                $.get(url.rapBaseUrl + 'index/bot', data => {
                   if(data.res_code === 1) {
                       this.renderBot(data.res_body.list);
                   }
                })
            }

            //数据渲染Ninebot
            renderBot (list) {
                let html = template("list-ninebot", {list});
                $("#bot-container").html(html);
            }

            //获取相关配件栏数据
            getParts () {
                $.get(url.rapBaseUrl + 'index/parts', data => {
                    if(data.res_code === 1) {
                        this.renderParts(data.res_body.list);
                    }
                })
            }

            //数据渲染相关配件栏
            renderParts (list) {
                let html = template("list-parts", {list});
                $("#parts-container").html(html);
            }

            //获取segway栏数据
            getSegway () {
                $.get(url.rapBaseUrl + "index/segway", data => {
                    if(data.res_code === 1) {
                        this.renderSegway(data.res_body.list);
                    }
                })
            }

            //数据渲染segway栏数据
            renderSegway (list) {
                let html = template("list-segway", {list});
                $("#segway-container").html(html);
            }
        }

        new Index ()
    })
})