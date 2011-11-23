package com.zcarioca.website

class PageController {
   
   static String wikiMarkup = 'xwiki/2.0'
   static String htmlMarkup = 'xhtml/1.0'
   
   def scaffold = true
   def xwikiRenderer
   
   def create = {
      def pageInstance = new Page()
      pageInstance.properties = params
      
      def results = Page.withCriteria {
         projections {
            max 'pageOrder'
         }
      }
      
      def nextOrder = 0;
      if (results) {
         nextOrder = results[0] + 1
      }
      pageInstance.pageOrder = nextOrder
      [ pageInstance: pageInstance]
   }
   
   def save = {
      def page = new Page(params)
      
      params.image.each {
         for (def e in it) {
            def item = e.value
            def file = item.fileItem
            if (!file.fileName) {
               break
            }
            def image = new Image(title: file.fileName, altText: file.fileName, image: item.getBytes(), mimeType: file.contentType)
            
            println "Inserting image ${page.title} - ${image.title}"
            
            page.addToAttachments(image)
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
