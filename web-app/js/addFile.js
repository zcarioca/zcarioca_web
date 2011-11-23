var addFileUpload = null;
(function($) {
  addFileUpload = function(parent, name, number, binding, handler) {
     var element = $('#'+parent);
     var num = number+1;
     var uploader = $('<input type="file" name="'+name+'.'+num+'"/>');
     element.append(uploader);
     
     if (typeof(binding) !== 'undefined') {
        uploader.bind(binding, handler);
     }
     return num;
  };
})(jQuery);