const express = require("express");
const router = express.Router();
const {getTodos, addTodo, getTodo, updateTodo, deleteTodo} = require('../controllers/todoControlller');
const {protect} = require('../middleware/authMiddleware');



router.route("/").get(protect, getTodos).post(protect, addTodo)
router.route("/:id").get(protect, getTodo).put(protect, updateTodo).delete(protect, deleteTodo)


module.exports = router;
