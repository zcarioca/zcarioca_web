(function($) {
  setEmailValidation = function() {
    var form = $('#emailform');
    form.validate({
      errorElement: 'span',
      errorPlacement: function(error, element) {
        error.appendTo(element.parent('div').find('label'));
      },
      rules: {
        address: { required: true, email: true },
        subject: 'required',
        message: 'required'
      },
      messages: {
        address: { required: 'Please enter a valid email address', email: 'Please enter a valid email address' },
        subject: 'Please include a subject',
        message: 'Please include a message'
      },
      submitHandler: function(frm) {
        $(frm).ajaxSubmit({
          url: 'sendmail.php',
          type: 'POST',
          dataType: 'json',
          beforeSubmit: function(arr, form, options) {
            form.parent().find('#response').remove();
          },
          success: function(data) {
            if (data.success) {
              form.before('<div id="response">'+data.message+'</div>');
            } else {
              form.before('<div id="response-error">Error!! Could not process your request.</div>');
            }
          },
          clearForm: true
        });
      }
    });
  };
})(jQuery);
