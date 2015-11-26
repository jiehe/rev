jQuery.ajaxSettings.traditional = true;

var $datagrid = $('.easyui-datagrid')
    $frmCreat = $('#frmSavePurchase');

$('#orderRefund').datagrid({
    fitColumns: true,
    border: false,
    url: 'data/order-refund.json',
    method: 'get',
    toolbar: '#tbBatchCreatePurchase',
    autoRowHeight: false,
    columns: [[
        {field: 'ck', title: '', width: 40, align: 'center', checkbox: true},
        {field: 'orderNum', title: '订单号', width: 80, align: 'center'},
        {field: 'auditStaus', title: '审核状态', width: 80, align: 'center'},
        {field: 'opertionPeople', title: '操作人', width: 80, align: 'center'},
        {field: 'guestName', title: '客户名称', width: 80, align: 'center'},
        {field: 'moneyCatery', title: '币种', width: 80, align: 'center'},
        {field: 'actualMoney', title: '实收金额', width: 80, align: 'center'},
        {field: 'actualPayMoney', title: '实际退款金额', width: 100, align: 'center'},
        {field: 'operateTime', title: '操作时间', width: 100, align: 'center'},
        {field: 'payMoneyReson', title: '退款原因', width: 100, align: 'center'},
        {field: 'transportCountry', title: '运输国家', width: 100, align: 'center'},
        {field: 'opertion', title: '操作', width: 80, align: 'center',formatter: formatOper},
    ]]
})
function formatOper(val, row, index) {
    var html = '',
        partyId = row.partyId || 0;
        html += '<a href="javascript:;" class="btn-" onclick="openPassDialog()">[通过]</a>  ';
        html += '<a href="javascript:;" class="btn-" onclick="openUnpassDialog()">[不通过]</a>';
        html += '<a href="javascript:;" class="btn-" onclick="orderInformation()">[订单详情]</a>';
    return html;
}
function openPassDialog(){
    $("#pass").dialog("open");
}
function openUnpassDialog(){
    $("#unpass").dialog("open");
}
function orderInformation(){
    $("#orderInfoDlg").dialog("open");
}
$('#pass').dialog({
    modal: true,
    closed: true,
    maximizable: true,
    cache: false,
    buttons: [{
        text:'确定',
        handler:function(){
             $('#pass').dialog('close');
        }
    },{
        text:'取消',
        handler:function(){
            $('#pass').dialog('close'); 
        }
    }]
});

//[不通过]对话框
$('#unpass').dialog({
    modal: true,
    closed: true,
    maximizable: true,
    cache: false,
    buttons: [{
        text:'确定',
        handler:function(){
             $('#unpass').dialog('close');
        }
    },{
        text:'取消',
        handler:function(){
            $('#unpass').dialog('close'); 
        }
    }]
});
//文本框不可编辑
$('#readOnly').textbox({disabled:true});
$('#readfalse').textbox({disabled:true});




    

   

  

    
   