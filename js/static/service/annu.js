$.ajax({
    type:"GET",
    url:"../js/static/service/annualpack.json",
    data:"productType="+1,
    cache:false,
    async:true,
    dataType:"json",
    success:function(data){
        $.each(data.entity, function (key, value) {
            if( key == 1 ){
                var str = "<tr><th id=\"diyu\"><p class=\"text-left\">地域:</p></th>";
                for (var i in value) {
                    str += "<td><div class='diyu'>"+value[i]+"</div></td>";
                }
                str = str +"</tr>";
                $("#table").append(str);
            }
            if( key == 2 ){
                var str = "<tr><th id=\"banben\"><p class=\"text-left\">版本:</p></th>";
                for (var value of value) {
                    str += "<td><div class='banben'>"+value+"</div></td>";
                }
                str = str +"</tr>";
                $("#table").append(str);
            }
            if( key == 3 ){
                var str = "<tr><th id=\"xilie\"><p class=\"text-left\">系列:</p></th>";
                for (var value of value) {
                    str += "<td><div class='xilie'>"+value+"</div></td>";
                }
                str = str +"</tr>";
                $("#table").append(str);
            }
            if( key == 4 ){
                var str = "<tr><th id=\"shichang\"><p class=\"text-left\">时长:</p></th>";
                for (var value of value) {
                    str += "<td><div class='shichang'>"+value+"</div></td>";
                }
                str = str +"</tr>";
                $("#table1").append("<tr><th><p class=\"text-left\">规格:</p></th><td><div class='guige'>cpu</div></td></tr>");
                $("#table1").append(str);
            }
        });
    },
    error:function(){
        alert("发生错误");
    }
});


