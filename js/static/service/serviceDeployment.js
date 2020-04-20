var chk_value = [];
var userTableInit = new Object();
var $table = $('#mytab'),
    selections = [];
var logPageSize = 10;

$(function() {
    // 1.初始化Table
    var oTable = new TableInit();
    oTable.Init();
});

function check(obj) {
    var o = $(obj);
    $("#userAddForm").valid(o);
}

var TableInit = function() {
    userTableInit.Init = function() {
        $('#mytab').bootstrapTable({
            url: '../js/static/service/specialManagement.json',
            //url: ZEUS_BASE_URL + '/specialManagements',
            method: 'get',
            toolbar: '#toolbar',
            striped: true,
            cache: false,
            pageNumber : 1,
            pagination: true,
            sortable: false,
            sortOrder: "asc",
            queryParams: userTableInit.queryParams,
            sidePagination : 'server',//server:服务器端分页|client：前端分页
            pageSize: 10,
            pageList: [10, 15, 50, 100],
            uniqueId: "ID", // 每一行的唯一标识，一般为主键列
            search: false, // 是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
            strictSearch: false,
            showColumns: false, // 是否显示所有的列
            showRefresh: true, // 是否显示刷新按钮
            minimumCountColumns: 2, // 最少允许的列数
            clickToSelect: false, // 设置true 将在点击行时，自动选择rediobox 和 checkbox
            showToggle: false, // 是否显示详细视图和列表视图的切换按钮
            cardView: false, // 是否显示详细视图
            detailView: false, // 是否显示父子表
            paginationLoop: true,
            maintainSelected: true,
            responseHandler: function(res) { // res 为后台return的值
                $.each(res.entity.list, function(i, row) {
                    row.state = $.inArray(row.userUuid, selections) !== -1;
                });
                var map = {};
                map['total'] = res.entity.total;
                map['rows'] = res.entity.list;
                return map;
            },
            columns: [{
                field: 'serviceName',
                title: '服务名称',
                align: 'center'
            }, {
                field: 'series',
                title: '类型',
                align: 'center'
            }, {
                field: 'paasUserName',
                title: '租户',
                align: 'center'
            }, {
                field: 'cluster',
                title: '集群',
                align: 'center'
            }, {
                field: 'partition',
                title: '资源分区',
                align: 'center'
            }, {
                field: 'hostList',
                title: '主机列表',
                align: 'center',
            },{
                field: 'operTime',
                title: '部署时间',
                align: 'center',
                formatter: function (value, row, index) {
                    return changeDateFormat(value)
                }
            },{
                field: 'status',
                title: '状态'
            },{
                field: 'operate',
                title: '操作',
                align: 'center',
                valign: 'middle',
                formatter: actionFormatter,
            }]
        });
    };

    $table.on('check.bs.table uncheck.bs.table ' +
        'check-all.bs.table uncheck-all.bs.table',
        function() {
            // save your data, here just save the current page
            selections = getIdSelections();
            // push or splice the selections if you want to save all data selections
        });

    // 服务端分页，需要传递给后台的参数
    userTableInit.queryParams = function(params) {
        logPageSize = params.limit;
        var chkstr = chk_value.join(",");
        var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            userName: '12',
            productType: '1',
            pageNum: (params.offset / params.limit) + 1, // 当前页面
            pageSize: params.limit, // 每页条数
        };
        return temp;
    };
    return userTableInit;
};


function actionFormatter(value, row, index) {
    var id = index;
    var data = JSON.stringify(row);
    var result = "";
    result += "<button href='javascript:;' class='btn btn-info btn-xs' onclick=\"EditViewById('" + id + "', view='view')\" title=''>查看</button>";
    result += "<button href='javascript:;' class='btn btn-warning btn-xs' onclick=\"EditViewById('" + row + "','" + id + "')\" title=''>管理</button>";
    result += "<button href='javascript:;' class='btn btn-primary btn-xs' onclick=\"DeleteByIds('" + id + "')\" title=''>监控</button>";
    return result;

}

function EditViewById(row, index){

}

function getIdSelections() {
    return $.map($table.bootstrapTable('getSelections'), function(row) {
        return row.zxUuid;
    });
}

function responseHandler(res) {
    $.each(res.rows, function(i, row) {
        row.state = $.inArray(row.userUuid, selections) !== -1;
    });
    return res;
}

