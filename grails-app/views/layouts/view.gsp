<!DOCTYPE html>
<html lang="en">
    <head>
        <title>ZCarioca &raquo; <g:layoutTitle default="Welcome" /></title>
        <meta name="description" content="The personal web space of ZCarioca, a software engineer and sometimes designer"/>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="${resource(dir:'css',file:'main.css')}" />
        <link rel="stylesheet" href="${resource(dir:'css',file:'projects.css')}" />
        <link rel="stylesheet" href="${resource(dir:'css',file:'emailform.css')}" />
        <link rel="stylesheet" href="${resource(dir:'css',file:'blog.css')}" />
        <link rel="shortcut icon" href="${resource(dir:'images',file:'favicon.png')}" type="image/x-icon" />
        <g:layoutHead />
        <g:javascript library="jquery" plugin="jquery" />
        <g:javascript library="jquery-form-2.43"/>
        <g:javascript library="jquery.validate.min"/>
        <g:javascript library="bg_image"/>
        <!--[if lt IE 7]>
        <script type="text/javascript">
        var year = new Date().getFullYear();
        var terms = Math.ceil((year - 1995) / 4.0);
        alert('Your browser was released in 1995, it is now '+year+'.\nIn that period we have had '+terms+' presidential terms.\nYou will be redirected to a site where you can select a recent browser of your choice.');
        window.location = 'http://browser-update.org/en/update.html';
        </script>
        <![endif]-->
    </head>
    <body>
        <div id="body">
           <g:layoutBody/>
        </div>
    </body>
    <div id="bg">
      <div>
        <table cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td>
              <img src="${resource(dir: 'images', file: 'bg_large.jpg') }" border="0" alt=""/>
            </td>
          </tr>
        </table>
      </div>
    </div>
</html>