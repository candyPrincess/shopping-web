$(function () {
    $(".confirmbtn").on("click", function () {
        var userName = $('[name="userName"]').val().trim();
        var postCode = $('[name="postCode"]').val().trim();
        var city = $('[name="city"]').val().trim();
        var detailAddress = $('[name="detailAddress"]').val().trim();

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