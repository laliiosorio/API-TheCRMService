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
    name: {
        type: String,
        minLegth: 1,
        maxLength: 50,
        required: true,
        set: value => value.charAt(0).toUpperCase() + value.substring(1)
    },
    surname: {
        type: String,
        minLegth: 1,
        maxLength: 50,
        required: true,
        set: value => value.charAt(0).toUpperCase() + value.substring(1)
    },
    image: {
        type: String,
        required: true,
        default: 'https://image.flaticon.com/icons/png/512/1200/1200919.png'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    { timestamps: true }
)


const User = mongoose.model('User', userSchema);

module.exports = User;
