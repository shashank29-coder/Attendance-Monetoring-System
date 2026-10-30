const mongoose = require('mongoose');

const dataschema = mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    group:{type:String}
})
const datamodel = mongoose.model("user",dataschema);

module.exports = datamodel;