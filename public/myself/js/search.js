$(function () {
    mui('body').on('tap', 'a', function () {
        window.top.location.href = this.href;
    });

    var keyArr = [];
    $(".my_search button").on("click", function () {
        // alert(123);
        // 如果输入关键字,则跳转到结果页面
        var keyword = $(".my_search input").val();
        if (keyword.trim() != "") {
            // 如果有关键词放入到记录里面,用空数组存储搜索记录
            // 从本地获取关键词,并转化为json对象数组,然后遍历到历史记录里面
            if (localStorage.getItem("keywords")) {
                // 将数组类型的字符串转换为json数组对象
                keyArr = JSON.parse(localStorage.getItem("keywords"));
                // console.log(localStorage.getItem("keywords"));
                //打印出来的是数组类型的字符串
                keyArr.unshift(keyword);
                localStorage.setItem("keywords", JSON.stringify(keyArr));
            } else {
                // localStorage.setItem("keywords","["+keyword+"]");
                localStorage.setItem("keywords", JSON.stringify([keyword]))               
            }

            location.href = "search-result.html?keywords=" + keyword;
            //跳转后同时清除关键字
            $(".my_search input").val("");


        }
    })


    // 将数据渲染到搜索页面历史记录
    if(localStorage.getItem("keywords")){
        keyArr = JSON.parse(localStorage.getItem("keywords"));
        var html = template("historySearchTpl",{keyArr:keyArr});
        // console.log(html);
        $("#historySearch").html(html);
    }

    $(".clearHistory").on("tap",function(){
        localStorage.removeItem("keywords");
        $("#historySearch").html('');
    })



})