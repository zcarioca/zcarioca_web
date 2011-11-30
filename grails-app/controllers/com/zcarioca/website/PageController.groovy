package com.zcarioca.website

class PageController {
   
   static String wikiMarkup = 'xwiki/2.0'
   static String htmlMarkup = 'xhtml/1.0'
   
   def scaffold = true
   
   def imageService
   def pageService
   
   def xwikiRenderer
   
   def create = {
      def pageInstance = new Page()
      pageInstance.properties = params
      
      pageInstance.pageOrder = pageService.nextOrder()
      [ pageInstance: pageInstance]
   }
   
   def save = {
      def page = new Page(params)
      page.save()
      
      params.image.each {
         for (def e in it) {
            def item = e.value
            imageService.saveImage(page, item)
         }
      }
      if (page.save(flush:true)){
         flash.message = "${message(code: 'default.created.message', args: [message(code: 'page.label', default: 'Page'), page.id])}"
         redirect(action:'show', id: page.id)
      } else {
         render(view: 'create', model: [ pageInstance: page])
      }
   }

   def render = {
      [ page : Page.get(params.id)]
   }
}
