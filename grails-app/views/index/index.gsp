<html>
<head>
<title>Welcome</title>
<meta name="layout" content="view" />
</head>
<body>
   <div id="page-body">
      <div id="content">
         <div id="content-body">
            <div id="content-text">
               <div id="display-area"></div>
            </div>
         </div>
      </div>
   </div>
   <div id="nav-bar">
      <div class="nav-border"></div>
      <div id="nav-content">
         <ul id="nav-list">
            <g:each in="${pages}" var="page">
               <li id="link-page-${page.id}"><g:remoteLink update="display-area" controller="page" action="render" id="${page.id }">${page.title }</g:remoteLink></li>
            </g:each>
            <li id="link-contact"><a href="#contact">Contact</a></li>
            <li id="link-blog"><a href="#blog">Blog</a></li>
         </ul>
         <ul id="nav-sub-list">
            <li><a target="_blank" href="<?=$link['url'] ?>" title="<?=$link['name']?>">
                  <?=$link['name']?>
            </a></li>
         </ul>
         <div id="nav-search" class="nav-blog">
            <input type="text" size="15" />
         </div>
      </div>
      <!-- END nav-content -->
      <div class="nav-border"></div>
   </div>
   <!-- END nav-bar -->
</body>
</html>
