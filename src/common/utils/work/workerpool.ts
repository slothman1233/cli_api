
import os from 'os'
import { Worker } from 'worker_threads'
const cpusLength = os.cpus().length

type taskModel = {
  data: any,
  callback: (error: any, result: any) => void
}

type workerByIdModel = {
  [propName: number]: Worker
}

/**
 * 线程池
 * @param {string} workerPath 需要在线程里面执行的js文件地址
 * @param {number} numberOfThreads 启动线程的数量 某人为CPU的数量
 */
class workerPool {
  //任务队列
  _queue: Array<any> = []

  // Worker 索引
  _workerById: workerByIdModel = {}

  // Worker 激活状态索引
  _activeWorkerById = {}

  //启动线程的数量
  numberOfThreads = cpusLength

  constructor(workerPath: string, numberOfThread = cpusLength) {
      if (numberOfThread < 1) {
          throw new Error('线程的数量应该大于或等于1!')
      }

      this.numberOfThreads = numberOfThread

      //创建worker
      for (let i = 0; i < this.numberOfThreads; i++) {
          const worker = new Worker(workerPath)

          //保存worker索引
          this._workerById[i] = worker
          // 将这些 Worker 设置为未激活状态
          this._activeWorkerById[i] = false
      }

  }

  /**
   * 寻找空闲的worker用于执行
   */
  getInactiveWorkerId() {
      for (let i = 0; i < this.numberOfThreads; i++) {
          if (!this._activeWorkerById[i]) { return i }
      }
      return -1
  }

  /**
   * 调用 Worker 执行
   * @param {number} workerId worker索引 
   * @param {any} taskObj data传给子线程的参数 
          * error 失败的信息 成功的话error为null
          * result成功返回的信息
   */
  runWorker(workerId: number, taskObj: taskModel) {

      const worker = this._workerById[workerId]

      // 当任务执行完毕后执行
      const doAfterTaskIsFinished = () => {
      // 去除所有的 Listener，不然一次次添加不同的 Listener 会 OOM 的
          worker.removeAllListeners('message')
          worker.removeAllListeners('error')
          // 将这个 Worker 设为未激活状态
          this._activeWorkerById[workerId] = false

          if (this._queue.length > 0) {
              // 任务队列非空，使用该 Worker 执行任务队列中第一个任务
              this.runWorker(workerId, this._queue.shift())
          }

      }

      // 将这个 Worker 设置为激活状态
      this._activeWorkerById[workerId] = true
      // 设置两个回调，用于 Worker 的监听器
      const messageCallback = (result: any) => {
          taskObj.callback(null, result)
          doAfterTaskIsFinished()
      }

      const errorCallbcak = (error: any) => {
          taskObj.callback(error, null)
          doAfterTaskIsFinished()
      }

      // 为 Worker 添加 'message' 和 'error' 两个 Listener
      worker.on('message', messageCallback)

      worker.on('error', errorCallbcak)

      // 将数据传给 Worker 供其获取和执行
      worker.postMessage(taskObj.data)

  }

  /** 
   * 执行线程
   * @param {any} data 传给子线程的参数 
   */
  run<T>(data: any):Promise<T> {

      return new Promise((resolve, reject) => {
      // 调用 getInactiveWorkerId() 获取一个空闲的 Worker
          const availableWorkerId = this.getInactiveWorkerId()

          const taskObj = {
              data,
              callback: (error: any, result: any) => {
                  if (error) {
                      reject(error)
                  }

                  return resolve(result)
              }
          }

          // 当前没有空闲的 Workers 了，把任务丢进队列里，这样一旦有 Workers 空闲时就会开始执行。
          if (availableWorkerId === -1) {
              this._queue.push(taskObj)
              return null
          }

          // 有一个空闲的 Worker，用它执行任务
          this.runWorker(availableWorkerId, taskObj)

      })


  }

  /**
   * 清空所有子线程
   */
  destroy(force = false) {
      for (let i = 0; i < this.numberOfThreads; i++) {
          if (this._activeWorkerById[i] && !force) {
              // 通常情况下，不应该在还有 Worker 在执行的时候就销毁它，这一定是什么地方出了问题，所以还是抛个 Error 比较好
              // 不过保留一个 force 参数，总有人用得到的
              throw new Error(`${i}线程正在运行！`)
          }
     
          this._workerById[i].terminate()
      }
  }

}


export default workerPool




