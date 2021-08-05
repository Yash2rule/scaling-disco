const express = require('express');
const router = express.Router();
const {getAllTodos,addTodo,deleteTodo,getTodo} = require('./todoController');

router.route('/').get(getAllTodos).post(addTodo);
router.route('/:id').get(getTodo).delete(deleteTodo);

module.exports = router;