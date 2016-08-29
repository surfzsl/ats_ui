var session;
$(function() {

	$('#member, #logout').hide();

	if ($.cookie('user')) {
		$('#member, #middle, #logout').show();
		$('#login').hide();
		$('#member').html($.cookie('user'));
	} else {
		$('#member, #middle, #logout').hide();
	}

	$('#logout').click(function() {
		$.removeCookie('user');
		window.location.href = '/ats';
	});

	$('#loading').dialog({
		autoOpen: false,
		modal: true,
		closeOnEscape: false,
		resizable: false,
		draggable: false,
		width: 180,
		height: 50,
	}).parent().parent().find('.ui-widget-header').hide();

	$('#login').dialog({
		autoOpen: true,
		modal: true,
		resizable: false,
		width: 360,
		height: 260,
		buttons: {
			'login': function() {
				var sha256Pass = sha256($('#Password').val());
				$('#Password').val(sha256Pass);
				$(this).submit();
			}
		}
	}).validate({

		submitHandler: function(form) {
			$(form).ajaxSubmit({
				url: 'http://10.35.32.146:24576/app/authen/login',
				type: 'POST',
				data: {
					Force: '1',
				},
				beforeSubmit: function(formData, jqForm, options) {
					//$('#loading').dialog('open');
					$('#login').dialog('widget').find('button').eq(0).button('disable');
				},
				success: function(responseText, statusText) {
					if (responseText) {
						session = $.parseJSON(responseText);

						if (session.DATA.SessionId) {
							$('#loading').dialog('open');
							$('#login').dialog('widget').find('button').eq(0).button('enable');
							$('#loading').css('background', 'url(img/success.gif) no-repeat 20px center').html('Login Success...');
							$.cookie('session', session.DATA.SessionId);
							if ($('#expires').is(':checked')) {
								$.cookie('user', $('#Name').val(), {
									expires: 7,
								});
							} else {
								$.cookie('user', $('#Name').val());
							}
							setTimeout(function() {
								$('#loading').dialog('close');
								$('#login').dialog('close');
								$('#login').resetForm();
								$('#login span.star').html('*').removeClass('succ');
								$('#loading').css('background', 'url(img/loading.gif) no-repeat 20px center').html('data loading...');
								$('#member, #logout').show();
								$('#member').html($.cookie('user'));
							}, 1000);
							window.location.href = "views/record.html";

						} else {
							$.cookie('user', null)
							window.location.href = "/ats";
						}
					}
				},
				errors: function() {
					alert("login error");
				}
			});
		},

		showErrors: function(errorMap, errorList) {
			var errors = this.numberOfInvalids();

			if (errors > 0) {
				$('#login').dialog('option', 'height', errors * 20 + 240);
			} else {
				$('#login').dialog('option', 'height', 240);
			}

			this.defaultShowErrors();
		},

		highlight: function(element, errorClass) {
			$(element).css('border', '1px solid #630');
			$(element).parent().find('span').html('*').removeClass('succ');
		},

		unhighlight: function(element, errorClass) {
			$(element).css('border', '1px solid #ccc');
			$(element).parent().find('span').html('&nbsp;').addClass('succ');
		},

		errorLabelContainer: 'ol.login_error',
		wrapper: 'li',

		rules: {
			Name: {
				required: true,
				minlength: 2,
			},
			Password: {
				required: true,
				minlength: 6,
			},
		},
		messages: {
			Name: {
				required: '帐号不得为空！',
				minlength: jQuery.format('帐号不得小于{0}位！'),
			},
			Password: {
				required: '密码不得为空！',
				minlength: jQuery.format('密码不得小于{0}位！'),
				remote: '帐号或密码不正确！',
			}
		}
	});


});