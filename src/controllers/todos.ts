import { RequestHandler } from 'express'

import { Todo } from '../models/todo'

const TODOS: Todo[] = []

export const createTodo: RequestHandler<
  {},
  { message: string; createdTodo: Todo },
  { text: string }
> = (req, res, next) => {
  const text = req.body.text

  const newTodo = new Todo(Math.random().toString(), text)

  TODOS.push(newTodo)

  res.status(201).json({ message: 'Created the todo.', createdTodo: newTodo })
}

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ todos: TODOS })
}

export const editTodo: RequestHandler<
  { id: string },
  { message: string; updatedTodo: Todo },
  { text: string }
> = (req, res, next) => {
  const todoId = req.params.id

  const newText = req.body.text

  const foundIndex = TODOS.findIndex(todo => todo.id === todoId)

  if (foundIndex < 0) {
    throw new Error('Could not found a todo with this ID')
  }

  TODOS[foundIndex] = new Todo(TODOS[foundIndex].id, newText)

  res.json({ message: 'Updated todo', updatedTodo: TODOS[foundIndex] })
}

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const id = req.params.id

  const foundIndex = TODOS.findIndex(todo => todo.id === id)

  if (foundIndex < 0) {
    throw new Error('Could not found a todo with this ID')
  }

  TODOS.splice(foundIndex, 1)

  res.json({ message: 'Todo deleted' })
}