//"新增"按钮
$(".btn-add").click(function() {
    $("input[name='zxName']").val("");
    $("input[name='startTime']").val("");
    $("input[name='endTime']").val("");
    $(".zxRange option:first").prop("selected", 'selected');
    $(".zxType option:first").prop("selected", 'selected');
    $("#modalAddorEditTitle").html("新增专项");
    ajaxRequest("GET", "/specialManagements/zxCode", function(ajaxRet) {
        $("input[name='zxCode']").val(ajaxRet.data);
    }, undefined,undefined);
    $("#modal").modal("show");
});
//"编辑"按钮
$(".btn-upd").click(function() {
    var idSelections = getIdSelections();
    console.log(idSelections);
    if(idSelections == ""){
        layer.msg('您尚未勾选，请勾选需要进行操作的数据', {
            icon : 2
        });
    }else if(idSelections.length > 1){
        layer.msg('您勾选的数据超过一条，请只选择需要操作的一条数据', {
            icon : 2
        });
    }else{
        ajaxRequest("GET", "/specialManagementsById", function(ajaxRet) {
            $("input[name='zxUuid']").val(ajaxRet.zxUuid);//jquery通过name属性获取html对象并赋值为123
            $("input[name='zxCode']").val(ajaxRet.zxCode);
            $("input[name='zxName']").val(ajaxRet.zxName);
            $(".zxRange").val(ajaxRet.zxRange);
            $(".zxType").val(ajaxRet.zxType);
            $("input[name='startTime']").val(ajaxRet.startTime);
            $("input[name='endTime']").val(ajaxRet.endTime);
        }, {"id": idSelections.toString()},undefined);
        $("#modalAddorEditTitle").html("修改专项");  //修改模态框标题
        $("#modal").modal("show");
    }
});

//"删除"按钮
$(".btn-del").click(function() {
    var idSelections = getIdSelections();
    console.log("getIdSelections:" + idSelections);
    if(idSelections == ""){
        layer.msg('您尚未勾选，请勾选需要进行操作的数据', {
            icon : 2
        });
        return ;
    }
    layer.confirm('请是否确定删除所勾选的数据？', {
        icon: 7,
        title: '提示'
    }, function() {
        layer.closeAll('dialog');
        ajaxRequest("DELETE", "/specialManagements", function(ajaxRet) {
            if(ajaxRet.success) {
                layer.msg(ajaxRet.data, {
                    icon : 1
                });
                $("#tb_users").bootstrapTable('destroy');
                userTableInit.Init();
            }
        }, {"idSelections": idSelections.toString()},undefined);
    });
});
//"新增用户"或"修改用户"的模态框重置
function cancer(){
    var modalTitle = $("#modalAddorEditTitle").html();
    console.log(modalTitle);
    if(modalTitle == "修改专项"){
        $("input[name='zxName']").val("");
        $("input[name='zxRange']").val("");
        $("input[name='zxType']").val("");
        $("input[name='startTime']").val("");
        $("input[name='endTime']").val("");
    }
    $("#modal").modal("hide");
}
function addOrEdit(){
    var modalTitle = $("#modalAddorEditTitle").html();
    var vasd = jQuery.form2json("myForm");
    var method = "";
    console.log(vasd.data);
    if(modalTitle == "新增专项"){
        method = "POST";
    }else if(modalTitle == "修改专项"){
        method = "PATCH";
    }
    ajaxRequest(method, "/specialManagements", function(ajaxRet) {
        if(!ajaxRet.success) {
            layer.alert(ajaxRet.message);
        }else{
            $("#tb_users").bootstrapTable('destroy');
            userTableInit.Init();
            $("#modal").modal("hide");
            layer.alert(ajaxRet.data);
        }
    },undefined ,vasd.data);
}

//"专项结束"按钮
$(".btn-stop").click(function() {
    var idSelections = getIdSelections();
    console.log("getIdSelections:" + idSelections);
    if(idSelections == ""){
        layer.msg('您尚未勾选，请勾选需要进行操作的数据', {
            icon : 2
        });
        return ;
    }
    layer.confirm('请是否确定结束所勾选的数据？', {
        icon: 7,
        title: '提示'
    }, function() {
        layer.closeAll('dialog');
        ajaxRequest("PATCH", "/specialManagements/stop", function(ajaxRet) {
            if(ajaxRet.success) {
                layer.msg(ajaxRet.data, {
                    icon : 1
                });
                $("#tb_users").bootstrapTable('destroy');
                userTableInit.Init();
            }
        }, {"idSelections": idSelections.toString()},undefined);
    });
});

//日期转换
function changeDateFormat(cellval) {
    var dateee = new Date(cellval).toJSON();
    var date = new Date(+new Date(dateee)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
    return date;
}