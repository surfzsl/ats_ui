/**
$(function() {
	var records = new Object();
	$(document).ready(function() {
		if ($.cookie('user')) {
			$.post("http://10.35.32.146:24576/app/bu/ATS/record", {
					SessionId: $.cookie('user'),
				},
				function(data, status) {
					records = $.parseJSON(data);
					alert(records.DATA.List);
					$("#recordlist").datagrid({
						title: "records",
						fitColumns : true,
						data: [{"Name": "REC0000274","Version": 0,"Container": "Default","Owner": "32313075","Group": "NONE","Rights": "AA","TemplateId": "DEFAULT","TimeFid": "Default","DateFid": "Default","RecordTimestamp": "Reset","ExpiredDate": "01/19/2038","ModifiedDate": "12/09/2015","PE": 0,"PPE": 0,"Description": "","LastContrib": "","LastContribTime": "","LastContribUserId": "","FieldSize": 4},{"Name": "REC0000275","Version": 0,"Container": "Default","Owner": "32313075","Group": "NONE","Rights": "AA","TemplateId": "DEFAULT","TimeFid": "Default","DateFid": "Default","RecordTimestamp": "Reset","ExpiredDate": "01/19/2038","ModifiedDate": "12/09/2015","PE": 0,"PPE": 0,"Description": "","LastContrib": "","LastContribTime": "","LastContribUserId": "","FieldSize": 4},{"Name": "REC0000276","Version": 0,"Container": "Default","Owner": "32313075","Group": "NONE","Rights": "AA","TemplateId": "DEFAULT","TimeFid": "Default","DateFid": "Default","RecordTimestamp": "Reset","ExpiredDate": "01/19/2038","ModifiedDate": "12/09/2015","PE": 0,"PPE": 0,"Description": "","LastContrib": "","LastContribTime": "","LastContribUserId": "","FieldSize": 4},{"Name": "REC0000277","Version": 0,"Container": "Default","Owner": "32313075","Group": "NONE","Rights": "AA","TemplateId": "DEFAULT","TimeFid": "Default","DateFid": "Default","RecordTimestamp": "Reset","ExpiredDate": "01/19/2038","ModifiedDate": "12/09/2015","PE": 0,"PPE": 0,"Description": "","LastContrib": "","LastContribTime": "","LastContribUserId": "","FieldSize": 4},{"Name": "REC0000278","Version": 0,"Container": "Default","Owner": "32313075","Group": "NONE","Rights": "AA","TemplateId": "DEFAULT","TimeFid": "Default","DateFid": "Default","RecordTimestamp": "Reset","ExpiredDate": "01/19/2038","ModifiedDate": "12/09/2015","PE": 0,"PPE": 0,"Description": "","LastContrib": "","LastContribTime": "","LastContribUserId": "","FieldSize": 4},{"Name": "REC0000279","Version": 0,"Container": "Default","Owner": "32313075","Group": "NONE","Rights": "AA","TemplateId": "DEFAULT","TimeFid": "Default","DateFid": "Default","RecordTimestamp": "Reset","ExpiredDate": "01/19/2038","ModifiedDate": "12/09/2015","PE": 0,"PPE": 0,"Description": "","LastContrib": "","LastContribTime": "","LastContribUserId": "","FieldSize": 4},{"Name": "REC0000280","Version": 0,"Container": "Default","Owner": "32313075","Group": "NONE","Rights": "AA","TemplateId": "DEFAULT","TimeFid": "Default","DateFid": "Default","RecordTimestamp": "Reset","ExpiredDate": "01/19/2038","ModifiedDate": "12/09/2015","PE": 0,"PPE": 0,"Description": "","LastContrib": "","LastContribTime": "","LastContribUserId": "","FieldSize": 4},{"Name": "REC0000281","Version": 0,"Container": "Default","Owner": "32313075","Group": "NONE","Rights": "AA","TemplateId": "DEFAULT","TimeFid": "Default","DateFid": "Default","RecordTimestamp": "Reset","ExpiredDate": "01/19/2038","ModifiedDate": "12/09/2015","PE": 0,"PPE": 0,"Description": "","LastContrib": "","LastContribTime": "","LastContribUserId": "","FieldSize": 4},{"Name": "REC0000282","Version": 0,"Container": "Default","Owner": "32313075","Group": "NONE","Rights": "AA","TemplateId": "DEFAULT","TimeFid": "Default","DateFid": "Default","RecordTimestamp": "Reset","ExpiredDate": "01/19/2038","ModifiedDate": "12/09/2015","PE": 0,"PPE": 0,"Description": "","LastContrib": "","LastContribTime": "","LastContribUserId": "","FieldSize": 4},{"Name": "REC0000283","Version": 0,"Container": "Default","Owner": "32313075","Group": "NONE","Rights": "AA","TemplateId": "DEFAULT","TimeFid": "Default","DateFid": "Default","RecordTimestamp": "Reset","ExpiredDate": "01/19/2038","ModifiedDate": "12/09/2015","PE": 0,"PPE": 0,"Description": "","LastContrib": "","LastContribTime": "","LastContribUserId": "","FieldSize": 4}],
						columns: [
							[{
								field: 'Name',
								title: 'Record Name',
							}, {
								field: 'Model',
								title: 'Model',
							}, {
								field: 'Container',
								title: 'Container',
							}, ]
						],

					});
				});
		} else {
			window.location.href = "/ats";
		}
	});

	alert(records.options);



});
**/
$(function() {
	var records = new Object();
	records.DATA = [];
	$(document).ready(function() {
		if ($.cookie('session')) {
			alert($.cookie('session'));
			$.post("http://10.35.32.146:24576/app/bu/ATS/record", {
					SessionId: $.cookie('session'),
				},
				function(data, status) {
					var response = $.parseJSON(data);
					//alert(response.DATA.List[1]);
					//var tmp = "";
					//for (var i = 0; i <= 2; i++) {
					//	tmp += JSON.stringify(response.DATA.List[i]) + ",";
					//}
					//tmp += JSON.stringify(response.DATA.List);
					//alert(tmp);
					var mydata = {
						"total": response.DATA.List.length,
						"rows": response.DATA.List
					};

					var rows = [];
					for (var i = 1; i <= 8000; i++) {
						var amount = Math.floor(Math.random() * 1000);
						var price = Math.floor(Math.random() * 1000);
						rows.push({
							Name: 'Inv No ' + i,
							ModifiedDate: $.fn.datebox.defaults.formatter(new Date()),
							Container: 'Name ' + i,
							amount: amount,
							Model: price,
							Owner: amount * price,
							Group: 'Note ' + i
						});
					}

					//alert("data prepared finished");
					$("#recordlist").datagrid({
						columns: [
							[{
								field: 'Name',
								title: 'Record Name',
								sortable: true,
							}, {
								field: 'Model',
								title: 'Model',
							}, {
								field: 'Container',
								title: 'Container',
							}, {
								field: 'FieldSize',
								title: 'No.Field',
							}, {
								field: 'Owner',
								title: 'Owner',
							}, {
								field: 'Group',
								title: 'Group',
							}, {
								field: 'ModifiedDate',
								title: 'Modifie dDate',
							}, {
								field: 'ExpiredDate',
								title: 'Expire dDate',
							}, {
								field: 'GroupRights',
								title: 'Group Rights',
							}, {
								field: 'OtherRights',
								title: 'Record Name',
							}, {
								field: 'DateFid',
								title: 'TimesStamp Date',
							}, {
								field: 'TimeFid',
								title: 'Timestamp Time',
							}, {
								field: 'RecordTimestamp',
								title: 'Restored',
							}, {
								field: 'TemplatedId',
								title: 'Template',
							}, {
								field: 'PE',
								title: 'PE',
							}, {
								field: 'PPE',
								title: 'PPE',
							}, {
								field: 'LastContrib',
								title: 'Last Contribution Date',
							}, {
								field: 'LastContribTime',
								title: 'Last Contribution Time',
							}, {
								field: 'LastContribUserId',
								title: 'Last Contributor',
							}, {
								field: 'Description',
								title: 'Description',
							}, ]
						],

						pagination: true,
						pageSize: 5,
						pageList: [5, 10, 15],
						pageNumber: 1,
						pagePosition: 'bottom',
						sortName: 'Name',
						sortOrder: 'DESC',
						remoteSort: false,
					});
					$("#recordlist").datagrid("loadData", rows);
				});
		} else {
			window.location.href = "/ats";
		}
	});



});