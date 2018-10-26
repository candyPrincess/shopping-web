$(function(){
    // var keywords = [];
    $(".my_search button").on("click",function(){
        // alert(123);
        // 如果输入关键字,则跳转到结果页面
        var keyword= $(".my_search input").val();
        if(keyword.trim() != ""){        
            
            //跳转后同时清除关键字
            $(".my_search input").val("");

            // 如果有关键词放入到记录里面,用空数组存储搜索记录
            // 从本地获取关键词,并转化为json对象
            // console.log(localStorage.getItem("keywords"));
            var keywords = JSON.parse(localStorage.getItem("keywords"));
            console.log(keywords);
            console.log(keywords.unshift(keyword));
            localStorage.setItem('keywords',JSON.stringify(keywords));

            location.href="search-result.html?key="+keywords;
           
           
        }       
    })

    if(localStorage.getItem("keywords")){
        var keywords = JSON.parse(localStorage.getItem("keywords"));
        var html = template("historySearchTpl",keywords);
        $("#historySearch").html(html);
    }

    $(".clearHistory").on("tap",function(){
        localStorage.removeItem("keywords");
        $("#historySearch").html('');
    })

    
    // var li = '<li class="mui-table-view-cell">'+keyword+'</li>';
    // $("#historySearch").html(li);

})