require(['require.config'], () => {
    require(['url','template', 'header', 'footer', 'aside'], (url, template) => {
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
                console.log(template);
                let html = template("list-mall", {list});
                $("#list-container").html(html);
            }
            
        }

        new List();
    })
})