const nodemailer = require('nodemailer')
// let mailTransport = nodemailer.createTransport({
//     // 163邮箱 为smtp.163.com
//     host: 'smtp.qq.com',//这是qq邮箱
//     //端口
//     port: 465,
//     secure: true,	//安全方式发送,建议都加上
//     auth: {
//         user: '514979324@qq.com',
//         // pass: 'tnnomaruubodbgcd'
//         pass: 'igephncxowxicbee'
//     }
// })
// let options = {
//     from: '514979324',
//     to: 'gongjie0422@163.com',
//     bcc: '密送',
//     subject: 'node邮件',
//     text: 'hello nodemailer',
//     html: '<h1>hello zhy</h1>'
// };
// mailTransport.sendMail(options, function (err, msg) {
//     console.log(msg, 'msg')
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('success');
//         ctx.body = "success";
//     }
// })

let mailTransport = nodemailer.createTransport({
    service: 'qq', // 使用内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
  port: 465, // SMTP 端口
  secureConnection: true, // 使用 SSL
    auth: {
      user: '172.25.72.12',
      pass: 'tnnomaruubodbgcd'
    }
  })
  let options = {
    from: ' "zhy" <xxxx@qq.com>',
    to: '514979324@qq.com',
    bcc: '密送',
    subject: 'node邮件',
    text: 'hello nodemailer',
    html: '<h1>hello zhy</h1>'
  };
  mailTransport.sendMail(options, function (err, msg) {
    console.log(msg, 'msg')
    if (err) {
      console.log(err);
    } else {
      console.log('success');
      ctx.body = "success";
    }
  })