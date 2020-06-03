### 模拟实现 PHP sleep()函数

##### 依赖 es7 async / await 写法
##### For example: 
```diff
import sleep from '@gogh/sleep'
console.log("st: ", new Date())
(async () => {
  await sleep(3000)
-  console.log("ed: ", new Date())
+ // await ??
})()
```
