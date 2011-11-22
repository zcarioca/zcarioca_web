<!DOCTYPE html>
<html lang="en">
   <head>
      <title>${page.title}</title>
   </head>
   <body>
      <h1>${page.title}</h1>
      <xwiki:render inputSyntax="xwiki/2.0" outputSyntax="xhtml/1.0">${page.content}</xwiki:render>
   </body>
</html>