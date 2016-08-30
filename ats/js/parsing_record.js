function getRowIndex(target) {
    var tr = $(target).closest('tr.datagrid-row');
    return parseInt(tr.attr('datagrid-row-index'));
}

function editrow(target) {
    $('#target').datagrid('beginEdit', getRowIndex(target));
}

function deleterow(target) {
    $.messager.confirm('Confirm', 'Are you sure?', function(r) {
        if (r) {
            $('#target').datagrid('deleteRow', getRowIndex(target));
        }
    });
}

function saverow(target) {
    $('#target').datagrid('endEdit', getRowIndex(target));
}

function cancelrow(target) {
    $('#target').datagrid('cancelEdit', getRowIndex(target));
}


$(document).ready(function() {
    obj = {
        editRow: undefined,
        save: function(){
            $("#target").datagrid('endEdit', this.editRow);
        },
        edit: function(){
            var rows = $("#target").datagrid('getSelections');
            if (rows.length == 1) {
                if (this.editRow != undefined) {
                    $("#target").datagrid('endEdit', this.editRow);
                }

                if (this.editRow == undefined){
                    var index = $("#target").datagrid('getRowIndex', rows[0]);
                    $("#target").datagrid('beginEdit', index);
                    this.editRow = index;
                    $("#target").datagrid('unselectRow', index);
                }
            } else {
                $.messager.alert("Warning", "Must select 1 line for editing", "Warning");
            }
        },
        remove: function(){
            var rows = $("#target").datagrid('getSelections');
            if (rows.length > 0) {
                $.messager.confirm("confirm action", "Are you sure to delete selecting rows?", function (flag){
                    if (flag) {
                        var ids = [];
                        for (var i=0; i < rows.length; i++){

                            ids.push(rows[i].id);

                        }

                    }
                });
            } else {
                $.messager.alert("Waring", "Please select the row to delete!", 'info');
            }
        },
    };

    $('#target').datagrid({
        iconCls: 'icon-edit',
        width: 660,
        height: 250,
        singleSelect: false,
        idField: 'itemid',
   
        columns: [
            [{
                field: 'ck',
                checkbox: true
            }, {
                field: 'Name',
                title: 'Field Name',
                editor: 'text'
            }, {
                field: 'Expression',
                title: 'Expression',
                editor: 'text'
            }, {
                field: 'action',
                title: 'Action',
                width: 80,
                align: 'center',
                formatter: function(value, row, index) {
                    if (row.editing) {
                        var s = '<a href="javascript:void(0)" onclick="obj.save()">Save</a> ';
                        var c = '<a href="javascript:void(0)" onclick="cancelrow(this)">Cancel</a>';
                        return s + c;
                    } else {
                        var e = '<a href="javascript:void(0)" onclick="obj.edit()">Edit</a> ';
                        var d = '<a href="javascript:void(0)" onclick="deleterow(this)">Delete</a>';
                        return e + d;
                    }
                }
            }]
        ],
        onEndEdit: function(index, row) {
            obj.editRow = undefined;
        },
        onBeforeEdit: function(index, row) {
            row.editing = true;
            $(this).datagrid('refreshRow', index);
        },
        onAfterEdit: function(index, row) {
            row.editing = false;
            $(this).datagrid('refreshRow', index);
        },
        onCancelEdit: function(index, row) {
            row.editing = false;
            $(this).datagrid('refreshRow', index);
        }
    });



    $("#bt_next").click(function() {
        $.ajax({
            //提交数据的类型 POST GET
            type: "POST",
            //提交的网址
            url: "http://localhost/server.php",
            //提交的数据
            data: {
                Action: "PARSING",
                Content: "data",
                SourceData: $("#source").value,
                SessionId: "aaaaaaa",
            },
            //返回数据的格式
            datatype: "json", //"xml", "html", "script", "json", "jsonp", "text".

            //成功返回之后调用的函数             
            success: function(data) {
                //alert(data);
                var method = "";
                var response = $.parseJSON(data);
                for (var i = response[0].List.length - 1; i >= 0; i--) {
                    var bt = $('<input type=\"button\" class="bt_method" value=\"' + response[0].List[i].Name + '\"' + "id=" + response[0].List[i].Name + 'onclick="showcontent()"' + "/>");
                    $("#east").append(bt);
                }


                $(".bt_method").click(function() {
                    for (var i = response[0].List.length - 1; i >= 0; i--) {
                        if (response[0].List[i].Name == this.value) {
                            $("#parsing_table").datagrid("loadData", response[0].List[i].FieldList);
                            method = this.value;
                        }
                    }

                });

                $("#Add").click(function() {
                    var ids = [];
                    var trows = $('#parsing_table').datagrid('getSelections');
                    for (var i = 0; i < trows.length; i++) {
                        var expression = 'SCANDBL(PAGE[Q19908, 7-4, 20-4], "' + method + '", "B-A1")';
                        var obj = {
                            "Name": trows[i].Name,
                            "Expression": expression
                        };
                        ids.push(obj);
                    }
                    $("#target").datagrid("loadData", ids);
                });
            },
            //调用执行后调用的函数
            complete: function(XMLHttpRequest, textStatus) {
                //alert(XMLHttpRequest.responseText);
                //alert(textStatus);
                //HideLoading();
            },
            //调用出错执行的函数
            error: function() {
                //请求出错处理
            }
        });
    });
});