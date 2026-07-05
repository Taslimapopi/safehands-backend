import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required : [true, 'name is required'],
        trim: true
    },
    email:{
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: [true, 'email is required']
    },
    password : {
        type: String,
        minlength: [6, 'password at least 6 characters'],
        required : [true, 'password is required'],
        select : false
    },
    role: {
        type : String,
        enum : ['user', 'client','provider','admin'],
        default: 'user'
    },
    phone: {
        type: String,
        required: [true, 'phone number is required'],
        trim: true
    },
    location : {
        type: String,
        trim: true
    }

},
{timestamps: true}
)

userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        return next()
    }

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

const User = mongoose.models.User || mongoose.model('User',userSchema)

export default User;