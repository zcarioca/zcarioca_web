package com.zcarioca.website

class IndexController {

   def index = {
      def pages = Page.list()
      [ pages : pages ]
   }
}
