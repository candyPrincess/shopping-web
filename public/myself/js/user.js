$.ajax({
    url: "/user/queryUserMessage",
    type: "get",
    async: false,
    success: function (res) {
        // console.log(res.error);
        if (res.error == 400) {
            location.href = "login.html";
           
        }
    }
})


$(function () {
    mui('body').on('tap', 'a', function () {
        window.top.location.href = this.href;
    });

    //判断是否登录了,且下面的代码不执行,登录之后才能执行,
    //ajax异步请求,改为同步,必须执行完这步代码才能执行下次代码


    // 登录进去就要像数据库发送请求
    $.ajax({
        url: "/user/queryUserMessage",
        type: "get",
        success: function (res) {          
                // console.log(res);
                var html = template("userTpl", res);
                $(".my_user").html(html);
        }
    })


    $(".logout").on("click", function () {
        // 退出登录 清除数据库的数据,然后跳转
        $.ajax({
            url: "/user/logout",
            type: "get",
            success: function (res) {
                if (res.success) {
                    location.href = "index.html";
                } else {
                    mui.toast("退出登录失败");
                }
            }
        })
    })

    $(".modifyPass").on("click", function () {
        location.href = "modify.html";
    })
    $(".addressAll").on("click", function () {
        location.href = "address.html";
    })

})