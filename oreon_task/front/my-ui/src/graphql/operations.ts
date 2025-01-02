import { gql } from '@apollo/client'

export const GET_TODOS = gql`
  query GetTodos {
    todosCollection {
      edges {
        node {
          id
          title
          completed
        }
      }
    }
  }
`

export const ADD_TODO = gql`
  mutation AddTodo($title: String!) {
    insertIntoTodosCollection(objects: [{ title: $title, completed: false }]) {
      records {
        id
        title
        completed
      }
    }
  }
`

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $completed: Boolean!) {
    updateTodosCollection(set: { completed: $completed }, filter: { id: { eq: $id } }) {
      records {
        id
        title
        completed
      }
    }
  }
`

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteFromTodosCollection(filter: { id: { eq: $id } }) {
      records {
        id
      }
    }
  }
`

