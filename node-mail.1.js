const nodemailer = require("nodemailer");
// 开启一个 SMTP 连接池
const smtpTransport = nodemailer.createTransport( {
  host: "smtp.sina.com", // 主机
  secureConnection: true, // 使用 SSL
  port: 465, // SMTP 端口
  auth: {
    user: "icegogh@sina.com", // 账号
    pass: "d0f2fbf3085f2cd2" // 密码
  }
});

// 设置邮件内容
const mailOptions = {
  from: "icegogh <icegogh@sina.com>", // 发件地址
  to: "4535292@qq.com, im@tiankele.cn", // 收件列表
  subject: "Hello world", // 标题
  html: "this message is from nodemailer" // html 内容
}

// 发送邮件
smtpTransport.sendMail(mailOptions, function (error, response) {
  if (error) {
    console.log(error);
  } else {
    // {"accepted":["4535292@qq.com","im@tiankele.cn"],"rejected":[],"envelopeTime":156,"messageTime":108,"messageSize":307,"response":"250 ok queue id 55409337358921","envelope":{"from":"icegogh@sina.com","to":["4535292@qq.com","im@tiankele.cn"]},"messageId":"<74239bfc-877f-ce2a-d99e-7db75fc880b2@sina.com>"}
    console.log(JSON.stringify(response));
  }
  smtpTransport.close(); // 如果没用，关闭连接池
});