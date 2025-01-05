export interface Todo {
  id: string
  taskName: string
  taskSchedule: string
  taskDescription: string
  isDone: boolean
}

export interface TodosData {
  todos: Todo[]
}

export interface TodoData {
  todo: Todo
}

export interface CreateTodoInput {
  id: string
  taskName: string
  taskSchedule: string
  taskDescription: string
  isDone?: boolean
}

export interface UpdateTodoInput {
  id: string
  taskName?: string
  taskSchedule?: string
  taskDescription?: string
  isDone?: boolean
}

export interface AddTodoData {
  createTodo: Todo
}

export interface UpdateTodoData {
  updateTodo: Todo
}

export interface DeleteTodoData {
  removeTodo: {
    id: string
  }
}

export interface AddTodoVars {
  createTodoInput: CreateTodoInput
}

export interface UpdateTodoVars {
  updateTodoInput: UpdateTodoInput
}

export interface DeleteTodoVars {
  id: string
}

export interface GetTodoVars {
  id: string
}

