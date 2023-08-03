const asyncHandler = require('express-async-handler')
const Todo = require('../models/todoModel')

// @desc  get all todo
// @route GET /api/todos
// @access private
const getTodos = asyncHandler (async (req, res) => {
    const todos = await Todo.find()
    res.status(200).json(todos);
});

// @desc  add todo
// @route POST /api/todos
// @access private
const addTodo = asyncHandler (async (req, res) => {
    if (!req.body.title){
        res.status(400)
        throw new Error('Please provide a title field.')
    }
    if (!req.body.description){
        res.status(400)
        throw new Error('Please provide a description field.')
    }
    const todo = await Todo.create({
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed
    })
    res.status(200).json(todo);
})

// @desc  get todo
// @route GET /api/todos/:id
// @access private
const getTodo = asyncHandler (async (req, res) => {
    const id = req.params.id
    const todo = await Todo.findById(id)
    res.status(200).json(todo);
})

// @desc update todo
// @route GET /api/todos/:id
// @access private
const updateTodo = asyncHandler (async (req, res) => {
    const id = req.params.id
    if (!req.body.title){
        res.status(400)
        throw new Error('Please provide a title field.')
    }
    if (!req.body.description){
        res.status(400)
        throw new Error('Please provide a description field.')
    }
    const todo = await Todo.findByIdAndUpdate(id, req.body, {new: true})
    res.status(200).json(todo);
})

// @desc  delete todo
// @route GET /api/todos/:id
// @access private
const deleteTodo = asyncHandler (async (req, res) => {
    const id = req.params.id
    await Todo.findByIdAndDelete(id)
    res.status(200).json({'message':'Successfully deleted the item.'});
})


module.exports = {
    getTodos,
    addTodo,
    getTodo,
    updateTodo,
    deleteTodo
}