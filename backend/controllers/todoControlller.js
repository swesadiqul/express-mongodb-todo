const asyncHandler = require('express-async-handler')
const Todo = require('../models/todoModel')
const User = require('../models/userModel')

// @desc  Get all todo
// @route GET /api/todos
// @access Private
const getTodos = asyncHandler (async (req, res) => {
    const todos = await Todo.find({user: req.user.id});
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
        completed: req.body.completed,
        user: req.user.id
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
    const user = await User.findById(req.user.id);

    // Check for user
    if (!user) {
        res.status(404)
        throw new Error('User not found');
    }

    // Make sure the logged in user matches the todo user
    if (todo.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized');
    }
    const todo = await Todo.findByIdAndUpdate(id, req.body, {new: true})
    res.status(200).json(todo);
})

// @desc  delete todo
// @route GET /api/todos/:id
// @access Private
const deleteTodo = asyncHandler (async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    if (!todo){
        res.status(404)
        throw new Error('Todo not found');
    }

    const user = await User.findById(req.user.id);
    // Check for user
    if (!user) {
        res.status(404)
        throw new Error('User not found');
    }

    // Make sure the logged in user matches the todo user
    if (todo.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized');
    }

    await todo.deleteOne()

    res.status(200).json({id: req.params.id});
})


module.exports = {
    getTodos,
    addTodo,
    getTodo,
    updateTodo,
    deleteTodo
}