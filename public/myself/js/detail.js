$(function () {
    mui('my_footer').on('tap', 'a', function () {
        window.top.location.href = this.href;
      });


    var id = getParamsByUrl(location.href, "id");
    console.log(id);


    $.ajax({
        url: "/product/queryProductDetail",
        type: "get",
        async: false,
        data: {
            id: id
        },
        success: function (res) {
            // console.log(res);
            var html = template("detailTpl", res);
            // console.log(html);
            $("#detailBox").html(html);
        }
    })

    // 初始化轮播图
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
    });
    //动态添加的需要手动初始化,必须要改为同步请求,发送有数据后才能初始化
    mui(".mui-numbox").numbox();
    // mui($(".mui-numbox")).numbox();



    //获取尺码
    var size;
    $("#detailBox").on("click", ".detailSize span", function () {
        $(this).addClass("active").siblings().removeClass("active");
        size = $(this).html();
    })
    //获取库存
    var num;
    $("#detailBox").on("click", "#increaseNum", function () {
        num++;
        num = $("#numberAll").val();
        // console.log(num);
    })
    $("#detailBox").on("click", "#reduceNum", function () {
        num--;
        num = $("#numberAll").val();
        // console.log(num);
    })



    $("#detailBox").on("tap", ".addCart", function () {
        
        if (!size) {
            alert("请选择尺码");
            return;
        }
        if (!num) {
            alert("请选择数量");
            return;
        }



        $.ajax({
            url: "/cart/addCart",
            type: "post",
            data: {
                productId: id,
                num: num,
                size: size
            },
            success: function (res) {
                console.log(res);
                if (res.success) {
                    location.href = "cart.html";
                }else {
                    mui.toast(res.message+"请登录");
                    setTimeout(function(){
                        location.href = "login.html";
                    },1000)
                 
                }
            }
        })
    })



})

function getParamsByUrl(url, name) {
    var params = url.substr(url.indexOf("?") + 1);
    var param = params.split("&");
    // console.log(param);
    for (var i = 0; i < param.length; i++) {
        //获取到[keywords,1]
        var current = param[i].split("=");
        // console.log(current);
        if (current[0] == name) {
            return current[1];
        }
        return null;
    }
}