// 搜索词获取上啦刷新调用函数的关键词全局变量
var keyword = getParamsByUrl(location.href, "keywords");
//假设默认页面为1.且每页数据为3条
var page = 1;
var pageSize = 3;
var html = "";
var priceSort = 1; //默认升序

var This = null;

$(function() {
  mui('my_footer').on('tap', 'a', function () {
    window.top.location.href = this.href;
  });


  // 上拉刷新,重新加载页面
  mui.init({
    pullRefresh: {
      container: "#refreshContainer", //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
      up: {
        height: 50, //可选.默认50.触发上拉加载拖动距离
        auto: true, //可选,默认false.自动上拉加载一次
        contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
        contentnomore: "没有更多数据了", //可选，请求完毕若没有更多数据时显示的提醒内容；
        callback: getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      }
    }
  });
  //callback页面一上来就加载数据,下拉加载数据

  //价格排序
  $("#priceSort").on("tap",function(){

      //默认价格升序,点击后改变默认值
        priceSort = priceSort == 1 ? 2:1;
    //初始化页面数据,清空页面的数据
        html="";
        page = 1;
        mui('#refreshContainer').pullRefresh().refresh(true);
    //然后重新获取页面,这里下面如果不判断,直接用this是指向window的
        getData();
  })



  //进入详情页面
  $(".my_life").on("tap",".searchDetail",function(){
    //   alert(1)
        //获取产品id
        var id = $(this).data("id");
        console.log(id);
      location.href = "detail.html?id="+id;
  })


});

//封装获取连接关键值的函数
//获取搜素产品的名称,也就是搜索的关键字,可以去到在url上
//返回的是搜索的关键词 name为出入的参数名称,url链接
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

//封装获取下拉刷新必须传的函数.获取数据,发送ajax请求
function getData() {
    //这里的this指向某个对象,页面刷新时的指向,而当点击价格时,直接调用,this指向window,
    //当第一次刷新加载时的this存储起来,只要This不为空,让This=this
//   var This = this;
    if(!This){
        This = this;
    }

  //根据关键词搜索调取数据库数据
  $.ajax({
    url: "/product/queryProduct",
    type: "get",
    data: {
      page: page++,
      pageSize: pageSize,
      proName: keyword,
      price:priceSort
    },
    success: function(res) {
      // console.log(res);
      if (res.data.length > 0) {
          //有数据
        // 每次刷新重新拼接上次的数据
        html += template("searchResultTpl", res);
        // console.log(html);
        $(".my_life").html(html);

        //发送请求完毕后结束下拉刷新
        This.endPullupToRefresh(false);
      }else {
          //没有数据 结束下拉熟悉
        This.endPullupToRefresh(true);
      }
    }
  });
}
