function gotoPage() {
  var navbar = jQuery('#nav-bar');
  var ul = jQuery('#nav-list', navbar);
  var page = '';
  if (typeof(location.hash) !== 'undefined' && location.hash.length > 0) {
    page = location.hash.substr(1);
  }
  if (page.indexOf('?') != -1) {
    page = page.substring(0, page.indexOf('?'));
  }
  if (page.length > 0) {
    jQuery('li', ul).removeClass('active');
    jQuery('#link-' + page, ul).addClass('active');
    jQuery.displayContent(page);
    var subList = jQuery('.nav-blog', navbar);
    if (page == 'blog') {
      if (subList.is(':hidden')) {
        subList.fadeIn('fast');
      }
      moveToBlog();
    } else {
      if (!subList.is(':hidden')) {
        subList.fadeOut('fast');
      }
    }
  }
}

(function($) {
  $.displayContent = function(item) {
    $.hideContent();
    var content = $('#content');
    if (content.is(':hidden')) {
      content.slideDown('slow', function() { $.showContent(item); });
    } else {
      $.showContent(item);
    }
  };
  $.showContent = function(item) {
    var contentArea = $('#content-'+item);
    contentArea.show(); 
    if (item == 'blog') {
      $('#blog-nav-menu').stop();
      $('#blog-nav-menu').animate({'right':'-192px'});
    } else {
      $('#blog-nav-menu').stop();
      $('#blog-nav-menu').animate({'right':'-230px'});
    }
  };
  $.hideContent = function() {
    $('.content-object', '#content-text').hide();
  };
})(jQuery);
