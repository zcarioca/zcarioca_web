package com.zcarioca.website

class ImageService {

   static transactional = true

   def createImageId(page) {
      def value = Image.count() + 1
      return "image_${page.id}.${value}"
   }

   def saveImage(page, multipartElement) {
      def file = multipartElement.fileItem
      if (!file.fileName) {
         return
      }
      def image = new Image(title: file.fileName,
            altText: file.fileName,
            image: multipartElement.getBytes(),
            imageId: createImageId(page),
            mimeType: file.contentType)

      log.debug "Inserting image ${image.title} into page ${page.title}"

      page.addToAttachments(image)
   }
   
   def renderByImageId(imageId, response) {
      def image = Image.findByImageId(imageId)
      if (image) {
         response.setContentType(image.mimeType)
         response.setContentLength(image.image.size())
         OutputStream out = response.getOutputStream()
         out.write(image.image)
         out.close()
      }
   }
}
