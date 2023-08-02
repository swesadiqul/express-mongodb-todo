const errorHandler = require('express-async-handler')


// @desc  get all todo
// @route GET /api/todos
// @access private
const getTodos = errorHandler(async (req, res) => {
    res.status(200).json({"message": "Get all Todo"});
})

// @desc  add todo
// @route POST /api/todos
// @access private
const addTodo = errorHandler(async (req, res) => {
    if (!req.body.title){
        res.status(400)
        throw new Error('Please provide a title field.')
    }
    res.status(200).json({"message": "Set Todo"});
})

// @desc  get todo
// @route GET /api/todos/:id
// @access private
const getTodo = errorHandler(async (req, res) => {
    res.status(200).json({"message": "Get single Todo"});
})

// @desc update todo
// @route GET /api/todos/:id
// @access private
const updateTodo = errorHandler(async (req, res) => {
    res.status(200).json({"message": "Update Todo"});
})

// @desc  delete todo
// @route GET /api/todos/:id
// @access private
const deleteTodo = errorHandler(async (req, res) => {
    res.status(200).json({"message": "Delete Todo"});
})



module.exports = {
    getTodos,
    addTodo,
    getTodo,
    updateTodo,
    deleteTodo
}