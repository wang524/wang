

//商品详细数据
var hz = location.search.split("=")[1];
var su_this;
$.ajax({
    url: 'http://127.0.0.1:8080/w/website/findGoodsDetail',
    data: {
        info: hz
    },
    type: 'get',
    success: function (su) {
        // console.log(su);
        var dataList = su.data.detail.tbk_item_info_get_response.results.n_tbk_item[0];

        //存为全局变量
        su_this = dataList;

        $(".tb-both img")[0].src = dataList.pict_url;
        $(".photo-right img")[0].src = dataList.pict_url;
        $(".wrap-tit h1").text(dataList.title);
        $(".tm-price span").eq(2).text(dataList.zk_final_price);
        $(".shifadi").text(dataList.provcity);
        $(".evaluate span").eq(1).text(dataList.volume);

        for (var i = 0; i < $(".meal-photo img").length; i++) {
            $(".meal-photo img").eq(i).get(0).src = dataList.small_images.string[i];
        }
    }
})

// 商品数量加减
$(".numadd input").blur(function () {
    var meal_num = $(".numadd input").val();
    var meal_reg = meal_num.match(/[^0123456789]/);
    if (meal_reg) {
        $(".numadd input").val("1");
    }
})
$(".mui-amount-btn span").eq(0).click(function () {
    var num = $(".numadd input").val();
    $(".numadd input").val(+num + 1);
})
$(".mui-amount-btn span").eq(1).click(function () {
    var num = $(".numadd input").val();
    $(".numadd input").val(+num - 1);
    if ($(".numadd input").val() <= 0) {
        $(".numadd input").val("1");
    }
})

//商品图片切换
for (var i = 0; i < $(".meal-photo img").length; i++) {
    $(".meal-photo img").eq(i).click(function () {
        $(".tb-both img").get(0).src = this.src;
        $(".photo-right img").get(0).src = this.src;
    })
}

// 放大镜
var tb_img = $(".tb-both");
var shadow = $(".shadow");
var img_right = $(".photo-right");

tb_img.mouseover(function () {
    shadow.show();
    img_right.show();
})
tb_img.mouseout(function () {
    shadow.hide();
    img_right.hide();
})

tb_img.mousemove(function (event) {

    var shadow_left = event.pageX - $(this).offset().left - shadow.width() / 2;
    var shadow_top = event.pageY - $(this).offset().top - shadow.height() / 2;

    if (shadow_left > tb_img.width() - shadow.width()) {
        shadow_left = tb_img.width() - shadow.width();
    }
    if (shadow_top > tb_img.height() - shadow.height()) {
        shadow_top = tb_img.height() - shadow.height();
    }
    if (shadow_left < 0) {
        shadow_left = 0;
    }
    if (shadow_top < 0) {
        shadow_top = 0;
    }

    shadow.css({
        "top": shadow_top + "px",
        "left": shadow_left + "px",
    })

    img_right.children().css({
        "position": "absolute",
        "top": - shadow_top * 2 + "px",
        "left": - shadow_left * 2 + "px",
    })
})

//加入购物车
var local_arr = JSON.parse(localStorage.getItem("comm")) || [];
$(".buy button").eq(1).click(function () {
    // console.log(su_this);
    var shop_obj = {
        img: su_this.pict_url,
        title: su_this.title,
        price: su_this.zk_final_price,
        id: su_this.seller_id,
        num: 1,
        state: false
    };
    local_arr.push(shop_obj);
    localStorage.setItem("comm", JSON.stringify(local_arr));

})
// console.log(JSON.parse(localStorage.getItem("comm")));