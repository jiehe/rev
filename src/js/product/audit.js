// (function () {
    function uploadFilesInit () {
        var serverUrl = VIPMEAPI.invoke('PRODUCT.IMPORT');

        // 提交导入操作
        $('#btnImportProducts').on('click', function (event) {
            event.preventDefault();
            $('#frmImportProducts').form('submit', {
                url: serverUrl,
                method: 'POST',
                success: function (resp) {
                    try {
                        if (resp.status == 'success') {
                            clearForm();
                            console.log(result);
                        }
                    } catch (ex) {
                        console.log('数据异常');
                    }
                }
            });
        });

        // 重置导入
        $('#btnResetImportProducts').on('click', function (event) {
            event.preventDefault();
            clearForm();
        });
    }    

    // 清除导入
    function clearForm () {
        $('#frmImportProducts').form('clear');
    }


    $('#audit').click(function () {
      $('#num1').hide();
    });

    uploadFilesInit();
// })();