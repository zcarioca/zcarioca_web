package com.zcarioca.website

class PageService {

    static transactional = true

    def nextOrder() {
       def results = Page.withCriteria {
          projections {
             max 'pageOrder'
          }
       }
       
       def nextOrder = 0;
       if (results) {
          nextOrder = results[0] + 1
       }
       return nextOrder
    }
}
