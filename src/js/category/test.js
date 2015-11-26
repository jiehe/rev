
var categoryPath = VIPMEAPI.invoke('PRODUCT.GET_BASIC_CAT'),
    catId = '0';

// datagrid单元格操作格式化
var frmt = {
    opr: function (val, row, index) {
        var html = '',
            catId = row.id,
            hasChildren = row.children && row.children.length;
        html += '<a href="javascript:;" class="btn-" onclick="openDialog(\'#dlgPoDetail\')">关联商品</a>  ';
        html += '<a href="javascript:;" class="btn-" onclick="auditComment()">编辑</a>  ';
        html += '<a href="javascript:;" class="btn-" onclick="delCat(' + [catId, hasChildren].join(',') + ')">删除</a>';
        return html;
    },
    webShow: function (val, row, index) {
        var html = '';
        html += '<a href="javascript:;" class="btn-" onclick="openDialog(\'#dlgPoDetail\')">展示设置</a>  ';
        html += '<a href="javascript:;" class="btn-" onclick="auditComment()">预览</a>';
        return html;
    },
    MobShow: function (val, row, index) {
        var html = '';
        html += '<a href="javascript:;" class="btn-" onclick="openDialog(\'#dlgPoDetail\')">展示设置</a>  ';
        html += '<a href="javascript:;" class="btn-" onclick="auditComment()">预览</a>';
        return html;  
    },



};

// 加载所有分类
categoryPath = VIPMEAPI.invoke('CATEGORY.SALE_CAT_LIST');
$('#grdCategoryManagement').treegrid({
    border: false,
    fitColumns: true,
    method: 'get',
    url: categoryPath,
    idField: 'id',
    toolbar: '#tbCategoryManagement',
    treeField: 'categoryName',
    columns: [[
        {field:'categoryName', width:150, title:'分类名称'},
        {field:'associationGoodsNum', width:20, align:'right', title:'排序'},
        {field:'defaultSequenceBaseOn', width:80, title:'默认排序基于'},
        {field:'associationGoodsNum', width:80, align:'right', title:'关联商品数'},
        {field:'_opr', width:90, title:'操作', align:'center', formatter:frmt.opr},
        {field:'_ws', width:90, title:'Web端展示设置', align:'center', formatter:frmt.webShow},
        {field:'_ms', width:90, title:'Mobile端展示设置', align:'center', formatter:frmt.MobShow}
    ]]  
});

// 新增分类按钮
$('#btnAddCategory').on('click', function(event) {
    event.preventDefault();

    categoryPath = VIPMEAPI.invoke('CATEGORY.SALE_CAT_LIST');
    $.ajax({
        url: categoryPath,
        type: 'GET',
        dataType: 'json'
    })
    .done(function(resp) {
        var data = resp || [];
        var newData = traverseObj(data);

        $('#cmbtCategory').combotree({
            data: newData
        });
    
        $('#dlgAddCat').dialog('open');
    });
});

// 配置新增分类对话框
categoryPath = VIPMEAPI.invoke('CATEGORY.ADD_SALE_CAT');
$('#dlgAddCat').dialog({
    modal: true,
    closed: true,
    iconCls: 'icon-add',
    maximizable: true,
    cache: false,
    buttons: [
        {
            text:'保存',
            iconCls:'icon-save',
            handler:function(){
                $('#frmAddCat').form('submit', {
                    url: categoryPath,
                    success: function (resp) {
                        try {
                            $('#frmAddCat').form('clear');
                            $.messager.show({
                                title: '添加成功', 
                                msg: '成功添加一个分类'
                            });
                        } catch (ex) {
                            console.log('数据格式异常');
                        }
                    }
                })
            }
        },
        {
            text:'取消',
            handler:function(){
                $('#dlgAddCat').dialog('close');
            }
        }
    ]
});


// 遍历所有对象
function traverseObj (arr) {
    var i = 0,
        len = arr.length;

    for (; i < len; i++) {
        arr[i].text = arr[i]['categoryName'];

        if (arr[i].children && arr[i].children.length) {
            traverseObj(arr[i].children);
        }
    };

    return arr;
}

// 删除分类
function delCat (catId, hasChidren) {
    $.messager.confirm('删除确认', '您确定要删除这个分类吗?', function (conResp) {
        if (conResp) {
            // 有子节点
            if (hasChidren) {
                $.messager.alert('不允许删除', '有子分类的分类不允许删除', 'warning');
            }
        }
    });
}