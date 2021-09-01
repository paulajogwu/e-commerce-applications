var nodemailer = require('nodemailer');


module.exports={
    mailTransporter: function(){
        nodemailer.createTransport('SMTP', {
            service: 'Gmail',
            auth: {
                user: 'Paulajogwu@gmail.com',
                pass: '09034562259',
            }
        }); 
    }

    

}