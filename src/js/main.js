
(function (win) {

    win.dict = {};

    var index = 0,
        $tree = $('#treeMenu'),
        $tabs = $('.easyui-tabs');

    /**
     * 添加tab页
     * @param {树的节点}
     */
    function addPanel (info) {
        var props = {
            title: info.text,
            closable:true
        };

        // 添加异步加载地址
        if (info.href) {
            props['href'] = 'html/' + info.href;
        } else {
            props['content'] = '开发中...';
        }

        // 添加迷你刷新按钮
        if (info.refresh) {
            props['tools'] = [
                {
                    iconCls: 'icon-mini-refresh',
                    handler: function () {
                        var tab = $tabs.tabs('getSelected');
                        tab.panel('refresh');
                    }
                }
            ];
        }

        $tabs.tabs('add', props);
    }

    /**
     * 移除tab页
     */
    function removePanel () {
        var tab = $tabs.tabs('getSelected');
        if (tab){
            var index = $tabs.tabs('getTabIndex', tab);
            $tabs.tabs('close', index);
        }
    }

    $tabs.tabs({
        onClose: function (title, index) {

        }
    })

    $tree.tree({
        url:'data/tree.menu.json',
        method:'get',
        animate:true,
        dnd:true,
        onClick: function (node) {
            if ($tabs.tabs('exists', node.text)) {
                $tabs.tabs('select', node.text);
            } else {
                if (!node.children) {
                    addPanel(node);
                }
            }
        }
    });

})(window);