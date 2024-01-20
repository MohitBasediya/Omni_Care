import nodemailer from 'nodemailer';
export const mailer=function(email,message,callback){
        const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "dabidipesh7898@gmail.com",
            pass: "dhck hnag hpvu jpzc"
        },
        secure: true,
    });
    var mailOption = {
        from: "dabidipesh7898@gmail.com",
        to:email,
        subject:"Omnicare",
        html:message,
    };
    transporter.sendMail(mailOption,(error,info)=>{
        if(error){
            console.log('error while ');
        }
        else{
            console.log('email sent');
            callback(info);
        }
    });
}

