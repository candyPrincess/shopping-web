$(function() {
  mui('my_footer').on('tap', 'a', function () {
    window.top.location.href = this.href;
  });
  
  // 获取输入的内容
  $(".modifyPass").on("click", function() {
    var originPass = $('[name="originPass"]').val();
    var newPass = $('[name="newPass"]').val();
    var confirmNewPass = $('[name="confirmNewPass"]').val();
    var getVcode = $('[name="getVcode"]').val();

    $.ajax({
      url: "/user/updatePassword",
      type: "POST",
      data: {
        oldPassword: originPass,
        newPassword: newPass,
        vCode: getVcode
      },
      success: function(res) {
        if (originPass.trim() == "" || newPass.trim() == "" ) {
          alert("密码不可为空");
          return;
        }
        if(newPass != confirmNewPass){
            alert("请重新确认密码");
            return;
        }
        console.log(res);
        location.href ="user.html";
      }
    });
  });

  //获取认证码
  $(".get_vcode").on("click", function() {
    $.ajax({
      url: "/user/vCodeForUpdatePassword",
      type: "get",
      success: function(res) {
        console.log(res.vCode);
      }
    });
  });
});
