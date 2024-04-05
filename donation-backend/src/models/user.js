const mongoose= require('mongoose');

const userSchema = new mongoose.schema({
    username: { type: String, required: true},
    email: {type:String, required: true}, 
    password: {type: String, required: true},
    role:{type: String, enum:['donor','beneficiary','volunteer'] ,required: true
}
});
module.export=  mongoose.model('User',userSchema)
