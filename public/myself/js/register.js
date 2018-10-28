$(function () {
    mui('my_footer').on('tap', 'a', function () {
        window.top.location.href = this.href;
      });

      
    $(".registerBtn").on("click", function () {
        var userName = $('[name="userName"]').val();
        var telPhone = $('[name="telPhone"]').val();
        var passWord = $('[name="passWord"]').val();
        var getVcode = $('[name="getVcode"]').val();
        var confirmNewPass = $('[name="confirmNewPass"]').val();

        $.ajax({
            url:"/user/register",
            type:"post",
            data:{
                username:userName,
                password:passWord,
                mobile:telPhone,
                vCode:getVcode
            },
            success:function(res){
                console.log(res);
                if(res.error == 403){
                    alert(res.message);
                    return;
                }
                if(res.error == 401){
                    alert(res.message);
                    return;
                }
                if(res.success){
                    $(".registerBtn button").html("正在注册..");
                    setTimeout(function(){
                        mui.toast("注册成功");
                        location.href = "login.html";
                    },2000)

                    
                   

                    
                }
            }
        }) 
    })

     //获取认证码
     $(".get_vcode").on("click", function () {
        $.ajax({
            url: "/user/vCode",
            type: "get",
            success: function (res) {
                console.log(res.vCode);
            }
        });
    });
})