$(function () {
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    // 向服务器请求数据收货人地址等数据
    var address = null; //存储收货地址
    $.ajax({
        url: "/address/queryAddress",
        type: "GET",
        success: function (res) {
            console.log(res);
            address = res;
            var html = template("addressTpl", {
                res: res
            });
            $(".address").html(html);
        }
    })


    $(".addAddress").on("click", function () {
        //先向拂去其发送请求数据,查询用户存储的收货地址
        location.href = "addAddress.html";
    })

    //点击删除按钮,删除数据.动态添加的用事件委托
    $(".address").on("click", ".deletBtn", function () {
        // 弹出确认是否删除框
        var id= $(this).data("id");
        var li=$(this).parent().parent();
        // console.log(li);
        mui.confirm("是否确认删除", function (res) {
            // console.log(res.index);
            
            if (res.index == 1) {
                //确定删除 删除数据库的数据
                $.ajax({
                    url: "/address/deleteAddress",
                    type: "post",
                    data: {
                        id: id
                    },
                    success: function (res) {
                        if (res.success) {
                        //确认删除
                          location.reload();
                        }
                    }
                })
            } else if(res.index == 0){
                //取消删除
                // mui.swipeoutClose(li);
                
            }
        });
    })


    //编辑收货地址
    $(".address").on("click",".editBtn",function(){
        // 先要将获取的信息存储到本地中 方便编辑地址时获取到对应的数据
        var id = $(this).data("id");
        
        // 将地址存储到本地中
        for(var i=0; i<address.length;i++){
            // 如果从服务器获取的数据的id与操作的id一致,则将对应的数据存储到本地中
            if(address[i].id == id){
                localStorage.setItem("editAddress",JSON.stringify(address[i]));
                break; //终止循环
            }
        }
        //跳转到编辑地址页面
        location.href = "editAddress.html";
    })
})