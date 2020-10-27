

if (JSON.parse(localStorage.getItem("comm"))) {
    var comm = JSON.parse(localStorage.getItem("comm"));
    for (var i = 0; i < comm.length; i++) {
        $(".all").append(
            `<div class="all-check th-check cf">
                <div class="check-all c-a">
                    <input type="checkbox">
                </div>
                <div class="th-item">
                    <div class="item-img left">
                        <img src="${comm[i].img}" alt="">
                    </div>
                    <div class="item-tit right">
                        <a href=""><p>${comm[i].title}</p></a>
                    </div>
                </div>
                <div class="th-price">
                    <strong>￥</strong>
                    <strong>${comm[i].price}</strong>
                </div>
                <div class="th-num">
                    <div class="numadd th-numadd left">
                        <input type="text" value="1">
                        <span class="mui-amount-btn">
                            <span class="jia">+</span>
                            <span class="jian">-</span>
                        </span>
                        <span>件</span>
                    </div>
                </div>
                <div class="th-sum pric-sum">
                    <strong>￥</strong>
                    <strong>${comm[i].price}</strong>
                </div>
                <div class="th-op">
                    <a href="javascript:;" onclick="shanchu(${comm[i].id})">删除</a>
                </div>
            </div>`
        )
    }
}

//商品数量
if (JSON.parse(localStorage.getItem("comm"))) {
    $(".all-tit-left span").last().html(comm.length);
} else {
    $(".all-tit-left span").last().html(0);
}

//商品数量加减
$(".numadd input").blur(function () {
    var meal_num = $(this).val();
    var meal_reg = meal_num.match(/[^0123456789]/);
    if (meal_reg) {
        $(this).val("1");
    }
    $(this).parent().prev().val(num);

})
$(".jia").click(function () {
    var num = parseInt($(this).parent().prev().val()) + 1;
    $(this).parent().prev().val(num);

    var price = +$(this).parents(".th-num").prev().children().last().html();
    var price_sum = (num * price).toFixed(2);
    $(this).parents(".th-num").next().children().last().html(price_sum);

})
$(".jian").click(function () {
    var num = parseInt($(this).parent().prev().val()) - 1;
    $(this).parent().prev().val(num);

    var price = +$(this).parents(".th-num").prev().children().last().html();
    var price_sum = (num * price).toFixed(2);
    $(this).parents(".th-num").next().children().last().html(price_sum);

    if (num < 1) {
        $(this).parent().prev().val(1);
        $(this).parents(".th-num").next().children().last().html(price);
    }
})

//全选
$(".check-all input").click(function () {
    if ($(".check-all input").get(0).checked === true) {
        $(".c-a input").prop("checked", true);
    }
    if ($(".check-all input").get(0).checked === false) {
        $(".c-a input").prop("checked", false);
    }
})


//全部金额
var all_price = 0;
$(".check-all input").click(function () {
    if ($(this)[0].checked === true) {
        var this_price = +$(this).parents(".all-check").find(".th-sum").children().last().html();
        all_price += this_price;
        $(".all-tit-right").find("strong").html(all_price.toFixed(2));
    } else {
        var this_price = +$(this).parents(".all-check").find(".th-sum").children().last().html();
        all_price -= this_price;
        $(".all-tit-right").find("strong").html(all_price.toFixed(2));
    }
})

//删除
function shanchu(id) {
    for (var i = comm.length - 1; i >= 0; i--) {
        if (parseInt(comm[i].id) === id) {
            comm.splice(i, 1);
            i = i - 1;
        }
    }
    localStorage.setItem("comm", JSON.stringify(comm));
    window.location.reload();
}