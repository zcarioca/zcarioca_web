package com.zcarioca.website

class ImageController {

   def scaffold= true;
   
   def render = {
      def image = Image.get(params.id)
      
      response.setContentType(image.mimeType)
      response.setContentLength(image.image.size())
      OutputStream out = response.getOutputStream()
      out.write(image.image)
      out.close()
   }
}
