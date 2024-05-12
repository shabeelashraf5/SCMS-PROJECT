const nodemailer = require('nodemailer');


const sentMail = async function (fname,email,token ) {


    try {

    const transporter = nodemailer.createTransport({
            
        host: process.env.SMTP_HOST ,
        port: process.env.SMTP_PORT ,
        secure: true,
        auth:{
            user: process.env.SMTP_USER ,
            pass: process.env.SMTP_PASSWORD
        }
    })



    const mailOption = {
        
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Welcome to the Platform ! Reset your Password',
        html: `<h2> Hello ${fname}, Welcome to our Team. Please click to <a href="${process.env.URLs}/reset-password/?token=${token}">Reset</a> your password<h2>`
        //html: `<h2> Hello ${fname}, Welcome to our Team. Please click to <a href="http://localhost:4200/reset-password/?token=${token}">Reset</a> your password<h2>`
    };

   
       

        transporter.sendMail(mailOption, function(error,info){

            if(error){
                console.log(error)
            }else{
                console.log("Email has been sent", info.response)
            }
        })


    }catch{

        console.log('Error Occured')
    }



    }


module.exports = {

        sentMail
    
    }





