package com.zcarioca.website

/**
 * A page in a website.
 * @author zcarioca
 */
class Page implements Comparable<Page> {

   String title
   String content
   short pageOrder = 0
   
   Date dateAdded = new Date()
   Date dateModified = new Date()
   
   static hasMany = [ attachments: Image ]
   
   static mapping = {
      sort pageOrder:'asc'
      content type: 'text'
      attachments lazy:false
   }
   
   static constraints = {
      title(blank: false, nullable: false, maxSize: 140, unique: true)
      content(maxSize: 5000)
      pageOrder(nullable:true)
   }
   
   String toString() {
      return "Page ${title}"
   }
   
   int compareTo(Page other) {
		return pageOrder <=> other.pageOrder
	}
}
