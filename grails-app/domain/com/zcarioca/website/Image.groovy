package com.zcarioca.website

class Image {

   String title
   String altText
   byte[] image
   String mimeType

   static belongsTo = [ page: Page ]
   
   String toString() {
      return "Image: ${page?.title} - ${title}"
   }

   static constraints = {
      title(size: 1..30, nullable: false, unique: ['title', 'page'])
      altText(maxSize: 50, nullable: true)
      image(nullable: false, maxSize: 2097152 /* 2 MB */)
      mimeType(nullable: false)
   }
}
