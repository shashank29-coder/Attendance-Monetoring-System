const bcrypt = require("bcryptjs")  

async function passHash(password){

const salt = await bcrypt.genSalt(10)  //gen salt-->it defines patter aur kuch data apne end se addon karta hai take string ka length apne aap se badha ho jaye

const passwordHashed = await bcrypt.hash(password,salt) //it combine and hashed the string lenght

console.log("hashed password is:",passwordHashed)

const isMatch = await bcrypt.compare(password,passwordHashed) //it compare both password and hash password
console.log(isMatch)

}

passHash("shanu@123")