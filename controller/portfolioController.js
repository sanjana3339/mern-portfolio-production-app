const nodemailer=require('nodemailer')
const sendGridTransport=require('nodemailer-sendgrid-transport')

const transporter=nodemailer.createTransport(
    sendGridTransport({
        auth:{
            api_key:process.env.API_SENDGRID,
        },
    })
);



const sendEmailController=(req,res)=>{
    try{
        const{name,email,message}=req.body

        if (!name || !email || !message){
            return res.status(500).send({
                success:false,
                message:"Please Provide All Fields",
            })
        }

        //email matter
        transporter.sendMail({
            to:"",
            from:"",
            subject:"Regarding portfolio",
            html:`
            <h5>Details</h5>
            <ul> 
                <li><p>Name : ${name} </p></li>
                <li><p>Email : ${email} </p></li>
                <li><p>Message : ${message} </p></li>
            </ul>
            `
        })
        return res.status(200).send({
            success:true,
            message:'Your message send succesfully'
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Send Email API error',
            error
        })
    }

};

module.exports={sendEmailController};