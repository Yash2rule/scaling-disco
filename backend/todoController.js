const asyncHandler = require('express-async-handler');
const Todo = require('./todoModel');

//@desc           Get all todos
//@route          GET /api/todo
//access          Public
const getAllTodos = asyncHandler(async (req, res) => {
    const todos = await Todo.find({})
    if(todos){
        res.json(todos)
    }else{
        res.status(401);
        throw new Error('Todos not found')
    }
})


//@desc           Create new Todo
//@route          POST /api/todo
//access          Public
const addTodo = asyncHandler(async (req, res) => {
    const {todoId,title, description,isPinned} = req.body
    const todo = new Todo({
        todoId,
        title,
        description,
        isPinned
    })
    const createdTodo = await todo.save();
    res.status(201).json(createdTodo)
})

//@desc           Delete a Todo
//@route          DELETE /api/todo/:id
//access          Public
const deleteTodo = asyncHandler(async (req, res) => {
    const id = req.params.id
    const todo = await Todo.findOne({todoId: id})
    if(todo){
        await Todo.findOneAndDelete({todoId:id})
        res.json('Todo Deleted')
    }else{
        res.status(404);
        throw new Error('Todo not found');
    }
})

//@desc           Get a single Todo
//@route          GET /api/todo/:id
//access          Public
const getTodo = asyncHandler(async (req, res) => {
    const id = req.params.id
    const todo = await Todo.findOne({todoId:id})
    if(todo){
        res.json(todo)
    }else{
        res.status(404);
        throw new Error('Todo not found')
    }
})

module.exports = {getAllTodos,addTodo,deleteTodo,getTodo}