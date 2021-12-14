"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.editTodo = exports.getTodos = exports.createTodo = void 0;
const todo_1 = require("../models/todo");
const TODOS = [];
const createTodo = (req, res, next) => {
    const text = req.body.text;
    const newTodo = new todo_1.Todo(Math.random().toString(), text);
    TODOS.push(newTodo);
    res.status(201).json({ message: 'Created the todo.', createdTodo: newTodo });
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    res.json({ todos: TODOS });
};
exports.getTodos = getTodos;
const editTodo = (req, res, next) => {
    const todoId = req.params.id;
    const newText = req.body.text;
    const foundIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (foundIndex < 0) {
        throw new Error('Could not found a todo with this ID');
    }
    TODOS[foundIndex] = new todo_1.Todo(TODOS[foundIndex].id, newText);
    res.json({ message: 'Updated todo', updatedTodo: TODOS[foundIndex] });
};
exports.editTodo = editTodo;
const deleteTodo = (req, res, next) => {
    const id = req.params.id;
    const foundIndex = TODOS.findIndex(todo => todo.id === id);
    if (foundIndex < 0) {
        throw new Error('Could not found a todo with this ID');
    }
    TODOS.splice(foundIndex, 1);
    res.json({ message: 'Todo deleted' });
};
exports.deleteTodo = deleteTodo;
