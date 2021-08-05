const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    todoId:{
        type:'Number',
        default: Math.floor(Math.random() * 100000)
    },
    title:{
        type:String,
        trim:true,
        default:'',
        required:[true,'Todo title is required']
    },
    description:{
        type:String,
        default:''
    },
    isPinned:{
        type:Boolean,
        default:false
    },
},{
    timestamps:true
})

module.exports = mongoose.model('Todo', TodoSchema);