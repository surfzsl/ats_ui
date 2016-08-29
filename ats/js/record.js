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
	$("#recordlist").height($(window).height());
	var records = new Object();
	records.DATA = [];
	$(document).ready(function() {
		//if ($.cookie('session')) {
		//alert($.cookie('session'));
		//$.post("http://10.35.32.146:24576/app/bu/ATS/record", {
		//		SessionId: $.cookie('session'),
		//	},
		$.post("http://localhost/server.php", {
				SessionId: $.cookie('session'),
				Action: "R",
				Content: "Recordlist",
				SourceData: "",
			},

			//$.post("../phpController/test.php",{
			//	name:"admin3",
			//},
					
				//alert(response.DATA.List[1]);
				//var tmp = "";
				//for (var i = 0; i <= 2; i++) {
				//	tmp += JSON.stringify(response.DATA.List[i]) + ",";
				//}
				//tmp += JSON.stringify(response.DATA.List);
				//alert(tmp);

				function(data){
					alert(data);
					var response = $.parseJSON(data);
				//$("#recordlist").datagrid("loadData", response);
			});
		//} else {
		//	window.location.href = "/ats";
		//}
	});



});