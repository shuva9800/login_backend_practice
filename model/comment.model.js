const mongoose = require('mongoose');

const commentModel = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    comment:{
        type: 'string',
    }
},
{
    timestamps:true,
})

module.exports =mongoose.model('Comment', commentModel)