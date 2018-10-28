$(function () {
    mui('my_footer').on('tap', 'a', function () {
        window.top.location.href = this.href;
    });


    $(".loginBtn").on("click", function () {
        var userName = $('[name="userName"]').val().trim();
        var passWord = $('[name="passWord"]').val().trim();
        console.log(userName);
        console.log(passWord)

        // alert(1);
        // 获取登录数据
        $.ajax({
            url: "/user/login",
            type: "post",
            data: {
                username: userName,
                password: passWord
            },
            success: function (res) {
                console.log(res);
                //跳转到个人中心
                if (res.success) {
                    mui.toast("正在登录");
                    $(".loginBtn").html("登录成功");
                    setTimeout(function () {
                        location.href = "user.html";
                    }, 1000);
                }else {
                    mui.toast("登录失败");
                }


            }

        })
    })

})