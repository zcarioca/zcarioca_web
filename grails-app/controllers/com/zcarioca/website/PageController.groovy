package com.zcarioca.website

class PageController {
   
   static String wikiMarkup = 'xwiki/2.0'
   static String htmlMarkup = 'xhtml/1.0'
   
   def scaffold = true
   def xwikiRenderer

   def render = {
      [ page : Page.get(params.id)]
   }
}
