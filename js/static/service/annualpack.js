
// $(function () {
//     var name = $('#annualPackage').attr('name');
//     $("#iframe").attr("src", name+'.html');
// })

$("ul#myTab").on("click","li",function(e){
    $("#iframe").attr("src", e.target.name+'.html');
})

// 省级平台用户名 和一级平台用户名确认
$("#btn").click(function () {
    // alert("确认");
});

$(document).on("click", ".diyu", function () {
    $(".diyu").css("background","#EEEEEE");
    $(".diyu").css("color","#080808");
    this.style.backgroundColor="#27A9FF";
    this.style.color="#ffffff";
    parent.window.document.getElementById("p2").innerHTML = this.innerText;
});

$(document).on("click", ".banben", function () {
    $(".banben").css("background","#EEEEEE");
    $(".banben").css("color","#080808");
    this.style.backgroundColor="#27A9FF";
    this.style.color="#ffffff";
    parent.window.document.getElementById("p3").innerHTML = this.innerText;
});

$(document).on("click", ".xilie", function () {
    $(".xilie").css("background","#EEEEEE");
    $(".xilie").css("color","#080808");
    this.style.backgroundColor="#27A9FF";
    this.style.color="#ffffff";
    parent.window.document.getElementById("p4").innerHTML = this.innerText;
});

$(document).on("click", ".guige", function () {
    this.style.backgroundColor="#27A9FF";
    this.style.color="#ffffff";
    parent.window.document.getElementById("p5").innerHTML = this.innerText;
});

$(document).on("click", ".shichang", function () {
    $(".shichang").css("background","#EEEEEE");
    $(".shichang").css("color","#080808");
    this.style.backgroundColor="#27A9FF";
    this.style.color="#ffffff";
    parent.window.document.getElementById("p7").innerHTML = this.innerText;
});

var a = 1;
var flag=0;

var serialNumber ="";

$("#but_dg").on("click",function () {

    $.ajax({
        type:"get",
        url:config.testConfig.contextPath+"/api/service/order/getUUID",
        data: "",
        cache:false,
        async:false,
        dataType:"json",
        contentType : "application/json",
        success:function(data){
            serialNumber = data;
        }
    });

    // 用户名 订单编号

    var map = {};
    var maps = {};

    map['count'] = $("#p6").val();
    map['duration'] = $("#p7").val();
    map['information'] = $("#p5").val();
    map['name'] = "mysql";
    map['podId'] = $("#p2").val();
    map['series'] = $("#p4").val();
    map['type'] = 1;
    var arr=new Array(map)
    maps['serialNumber'] = serialNumber;
    maps['productList'] = arr;

    flag++;
    if(a == flag){

        $.ajax({
            type:"POST",
            url:config.testConfig.contextPath+"/api/service/order/createOrder",
            data:JSON.stringify(maps),
            cache:false,
            async:false,
            dataType:"json",
            contentType : "application/json",
            success:function(data){
              alert(data.success);
            }
        })
    }
});