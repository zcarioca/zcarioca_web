var index_json = null;
(function($) {
  setBlogMenu = function(sidebar) {
    var archives = sidebar.archives;
    var categories = sidebar.categories;
    var menu = $('#blog-nav-menu');
    var ul_arch = $('#blog-nav-list', menu);
    var ul_cats = $('#blog-nav-categories', menu);
    for (var i = 0; i < archives.length; i++) {
      var item = archives[i];
      ul_arch.append('<li><a href="#blog?y='+item['year']+'&m='+item['month']+'">'+item['name']+'</a></li>');
    }
    for (var i = 0; i < categories.length; i++) {
      var item = categories[i];
      ul_cats.append('<li><a href="#blog?c='+item['slug']+'">'+item['name']+'</a></li>');
    }
  };
  setPages = function() {
    var content_area = $('#content-text');
    var pageList = index_json.pages;
    for (var i = 0; i < pageList.length; i++) {
      var page = pageList[i];
      $.getJSON(page.url, function(content) {
        var page_data = content.page;
        var content_page = $('#content-page-'+page_data.id);
        content_page.html(content_page.html() + page_data.content);
        var toggleDD = function(dl, show) {
          var dd = $('dd', dl);
          dd.stop();
          if (show) {
            dd.css('height','0px');
            dd.show();
            dd.animate({'height':'24px'}, 'fast', 'swing');
          } else {
            dd.animate({'height':'0px'}, 'fast', 'swing', function() { $(this).hide(); });
          }
        };
        $('dl', content_page).hover(function() {
          toggleDD($(this), true);
        }, function() {
          toggleDD($(this), false);
        });
      });
    }
  };
  $(document).ready(function() {
    $(window).resize(resizeBG); 
    resizeBG();
    $.getJSON('/blog/', function(data) {
      index_json = data;
      setPages();
      setBlogMenu(data.sidebar);
      setBlogPage(data.posts);
      var navbar = $('#nav-content');
      $('a', navbar).click(function() { $(this).blur(); });
      $('#nav-search').find('input').bind('change blur', function() {
        var hash = '#blog';
        if ($(this).val().length > 0) {
          hash += '?s=' + escape($(this).val());
        };
        location.hash = hash;
      });
      gotoPage();
      setEmailValidation();
    });
    $('#blog-nav-menu').hover(function() {
      $(this).stop();
      $(this).animate({'right':'-20px'},'fast','swing');
    },
    function() {
      $(this).stop();
      $(this).animate({'right':'-192px'},'fast','swing');
    }).css('right','-230px');
    $(window).bind('hashchange', gotoPage);
  });
})(jQuery);
