//首页
//跳转到商品列表
$(".init li").last().click(function () {
    location.href = "shopkind.html";
})

//登录后改变用户名
if (localStorage.length !== 0) {
    $(".login-info span").eq(0).html("Hi , " + localStorage.getItem("username"));
    $(".login-info span").eq(1).html("退出登录");
}

//轮播图
$.ajax({
    url: 'http://127.0.0.1:8080/w/website/bannerList',
    data: {},
    type: 'get',
    success: function (res) {
        var datalist = [];
        datalist = res.data;
        for (var i = 0; i < datalist.length; i++) {
            $(".contentBox").append(
                '<div class="item"><img src="' + datalist[i].img + '" alt="..."></div>'
            )
            $($(".contentBox").children()[0]).addClass("active");
        }
    }
})

// 商品列表
$.ajax({
    url: 'http://127.0.0.1:8080/w/website/findGoodsTypeList',
    data: {},
    type: 'get',
    success: function (kind) {
        var commlist = [];
        commlist = kind.data;
        $(".navgation ul").append(
            '<li class="nav-on">' + commlist[0].name + '</li>'
        )
        for (var i = 1; i < commlist.length; i++) {
            $(".navgation ul").append(
                '<li>' + commlist[i].name + '</li>'
            )
        }
        $(".navgation ul li").click(function () {
            var name = $(this).html();
            toods(name);
            $(this).addClass("nav-on").siblings().removeClass("nav-on");
        })
    }
})

$.ajax({
    url: 'http://127.0.0.1:8080/w/website/findGoodsList',
    data: {
        info: "配饰",
        pageNo: 1,
    },
    type: 'get',
    success: function (haha) {
        var commlist = [];
        commlist = haha.data.
            tbk_dg_material_optional_response.result_list.map_data;
        $(".commodity").children().remove();
        for (var i = 0; i < commlist.length; i++) {
            $(".commodity").append(
                '<div class="goods"> <a href="shop.html?sp=' + commlist[i].item_id + '"> <img src="' + commlist[i].pict_url + '" alt=""> <div class="title">' + commlist[i].title + '</div> <div class="price"> ￥ <span class="group-price">' + commlist[i].zk_final_price + '</span> <span class="market-price" ￥>' + commlist[i].reserve_price + '</span> <span class="count"> 已团' + commlist[i].commission_rate + '件 </span> </div> </a> </div>'
            );
        }
    },
})

//分页
var lock = true;
$(function () {
    var spanList = $('.page-wrap span');
    spanList.click(function () {
        // version: 2.0.0
        if (lock) {

            var middleNumber = +spanList.eq(5).html();

            var txt = +$(this).html();

            spanList.removeClass("page-on");
            spanList.eq(5).addClass("page-on");

            // 小于7的点击 不采取最中间的变色
            if (txt < 7) {
                spanList.removeClass("page-on");
                spanList.eq(+$(this).html() - 1).addClass("page-on");

            }

            // 右加
            if (txt > middleNumber) {
                var chazhi = +$(this).html() - middleNumber;

                spanList.each(function (index, item) {
                    $(item).html(+$(item).html() + chazhi);
                })

                // 左减
            } else {
                // 排除 12345
                if (+spanList.first().html() !== 1) {
                    var chazhi = Math.abs(+$(this).html() - middleNumber);

                    spanList.each(function (index, item) {
                        $(item).html(+$(item).html() - chazhi);
                    })
                }

                // error
                if (+spanList.first().html() < 1) {
                    spanList.each(function (index, item) {
                        $(item).html(index + 1);
                    })
                }
            }
            $.ajax({
                url: 'http://127.0.0.1:8080/w/website/findGoodsList',
                data: {
                    info: name,
                    pageNo: txt,
                },
                type: 'get',
                success: function (haha) {
                    
                    var commlist = [];
                    commlist = haha.data.
                        tbk_dg_material_optional_response.result_list.map_data;
                    $(".commodity").children().remove();
                    for (var i = 0; i < commlist.length; i++) {
                        $(".commodity").append(
                            '<div class="goods"> <a href="shop.html?sp=' + commlist[i].item_id + '"> <img src="' + commlist[i].pict_url + '" alt=""> <div class="title">' + commlist[i].title + '</div> <div class="price"> ￥ <span class="group-price">' + commlist[i].zk_final_price + '</span> <span class="market-price" ￥>' + commlist[i].reserve_price + '</span> <span class="count"> 已团' + commlist[i].commission_rate + '件 </span> </div> </a> </div>'
                        );
                    }
                },
            })
        }
    })
})

function toods(name) {
    $.ajax({
        url: 'http://127.0.0.1:8080/w/website/findGoodsList',
        data: {
            info: name,
            pageNo: 1,
        },
        type: 'get',
        success: function (haha) {
            var commlist = [];
            commlist = haha.data.
                tbk_dg_material_optional_response.result_list.map_data;
            $(".commodity").children().remove();
            for (var i = 0; i < commlist.length; i++) {
                $(".commodity").append(
                    '<div class="goods"> <a href="shop.html?sp=' + commlist[i].item_id + '"> <img src="' + commlist[i].pict_url + '" alt=""> <div class="title">' + commlist[i].title + '</div> <div class="price"> ￥ <span class="group-price">' + commlist[i].zk_final_price + '</span> <span class="market-price" ￥>' + commlist[i].reserve_price + '</span> <span class="count"> 已团' + commlist[i].commission_rate + '件 </span> </div> </a> </div>'
                );
            }
        },
    })
}

// 顶部导航滚动定位
$(document).scroll(function () {
    var top = $(document).scrollTop();
    if (top > 300) {
        $(".search-static").slideDown();
    }
    if (top <= 300) {
        $(".search-static").slideUp();
    }
})

// 登录点击跳转
$(".login-info span").eq(1).click(function () {
    if ($(this).html() === "登录 / 注册") {
        setTimeout(function () {
            location.href = "log.html";
        }, 800)
    }
    if ($(this).html() === "退出登录") {
        $(".login-info span").eq(0).html("喵，欢迎来天猫");
        $(this).html("登录 / 注册");
        localStorage.removeItem("username");
        setTimeout(function () {
            location.href = "shopkind.html";
        }, 800)
    }
})


//跳转购物车
$(".sn-menu li").eq(1).click(function () {
    location.href = "chart.html";
})
