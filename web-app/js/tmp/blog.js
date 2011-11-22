var post_urls = {};
(function($) {
  moveToBlog = function() {
    var blogPage = $('#content-blog');

    if (location.hash.indexOf('?') != -1) {
      var query = location.hash.substring(location.hash.indexOf('?')+1);
      query = query.split('&');

      var qmap = {};
      for (var i = 0; i < query.length; i++) {
        var param = query[i].split('=');
        qmap[param[0]] = param[1];
      }

      if (typeof(qmap.p) !== 'undefined' && qmap.p.length > 0) {
        loadBlogPost(blogPage, qmap.p);
      } else if (typeof(qmap.s) !== 'undefined' && qmap.s.length > 0) {
        showSearchResults(qmap.s);
      } else if (typeof(qmap.y) !== 'undefined' && qmap.y.length > 0) {
        showArchiveResults(qmap.y, qmap.m);
      } else if (typeof(qmap.c) !== 'undefined' && qmap.c.length > 0) {
        showCategoryResults(qmap.c);
      } else {
        showArchive(blogPage);
      }
    } else {
      showArchive(blogPage);
    }
  };

  setCommentValidation = function(form) {
    form.validate({
      errorElement: 'span',
      errorPlacement: function(error, element) {
        error.appendTo(element.parent('div').find('label'));
      },
      rules: {
        author: 'required',
        email: { required: true, email: true },
        comment: 'required'
      },
      messages: {
        author: 'Please enter your name',
        comment: 'An empty comment cannot be submitted',
        email: { required: 'Please enter a valid email address', email: 'Please enter a valid email address' }
      },
      submitHandler: function(frm) {
        var postArea = form.parents('.post-section');
        var id = postArea.attr('id');
        var postId = id.substring(5);
        $(frm).ajaxSubmit({
          url: '/blog/wp-comments-post.php',
          type: 'POST',
          beforeSubmit: function(arr, form, options) {
            postArea.children().hide();
            postArea.append('<div class="preloader"><img src="images/loader.gif" alt="" title=""/><div>');
          },
          success: function(responseText, statusText, xhr) {
            postArea.remove();
            loadBlogPost($('#content-blog'), postId);
          },
          clearForm: true
        });
      }
    });
  };

  setComments = function(parent, comments, open) {
    for (var i = 0; i < comments.length; i++) {
      var comment = comments[i];
      var area = $('<div id="comment_' + comment.id + '" class="comment"></div>');
      area.append('<span class="comment-author">'+comment.author.name+'</span>');

      var children = comment.children;
      parent.append(area);
      if (open) {
        area.append('<div class="comment-reply"><span class="reply-link">reply</span></div>');
  
        var replyLink = $('.reply-link', area);
        replyLink.hover(function() { $(this).css('text-decoration', 'underline'); }, function() { $(this).css('text-decoration', 'none'); });
        replyLink.click(function() {
          var commentsSection = $('#post-comments-'+comment.post_id);
          var commentFormSection = $("#comment-form");
          commentFormSection.detach();
          if ($(this).is('.open')) {
            $(this).removeClass('open');
            $('#comment_parent', commentFormSection).attr('value', '0');
            commentsSection.append(commentFormSection);
          } else {
            $(this).addClass('open');
            var cid = $(this).parents('.comment').attr('id');
            cid = cid.substring(8);
            $('#comment_parent', commentFormSection).attr('value', cid);
            var thisComment = $(this).parent().parent();
            $('.comment-content:first', thisComment).append(commentFormSection);
          }
        });
      }
      area.append('<span class="comment-date">'+comment['date']+'</span>');
      area.append('<div class="comment-content">'+comment.content+'</span>');
    }
    if (children != null && children.length > 0) {
      setComments(area, children, open);
    }
  };

  loadBlogPost = function(blogPage, postId) {
    var search = $('#nav-search > input');
    search.val('');
    var archiveList = $('#blog-archive', blogPage);
    var posts = $('#blog-posts', blogPage);
    var searchList = $('#blog-search', blogPage);

    archiveList.hide();
    searchList.hide();
    posts.show();
    posts.children().hide();

    var post = $('#post_' + postId, posts);
    if (post.size() != 0) {
      post.show();
    } else {
      post = $('<div id="post_'+postId+'" class="post-section"></div>');
      posts.append(post);

      post.append('<div class="preloader"><img src="images/loader.gif" alt="" title=""/><div>');
    
      $.getJSON(post_urls[postId], function(data) {
        var postnavtop = $('<div id="post-nav-top" class="post-navbar"></div>');
        var postnavbottom = $('<div id="post-nav-bottom" class="post-navbar"></div>');
        var pdata = data.post;
        
        if (pdata.prev != null) {
          postnavtop.append('<div class="left"><a href="#blog?p='+pdata.prev+'">prev</a></div>');
          postnavbottom.append('<div class="left"><a href="#blog?p='+pdata.prev+'">prev</a></div>');
        } else {
          postnavtop.append('<div class="left-empty">&nbsp;</div>');
          postnavbottom.append('<div class="left-empty">&nbsp;</div>');
        }
        if (pdata.next != null) {
          postnavtop.append('<div class="right"><a href="#blog?p='+pdata.next+'">next</a></div>');
          postnavbottom.append('<div class="right"><a href="#blog?p='+pdata.next+'">next</a></div>');
        } else {
          postnavtop.append('<div class="right-empty">&nbsp;</div>');
          postnavbottom.append('<div class="right-empty">&nbsp;</div>');
        }
   
        var contentArea = $('<div class="content-area"></div>');
        contentArea.html(pdata.content);

        var commentsSection = $('<div id="post-comments-'+pdata.id+'" class="comments-section"></div>');
        var commentFormSection = $('<div id="comment-form"></div>');
        var comments = pdata.comments;
        var openForComments = pdata.comment_status == 'open';
        if (comments != null && comments.length > 0) {
          setComments(commentsSection, comments, openForComments);
        }

        var commentForm = $('<form></form>');
        commentFormSection.append(commentForm);
        commentForm.append('<div class="comment-form-section"><label for="author">Name</label><input class="text" name="author" id="author" size="22" type="text"/></div>');
        commentForm.append('<div class="comment-form-section"><label for="email">Email (will not be published)</label><input class="text" name="email" id="email" size="22" type="text"/></div>');
        commentForm.append('<div class="comment-form-section"><label for="comment">Comment</label><textarea name="comment" id="comment" rows="5"></textarea></div>');
        commentForm.append('<input type="hidden" name="url" value=""/>');
        commentForm.append('<input type="hidden" name="comment_post_ID" value="'+pdata.id+'"/>');
        commentForm.append('<input type="hidden" name="comment_parent" id="comment_parent" value="0"/>');
        commentForm.append('<div class="comment-form-section"><input type="submit" value="Submit"/></div>');
        if (openForComments) {
          commentsSection.append(commentFormSection);
          setCommentValidation(commentForm);
        } else {
          commentsSection.append('<div id="comment-form"><div class="comments-closed">Comments Closed</div></div>');
        }

        post.empty();
        post.append(postnavtop);
        post.append('<div class="post-title">'+pdata.title+'</div>');
        post.append(contentArea);
        post.append(commentsSection);
        post.append(postnavbottom);
      });
    }
  };

  readyPageLoad = function() {
    var blogPage = $('#content-blog');
    var searchList = $('#blog-search', blogPage);
    var archiveList = $('#blog-archive', blogPage);
    var posts = $('#blog-posts', blogPage);

    archiveList.hide();
    if (searchList.size() == 0) {
      searchList = $('<div id="blog-search" style="display:none"></div>');
      blogPage.append(searchList);
    }
    searchList.empty();
    searchList.show();
    searchList.append('<div class="preloader"><img src="images/loader.gif" alt="" title=""/><div>');
  };

  showLoadResults = function(results) {
    var blogPage = $('#content-blog');
    var searchList = $('#blog-search', blogPage);
    var archiveList = $('#blog-archive', blogPage);
    var posts = $('#blog-posts', blogPage);
    searchList.empty();
    for (var i = 0; i < results.length; i++) {
      if (results[i].type == 'post') {
        setExcerpt(searchList, results[i]);
      }
    }
    archiveList.hide();
    posts.hide();
    searchList.show();
  };

  showCategoryResults = function(slug) {
    readyPageLoad();
    var url = index_json.header.forms.search.url + '/category/' + escape(slug);

    $.getJSON(url, function(data) {
      var results = data.archives.posts;
      showLoadResults(results);
    });
  };

  showArchiveResults = function(year, month) {
    readyPageLoad();
    var url = index_json.header.forms.search.url + '/' + escape(year) + '/' + escape(month);

    $.getJSON(url, function(data) {
      var results = data.archives.posts;
      showLoadResults(results);
    });
  };

  showSearchResults = function(term) {
    readyPageLoad();
    var url = index_json.header.forms.search.url + '?s=' + escape(term);
    $.getJSON(url, function(data) {
      showLoadResults(data.results);
    });
  };

  showArchive = function(blogPage) {
    var archiveList = $('#blog-archive', blogPage);
    var posts = $('#blog-posts', blogPage);
    var searchList = $('#blog-search', blogPage);

    archiveList.show();
    posts.hide();
    searchList.hide();
  };

  setExcerpt = function(div, post) {
    post_urls[post.id] = post.url;
    var pdiv = $('<div class="post"></div>');
    pdiv.attr('id', 'post_' + post.id);
    var title = $('<a class="post-title-link"></a>');
    title.attr('href', '#blog?p='+post.id);
    title.html(post.title);
    pdiv.append(title);

    title.click(function() { $(this).blur();});
    
    var postDate = $('<div class="post-date"></div>');
    postDate.text(post['date']);
    pdiv.append(postDate);

    var author = $('<div class="post-author"></div>');
    author.text(post.author.name);
    pdiv.append(author);

    var excerpt = $('<div class="post-excerpt"></div>');
    excerpt.html(post.content);
    pdiv.append(excerpt);
    
    div.append(pdiv);
  };

  setBlogPage = function(posts) {
    var blogPage = $('#content-blog');

    var archiveList = $('#blog-archive', blogPage);
    for (var i = 0; i < posts.length; i++) {
      setExcerpt(archiveList, posts[i]);
    }
  };
})(jQuery);
