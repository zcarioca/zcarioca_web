package com.zcarioca.website

import grails.test.*

class PageIntegrationTests extends GroovyTestCase {

   static String wikiMarkup = 'xwiki/2.1'
   static String htmlMarkup = 'xhtml/1.0'

   def xwikiRenderer

   void testRendererBold() {
      def page = new Page(title: 'title', content: 'content is **bold**.')

      def string = xwikiRenderer.render(page.content, wikiMarkup, htmlMarkup)

      assertEquals '<p>content is <strong>bold</strong>.</p>', string
   }
   
   void testRendererItalic() {
      def page = new Page(title: 'title', content: 'content is //italic//.')
      def string = xwikiRenderer.render(page.content, wikiMarkup, htmlMarkup)

      assertEquals '<p>content is <em>italic</em>.</p>', string
   }
   
   void testParagraphs() {
      def page = new Page(title: 'title', content: 'Paragraph one.\n\nParagraph two.')
      def string = xwikiRenderer.render(page.content, wikiMarkup, htmlMarkup)
      
      assertEquals '<p>Paragraph one.</p><p>Paragraph two.</p>', string
      
      page.content = 'Paragraph one.\nParagraph two.'
      string = xwikiRenderer.render(page.content, wikiMarkup, htmlMarkup)
      assertEquals '<p>Paragraph one.<br/>Paragraph two.</p>', string
   }
   
   void testBullets() {
      def page = new Page(title: 'title', content: '* Bullet 1\n* Bullet 2')
      def string = xwikiRenderer.render(page.content, wikiMarkup, htmlMarkup)
      
      assertEquals '<ul><li>Bullet 1</li><li>Bullet 2</li></ul>', string
   }
}
