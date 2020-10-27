// 登陆页面
//注册
$(".username").focus(function () {
    $(".kuang-user").fadeIn();
})
$(".username").blur(function () {
    $(".kuang-user").fadeOut();
    var text1 = $(".username").val();
    var reg1 = text1.match(/^[a-zA-Z0-9_-]{4,16}$/);
    if (!reg1) {
        $(this).val("");
        $(this).parent().find(".defult").show();
        $(this).parent().find(".success").hide();
    } else {
        $(this).parent().find(".success").show();
        $(this).parent().find(".defult").hide();
    }
})
$(".password").focus(function () {
    $(".kuang-pass").fadeIn();
})
$(".password").blur(function () {
    $(".kuang-pass").fadeOut();
    var text1 = $(".password").val();
    //以字母开头，长度在6~18之间，只能包含字母、数字和下划线
    var reg1 = text1.match(/^[a-zA-Z]\w{5,17}$/);
    if (!reg1) {
        $(this).val("");
        $(this).parent().find(".defult").show();
        $(this).parent().find(".success").hide();
    } else {
        $(this).parent().find(".success").show();
        $(this).parent().find(".defult").hide();
    }
})
$(".phonenumber").blur(function () {
    var text1 = $(".phonenumber").val();
    var reg1 = text1.match(/^1[^120]{1}[0-9]{9}$/);
    if (!reg1) {
        $(this).val("");
        $(this).parent().find(".defult").show();
        $(this).parent().find(".success").hide();
    } else {
        $(this).parent().find(".success").show();
        $(this).parent().find(".defult").hide();
    }
})
$(".email").blur(function () {
    var text1 = $(".email").val();
    var reg1 = text1.match(/^[A-Za-z0-9]+@[a-z0-9]+\.[com|cn]+$/);
    if (!reg1) {
        $(this).val("");
        $(this).parent().find(".defult").show();
        $(this).parent().find(".success").hide();
    } else {
        $(this).parent().find(".success").show();
        $(this).parent().find(".defult").hide();
    }
})


$(".log-button p").eq(0).click(function () {
    $(".log-with-password").find("a").eq(0).hide();
    $(".log-with-password").find("a").eq(1).show();
    $(".input").find(".input-username").eq(2).show();
    $(".input").find(".input-username").eq(3).show();
    $(".log-button").find(".login-button").eq(0).hide();
    $(".log-button").find(".login-button").eq(1).show();
    $(".log-button").find("p").eq(0).hide();
    $(".log-button").find("p").eq(1).show();
})

//登录
$(".log-button p").eq(1).click(function () {
    $(".log-with-password").find("a").eq(1).hide();
    $(".log-with-password").find("a").eq(0).show();
    $(".input").find(".input-username").eq(2).hide();
    $(".input").find(".input-username").eq(3).hide();
    $(".log-button").find(".login-button").eq(1).hide();
    $(".log-button").find(".login-button").eq(0).show();
    $(".log-button").find("p").eq(1).hide();
    $(".log-button").find("p").eq(0).show();
})


// 验证码
$('#mpanel4').slideVerify({
    type: 2, //类型
    vOffset: 5, //误差量，根据需求自行调整
    vSpace: 5, //间隔
    imgName: ['1.jpg', '2.jpg'],
    imgSize: {
        width: '350px',
        height: '200px',
    },
    blockSize: {
        width: '40px',
        height: '40px',
    },
    barSize: {
        width: '350px',
        height: '40px',
    },
    ready: function () { },
    success: function () {
        setTimeout(function () {
            location.href = "banner.html";
        }, 1000)
        //......后续操作
    },
    error: function () {
        //alert('验证失败！');
    }

});

//登录
$(".log-button").find("button").eq(0).click(function () {
    $.ajax({
        url: "http://192.168.1.104:3000/users/login",
        type: "POST",
        data: {
            username: $(".username").val(),
            password: $(".password").val(),
        },
        success: function (data) {
            //登录成功，用户名存到本地
            if (data.state === 0) {
                $.ajax({
                    url: 'http://192.168.1.104:3000/users/userinfo',
                    type: 'get',
                    data: {
                        token: data.token,
                        username: $(".username").val()
                    },
                    success: function (data) {
                        if (data.state === 0) {
                            localStorage.setItem("username", data.userinfo.username);
                        }
                    }
                })
                $(".login").hide();
                $("#mpanel4").fadeIn();
            }
            if (data.state === 1) {
                $(".username").val("");
                $(".password").val("");
                $(".defult").show();
                $(".success").hide();
                alert("用户名不存在，请重新输入或注册！");
            }
            if (data.state === 2) {
                $(".password").val("");
                alert("密码输入错误，请重新输入！");
            }
        },
        error: function () {
            alert("登录失败!!!");
        }
    });
})

//注册
$(".log-button").find("button").eq(1).click(function () {
    $.ajax({
        url: "http://192.168.1.104:3000/users/register",
        type: "POST",
        data: {
            username: $(".username").val(),
            password: $(".password").val(),
            phone: $(".phonenumber").val(),
            email: $(".email").val(),
        },
        success: function (data) {
            if (data.state === 0) {
                alert("注册成功，请登录。");
            }
            if (data.state === 1) {
                alert("用户名已存在，请重新输入或登录！");
            }
        },
        error: function () {
            alert("验证失败!!!");
        }
    });
})