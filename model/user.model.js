const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    name:{
        type: 'string',
        required: true
    },
    email:{
        type: 'string',
        required: true
    },
    password:{
        type: 'string',
        required: true
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment",
    }]
},
{timestamps: true}
)

module.exports = mongoose.model('User', userModel)