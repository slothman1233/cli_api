
//子线程示例
const { Worker, isMainThread, parentPort, threadId } = require('worker_threads')



if (isMainThread) { throw new Error('嘿！你为什么在主线程跑这个玩意！！？？') }




function renderer(data) {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(11)
        }, 2000)
    })

   
}



// 以上是主函数定义，接下来是 Worker 相关
// 从主线程获取数据，传入的数据为需要渲染的文件名
parentPort.on('message',  (msg) => {

    // const dd = await
    renderer(msg).then(result =>{
        parentPort.postMessage(`5555,${result}`)
    })


})

