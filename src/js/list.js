require(['require.config'], () => {
    require(['url','template', 'aside','header', 'footer'], (url, template, aside) => {
        class List {
            constructor () {
                // this.id = Number(location.search.slice(4));
                this.getData();
            }

            //获取列表数据
            getData () {
                $.get(url.rapBaseUrl + 'mallList/get', data => {
                    if(data.res_code === 1) {
                        this.renderData(data.res_body.list);
                    }  
                })
            }
            //数据渲染商品列表
            renderData (list) {
                let html = template("list-mall", {list});
                $("#list-container").html(html);
                aside.goTop();
            }
            
        }

        new List();
    })
})