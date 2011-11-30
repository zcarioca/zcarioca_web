package com.zcarioca.website

class ImageController {

   def scaffold= true;
   
   def imageService
   
   def render = {
      imageService.renderByImageId(params.imageId, response)
   }
}
