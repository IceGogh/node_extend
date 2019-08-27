const nodemailer = require("nodemailer");
const request = require('request')
const fs = require('fs')
const timeInit = t => {
  const m = t.getMonth()
  const d = t.getDate()
  const M = m < 10 ? '0' + m : m
  const D = d < 10 ? '0' + d : d
  return M + '.' + D
}
const img_target = 'https://car2.autoimg.cn/cardfs/product/g20/M03/A8/FB/1024x0_1_q95_autohomecar__wKjBw1hT8KSAYzT5AAXPj9yoGr4879.jpg'
// request(img_target).pipe(fs.createWriteStream(__dirname + '/img.' + timeInit(new Date()) + '.jpg'))

const pro = new Promise((resolve, reject)=>{
  request(img_target).pipe(fs.createWriteStream(__dirname + '/img.' + timeInit(new Date()) + '.jpg'))
  
})
const requestImg = () => {
  return new Promise((resolve, reject) => {
    // request(img_target).pipe(fs.createWriteStream(__dirname + '/img.33' + '.jpg'))
    let str = ''
    request(img_target)
      .on('data', chunk => {
        str += chunk
      })
      .on('end', () => {
        str.pipe(fs.createWriteStream(__dirname + '/img.34' + '.jpg'))
      })
  })
}
 requestImg()
// const imgInit = async () => {
//   console.log('sat :', new Date())
//   await 
//   await testFn()
// }
// imgInit()
// const testFn = async () => {
//   await console.log('end :', new Date())
// }



// // 开启一个 SMTP 连接池
// const smtpTransport = nodemailer.createTransport({
//   host: "smtp.sina.com", // 主机
//   secureConnection: true, // 使用 SSL
//   port: 465, // SMTP 端口
//   auth: {
//     user: "icegogh@sina.com", // 账号
//     pass: "d0f2fbf3085f2cd2" // 密码
//   }
// });

// // 设置邮件内容
// const mailOptions = {
//   from: "icegogh <icegogh@sina.com>", // 发件地址
//   to: "4535292@qq.com, im@tiankele.cn", // 收件列表
//   subject: 'nodemaile送', // 标题
//   html: '<h2>nodemailer基本使用:</h2><h3>',
//   attachments:[
//     {
//       filename : '凯迪拉克.jpg',
//       path: './img.07.27.jpg'
//     }
//   ]
// }

// // 发送邮件
// smtpTransport.sendMail(mailOptions, function(error, response) {
//   if (error) {
//     console.log('err:', err);
//   } else {
//     console.log('success!! \n',JSON.stringify(response));
//   }
//   smtpTransport.close(); // 如果没用，关闭连接池
// });
