package com.zcarioca.website

/**
 * A page in a website.
 * @author zcarioca
 */
class Page {

   String title
   String content
   
   Date dateAdded = new Date()
   Date dateModified = new Date()
   
   static constraints = {
      title(blank: false, nullable: false, maxSize: 140)
      content(maxSize: 5000)
   }
}
