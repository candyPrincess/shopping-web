$(function () {
  mui('body').on('tap', 'a', function () {
    window.top.location.href = this.href;
  });


  mui(".mui-scroll-wrapper").scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });

  //   自动生成一级分类页面
  $.ajax({
    url: "/category/queryTopCategory",
    type: "get",
    success: function (result) {
      //   console.log(result);
      var html = template("firstCategory", result);
      // console.log(html);
      $(".my_categroyLeft").html(html);

      //获取到数据后,实现第一个li的点击事件
      //获取到第一个li的id
      var id = result.rows[0].id;
      //执行第一个li的点击事件,但是索引是id-1
      $(".my_categroyLeft li").eq(id - 1).trigger("click");
    }
  });

  //   绑定分类页面的点击事件
  $(".my_categroyLeft").on("click", "li", function () {
    //   点击让当前行高亮
    $(this).addClass("active").siblings().removeClass("active");
    // 获取当前点击的id
    var id = $(this).data("id");
    // console.log(id);
    // 从服务器获取数据
    $.ajax({
      url: "/category/querySecondCategory",
      type: "get",
      data: {
        id: id
      },
      success: function (result) {
        console.log(result);
        var html = template("secondCategory", result);
        // console.log(html);
        $(".my_categroyRight").html(html);

        // 如果没有数据
        if (result.rows.length <= 0) {
          $(".my_categroyRight").html("暂无数据");
        }
      }
    });
  });


});