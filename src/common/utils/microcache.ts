/* lru 缓存
  */

import LRU from 'lru-cache'

const option = {
    max: 500,
    length: function (n: any, key: any) { return n * 2 + key.length },
    // dispose: function (key: any, n: any) { },
    maxAge: 1000 * 60 * 60
}

const t = `@-@-@`

class microCache {
  micro: LRU<any, any>
  constructor(options: any = option) {
      this.micro = new LRU(options)
  }



  set(k: any, v: any, type: string) {
      this.micro.set(k, `${v}${t}${type}`)
  }

  get(k: any) {
      const v = this.micro.get(k)
      if(!v){return null}
      const ary = v.split(t)
      return { value: ary[0], type: ary[1] }
      
  }
}  

 
export default microCache

  
