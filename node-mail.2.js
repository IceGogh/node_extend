const nodemailer = require("nodemailer");
// 开启一个 SMTP 连接池
const sina = {
  host: "smtp.sina.com", // 主机
  secureConnection: true, // 使用 SSL
  port: 465, // SMTP 端口
  auth: {
    user: "icegogh@sina.com", // 账号
    pass: "d0f2fbf3085f2cd2" // 密码
  }
};

const smtpTransport = nodemailer.createTransport(sina);

// 设置邮件内容
const mailOptions = {
  from: `icegogh <${sina.auth.user}>`, // 发件地址
  to: "4535292@qq.com, im@tiankele.cn", // 收件列表
  subject: "nodemaile送", // 标题
  html: "<h2>nodemailer基本使用:</h2><h3>",
  attachments: [
    {
      filename: "凯迪拉克.jpg",
      path: "./img.07.27.jpg"
    }
  ]
};

// 发送邮件
smtpTransport.sendMail(mailOptions, function(error, response) {
  if (error) {
    console.log("err:", err);
  } else {
    console.log("success!! \n", JSON.stringify(response));
  }
  smtpTransport.close(); // 如果没用，关闭连接池
});
