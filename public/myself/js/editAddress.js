$(function () {
    // 向服务器发送请求要数据.编辑地址
    if (localStorage.getItem("editAddress")) {
        // 取出本地存储的数据
        var editAddress = JSON.parse(localStorage.getItem("editAddress"));
        console.log(editAddress);

        var html = template("editTpt", {
            editAddress
        });
        $(".editAddress").html(html);
    } else {
        //如果没有本地数据
        var html = template("editTpt", {});
        $(".editAddress").html(html);
    }

    // 修改收货地址 
    $(".editAddress").on("click", ".confirmbtn", function () {
        // 重新获取修改的数据并渲染到地址管理页面中
        var id = editAddress.id;
        var userName = $('[name="userName"]').val().trim();
        var postCode = $('[name="postCode"]').val().trim();
        var city = $('[name="city"]').val().trim();
        var detailAddress = $('[name="detailAddress"]').val().trim();
        
        $.ajax({
            url: "/address/updateAddress",
            type: "post",
            data: {
                id: id,
                address: city,
                addressDetail: detailAddress,
                recipients: userName,
                postcode: postCode
            },
            success: function (res) {
                if (res.success) {
                    //当点击确认时跳转
                    location.href = "address.html";
                }
            }
        })
    })

    // 初始化popPicker组件
    $(".editAddress").on("click", "#showCityPicker3", function () {
        var picker = new mui.PopPicker({
            layer: 3
        });
        picker.setData(cityData);
        picker.show(function (selectItems) {
            // 将数据渲染到页面
            $('[name="city"]').val(selectItems[0].text + selectItems[1].text + selectItems[2].text)
        })
    })





})