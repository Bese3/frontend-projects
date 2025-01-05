import { gql } from "@apollo/client"

export const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      taskName
      taskSchedule
      taskDescription
      isDone
    }
  }
`

export const GET_TODO = gql`
  query GetTodo($id: String!) {
    todo(id: $id) {
      id
      taskName
      taskSchedule
      taskDescription
      isDone
    }
  }
`

export const ADD_TODO = gql`
  mutation CreateTodo($createTodoInput: CreateTodoInput!) {
    createTodo(createTodoInput: $createTodoInput) {
      id
      taskName
      taskSchedule
      taskDescription
      isDone
    }
  }
`

export const UPDATE_TODO = gql`
  mutation UpdateTodo($updateTodoInput: UpdateTodoInput!) {
    updateTodo(updateTodoInput: $updateTodoInput) {
      id
      taskName
      taskSchedule
      taskDescription
      isDone
    }
  }
`

export const DELETE_TODO = gql`
  mutation RemoveTodo($id: String!) {
    removeTodo(id: $id) {
      id
    }
  }
`

