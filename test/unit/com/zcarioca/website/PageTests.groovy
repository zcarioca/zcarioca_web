package com.zcarioca.website

import grails.test.*

class PageTests extends GrailsUnitTestCase {
   void testPojo() {
      def page = new Page(title:'This is a title', content: 'This is my *content*')
      
      assertEquals 'This is a title', page.title
      assertEquals 'This is my *content*', page.content
   }
}
