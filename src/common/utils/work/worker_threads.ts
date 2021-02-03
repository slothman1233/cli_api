import { Worker, isMainThread, parentPort, threadId } from 'worker_threads'

import path from 'path'


import workerpol from './workerpool'


export default async () => {
    if (!isMainThread) { return }


    const worker = new workerpol(path.resolve(__dirname, 'work.js'), 3)

    //错误示范
    // await 卡住了整个for循环
    // for (let i = 0; i < 100; i++) {
    //     const ss = await worker.run<string>(i + 'WWWEERERERERER')
    //     console.log(ss)
    // }
    // worker.destroy()


    //正确的使用方式
    let a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41]

    Promise.all(a.map(async item => {
        const ss = await worker.run<string>(item + 'WWWEERERERERER')
        // console.log(ss)
    })).then(() =>{
        worker.destroy()
    })

   




}




