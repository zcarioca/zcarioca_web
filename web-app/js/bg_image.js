function resizeBG() {
  var bg = jQuery('#bg');
  var bgimage = jQuery('img', bg);
  bgimage.bind('contextmenu', function(e) {
    e.preventDefault();
  });
  var imgHeight = 1350;
  var imgWidth = 1800;

  var width = jQuery(window).width(); 
  var height = jQuery(window).height(); 

  var css = {};

  if (height >  (0.75 * width) && height < imgHeight) {
    var minHeight = height;
    var minWidth = height / 0.75;
    css={
      'min-width': minWidth + 'px',
      'min-height': minHeight + 'px'
    };
  } else if (height < (0.75 * width) && width < imgWidth) {
    var minWidth = width;
    var minHeight = width * 0.75;
    css={
      'min-width': minWidth + 'px',
      'min-height': minHeight + 'px'
    };
  }
  bgimage.css(css);
}
(function($) {
  $(document).ready(function() {
     $(window).resize(resizeBG);
     resizeBG();
  });
})(jQuery);