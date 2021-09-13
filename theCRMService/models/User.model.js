const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
  mail: {
    type: String,
    required: true,
    validate: {
      validator: function (email) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
      },
      message: 'Please, enter a valid email'
    }
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    minLegth: 1,
    maxLength: 50,
    required: true,
    set: value => value.charAt(0).toUpperCase() + value.substring(1)
  },
  lastName: {
    type: String,
    minLegth: 1,
    maxLength: 50,
    set: value => value.charAt(0).toUpperCase() + value.substring(1)
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
},
  { timestamps: true }
)


const User = mongoose.model('User', userSchema);

module.exports = User;
