(function($){
	'use strict';

    // Toaster Position
    
    var $toastr_bottom_center = $('.toastr-bottom-center');
	if ($toastr_bottom_center.length > 0 ) {
		$toastr_bottom_center.on("click", function(){
            toastr.clear();
            toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-bottom-center",
                "preventDuplicates": true,
                "showDuration": "1000",
                "hideDuration": "10000",
                "timeOut": "2000",
                "extendedTimeOut": "1000"
            };
            toastr.info('This is a note for Info message on Bottom Center');
		});
	}
    var $toastr_bottom_right = $('.toastr-bottom-right');
	if ($toastr_bottom_right.length > 0 ) {
		$toastr_bottom_right.on("click", function(){
            toastr.clear();
            toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-bottom-right",
                "preventDuplicates": true,
                "showDuration": "1000",
                "hideDuration": "10000",
                "timeOut": "2000",
                "extendedTimeOut": "1000"
            };
            toastr.info('This is a note for Info message on Bottom Right');
		});
	}
    var $toastr_bottom_left = $('.toastr-bottom-left');
	if ($toastr_bottom_left.length > 0 ) {
		$toastr_bottom_left.on("click", function(){
            toastr.clear();
            toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-bottom-left",
                "preventDuplicates": true,
                "showDuration": "1000",
                "hideDuration": "10000",
                "timeOut": "2000",
                "extendedTimeOut": "1000"
            };
            toastr.info('This is a note for Info message on Bottom Left');
		});
	}
    var $toastr_bottom_full = $('.toastr-bottom-full');
	if ($toastr_bottom_full.length > 0 ) {
		$toastr_bottom_full.on("click", function(){
            toastr.clear();
            toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-bottom-full-width",
                "preventDuplicates": true,
                "showDuration": "1000",
                "hideDuration": "10000",
                "timeOut": "2000",
                "extendedTimeOut": "1000"
            };
            toastr.info('This is a note for Info message on Bottom Full Width');
		});
	}
    
    
    var $toastr_top_center = $('.toastr-top-center');
	if ($toastr_top_center.length > 0 ) {
		$toastr_top_center.on("click", function(){
            toastr.clear();
            toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-top-center",
                "preventDuplicates": true,
                "showDuration": "1000",
                "hideDuration": "10000",
                "timeOut": "2000",
                "extendedTimeOut": "1000"
            };
            toastr.info('This is a note for Info message on Top Center');
		});
	}
    var $toastr_top_right = $('.toastr-top-right');
	if ($toastr_top_right.length > 0 ) {
		$toastr_top_right.on("click", function(){
            toastr.clear();
            toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-top-right",
                "preventDuplicates": true,
                "showDuration": "1000",
                "hideDuration": "10000",
                "timeOut": "2000",
                "extendedTimeOut": "1000"
            };
            toastr.info('This is a note for Info message on Top Right');
		});
	}
    var $toastr_top_left = $('.toastr-top-left');
	if ($toastr_top_left.length > 0 ) {
		$toastr_top_left.on("click", function(){
            toastr.clear();
            toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-top-left",
                "preventDuplicates": true,
                "showDuration": "1000",
                "hideDuration": "10000",
                "timeOut": "2000",
                "extendedTimeOut": "1000"
            };
            toastr.info('This is a note for Info message on Top Left');
		});
	}
    var $toastr_top_full = $('.toastr-top-full');
	if ($toastr_top_full.length > 0 ) {
		$toastr_top_full.on("click", function(){
            toastr.clear();
            toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-top-full-width",
                "preventDuplicates": true,
                "showDuration": "1000",
                "hideDuration": "10000",
                "timeOut": "2000",
                "extendedTimeOut": "1000"
            };
            toastr.info('This is a note for Info message on Top Full Width');
		});
	}
    
    // Toastr State
    
    var $toastr_info = $('.toastr-info');
	if ($toastr_info.length > 0 ) {
		$toastr_info.on("click", function(){
            toastr.clear();
            toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": true,
                "progressBar": false,
                "positionClass": "toast-bottom-center",
                "preventDuplicates": true,
                "showDuration": "1000",
                "hideDuration": "10000",
                "timeOut": "2000",
                "extendedTimeOut": "1000"
            };
            toastr.info('<em class="ti ti-filter toast-message-icon"></em> This is a note for Info message');
		});
	}
    var $toastr_success = $('.toastr-success');
	if ($toastr_success.length > 0 ) {
		$toastr_success.on("click", function(){
            toastr.clear();
            toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": true,
                "progressBar": false,
                "positionClass": "toast-bottom-center",
                "preventDuplicates": true,
                "showDuration": "1000",
                "hideDuration": "10000",
                "timeOut": "2000",
                "extendedTimeOut": "1000"
            };
            toastr.success('<em class="ti ti-check toast-message-icon"></em> This is a note for Success message');
		});
	}
    var $toastr_warning = $('.toastr-warning');
	if ($toastr_warning.length > 0 ) {
		$toastr_warning.on("click", function(){
            toastr.clear();
            toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": true,
                "progressBar": false,
                "positionClass": "toast-bottom-center",
                "preventDuplicates": true,
                "showDuration": "1000",
                "hideDuration": "10000",
                "timeOut": "2000",
                "extendedTimeOut": "1000"
            };
            toastr.warning('<em class="ti ti-alert toast-message-icon"></em> This is a note for Warning message');
		});
	}
    var $toastr_error = $('.toastr-error');
	if ($toastr_error.length > 0 ) {
		$toastr_error.on("click", function(){
            toastr.clear();
            toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": true,
                "progressBar": false,
                "positionClass": "toast-bottom-center",
                "preventDuplicates": true,
                "showDuration": "1000",
                "hideDuration": "10000",
                "timeOut": "2000",
                "extendedTimeOut": "1000"
            };
            toastr.error('<em class="ti ti-na toast-message-icon"></em> This is a note for Error message');
		});
	}
    
})(jQuery);    
    