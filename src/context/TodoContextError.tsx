import React, { createContext, useState } from 'react'
import { nanoid } from 'nanoid'
import { useLocalStorage } from 'usehooks-ts'

interface TodoContextProps {
  todos: Todo[]
  addTodo: (text: string) => void
}
export interface Todo {
  id: string
  text: string
  status: 'undone' | 'completed'
}
export const TodoContext = createContext<TodoContextProps | undefined>(
  undefined,
)

export const TodoProvider = (props: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([])

  // ::: ADD NEW TODO :::
  const addTodo = (text: string) => {
    //setTodos([...todos, text])
    const newTodo: Todo = {
      id: nanoid(),
      text,
      status: 'undone',
    }
    setTodos([...todos, newTodo])
  }

  // const value: TodoContextProps = {
  //   todos,
  //   addTodo,
  // }

  // DELETE A TODO
  // const deleteTodo = (id: string) => {
  //   setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
  // }
  const deleteTodo = (id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
  }

  // EDIT A TODO

  const editTodo = (id: string, text: string) => {
    setTodos(prevTodos => {
      return prevTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, text }
        }
        return todo
      })
    })
  }

  // ::: UPDATE TODO STATUS :::
  const updateTodoStatus = (id: string) => {
    setTodos(prevTodos => {
      return prevTodos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            status: todo.status === 'undone' ? 'completed' : 'undone',
          }
        }
        return todo
      })
    })
  }

  const value: TodoContextProps = {
    todos,
    addTodo,
    deleteTodo,
    editTodo,
    updateTodoStatus,
  }

  return (
    <TodoContext.Provider value={value}>{props.children}</TodoContext.Provider>
  )
}
