/* lru 缓存
  */

 import LRU from 'lru-cache'

 const option = {
     max: 10000,
     maxAge: 1000 * 60 * 60 * 24
 }
 
 const t = `@-@-@`
 
 class microCache {
   micro: LRU<any, any>
   constructor(options: any = option) {
       this.micro = new LRU(options)
   }
 
 
 
   set(k: any, v: any) {
       this.micro.set(k, v)
   }
 
   get(k: any) {
       const v = this.micro.get(k)
       if (!v) { return null }
       return v
   }
 
   //是否存在某个key
   indexOfKey(key: string) {
       let keys = this.micro.keys()
       return keys.indexOf(key) >= 0
   }
 
 }
 
 
 export default microCache
 
 
 