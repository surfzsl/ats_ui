$('#submit').click(function(){
	$('#login').ajaxSubmit({
		url : 'http://10.35.32.146:24576/app/authen/login',
		type : 'POST',
		});
})