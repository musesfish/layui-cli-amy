; layui.define(function (e) {
    var MODE_NAME = "menu";

    /* 
     * 处理后台接口返回的左侧菜单数据，返回用户可以访问的所有路由路径
    */
    layui.use([], function () {
        layui.element.render('nav', 'layadmin-system-side-menu');
    });

    var menu = [
        'layout',
        'index',
        'user/login',
        'brower/support',
        'system/theme',
        'tips/404',
        'tips/error',
    ];
    
    if(layui.setter.runServeType === 'devServe' || layui.setter.runServeType === 'testServe'){
        var demo = [
            'demo/component/index',
            'demo/component/echart',
            'demo/component/auth',
            'demo/component/daterange',
            'demo/component/eleTree',
            'demo/component/company',
            'component/icon/index',
        ]
        menu = menu.concat(demo)
    }

    function getMenu() {
        var data = layui.data(layui.setter.menuKey).menu || [];
        data.forEach(function (i) {
            getPath(i);
        });
        return menu;
    };
    // 保存导航hash数组数组
    // 去除路由上的路由参数
    function getPath(item, path) {
        menu.push((path || '') + item.jumpUrl.replace(/\/.*?=.*/, ''));
        if (item.menus) item.menus.forEach(function (k) {
            getPath(k, (path || "") + item.jumpUrl.replace(/\/.*?=.*/, '') + "/")
        })
    };

    e(MODE_NAME, {
        getMenu: getMenu,
        menu: getMenu()
    })
})