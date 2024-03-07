import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minLength: 6,
  },
  photo:{
    type: String,
  },
  name: {
    type: String,
  },
  bio: {
    type: String,
  },
  phone: {
    type: String,
  }
})

const User = mongoose.models?.User || mongoose.model('User', userSchema)

export default User;