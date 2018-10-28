$(function () {
    mui('my_footer').on('tap', 'a', function () {
        window.top.location.href = this.href;
      });


    $(".confirmbtn").on("click", function () {
        var userName = $.trim($('[name="userName"]').val());
        var postCode = $.trim($('[name="postCode"]').val());
        var city = $.trim($('[name="city"]').val());
        var detailAddress = $.trim($('[name="detailAddress"]').val());
        if(!userName){
            mui.toast("请输入正确的用户名");
            return;
        }
        if(!postCode){
            mui.toast("请输入合法的邮编");
            return;
        }
        if(!detailAddress){
            mui.toast("请输入详细的地址");
            return;
        }
        if(!city){
            mui.toast("请输入地址");
            return;
        }
        $.ajax({
            url:"/address/addAddress",
            type:"POST",
            data:{
                address:city,
                addressDetail:detailAddress,
                recipients:userName,
                postcode:postCode
            },
            success:function(res){
                // console.log(res);
                if(res.success){
                    location.href ="address.html";
                    
                }
            }
        })

    })
    // 初始化popPicker组件
    $("#showCityPicker3").on("click", function () {
        var picker = new mui.PopPicker({layer: 3});
        picker.setData(cityData);
        picker.show(function (selectItems) {
            // console.log(selectItems[0].text);
            // console.log(selectItems[1].text);
            // console.log(selectItems[2].text);
            // 将数据渲染到页面
            $('[name="city"]').val(selectItems[0].text+selectItems[1].text+selectItems[2].text)
        })
    })

})