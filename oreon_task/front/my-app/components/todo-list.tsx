"use client"

import { useState } from "react"
import { useQuery, useMutation } from "@apollo/client"
import { Loader2 } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { TodoCard } from "./todo-card"
import { TodoSkeleton } from "./todo-skeleton"
import {
  GET_TODOS,
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
} from "@/graphql/operations"
import type {
  TodosData,
  AddTodoData,
  AddTodoVars,
  UpdateTodoData,
  UpdateTodoVars,
  DeleteTodoData,
  DeleteTodoVars,
  CreateTodoInput,
} from "@/types/todo"
import { v4 as uuid } from 'uuid'; 

export function TodoList() {
  const [newTodo, setNewTodo] = useState<CreateTodoInput>({
    id: uuid(),
    taskName: "",
    taskSchedule: "",
    taskDescription: "",
    isDone: false,
  })
  
  const { data, loading, error } = useQuery<TodosData>(GET_TODOS)
  
  const [addTodo, { loading: addLoading }] = useMutation<AddTodoData, AddTodoVars>(
    ADD_TODO,
    {
      update(cache, { data: addData }) {
        if (!addData) return
        const { todos } = cache.readQuery({ query: GET_TODOS }) as TodosData
        cache.writeQuery({
          query: GET_TODOS,
          data: { todos: [...todos, addData.createTodo] },
        })
      },
    }
  )
  
  const [updateTodo] = useMutation<UpdateTodoData, UpdateTodoVars>(UPDATE_TODO)
  
  const [deleteTodo] = useMutation<DeleteTodoData, DeleteTodoVars>(DELETE_TODO, {
    update(cache, { data: deleteData }) {
      if (!deleteData) return
      const { todos } = cache.readQuery({ query: GET_TODOS }) as TodosData
      cache.writeQuery({
        query: GET_TODOS,
        data: {
          todos: todos.filter((todo) => todo.id !== deleteData.removeTodo.id),
        },
      })
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTodo.taskName.trim() || addLoading) return
    
    try {
      await addTodo({
        variables: {
          createTodoInput: newTodo
        },
        optimisticResponse: {
          createTodo: {
            id: `temp-${Date.now()}`,
            ...newTodo,
            __typename: "Todo",
          },
        },
      })
      setNewTodo({
        taskName: "",
        taskSchedule: "",
        taskDescription: "",
        isDone: false,
      })
    } catch (error) {
      console.error("Error adding todo:", error)
    }
  }

  const handleToggle = async (id: string, isDone: boolean) => {
    try {
      await updateTodo({
        variables: {
          updateTodoInput: {
            id,
            isDone,
          }
        },
        optimisticResponse: {
          updateTodo: {
            id,
            isDone,
            __typename: "Todo",
          },
        },
      })
    } catch (error) {
      console.error("Error updating todo:", error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo({
        variables: { id },
        optimisticResponse: {
          removeTodo: {
            id,
            __typename: "Todo",
          },
        },
      })
    } catch (error) {
      console.error("Error deleting todo:", error)
    }
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Error loading todos: {error.message}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="space-y-2">
          <Label htmlFor="taskName">Task Name</Label>
          <Input
            id="taskName"
            value={newTodo.taskName}
            onChange={(e) => setNewTodo(prev => ({ ...prev, taskName: e.target.value }))}
            placeholder="Enter task name..."
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="taskSchedule">Schedule</Label>
          <Input
            id="taskSchedule"
            value={newTodo.taskSchedule}
            onChange={(e) => setNewTodo(prev => ({ ...prev, taskSchedule: e.target.value }))}
            placeholder="Enter schedule (e.g., 'Tomorrow at 2PM')..."
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="taskDescription">Description</Label>
          <Textarea
            id="taskDescription"
            value={newTodo.taskDescription}
            onChange={(e) => setNewTodo(prev => ({ ...prev, taskDescription: e.target.value }))}
            placeholder="Enter task description..."
            className="resize-none"
          />
        </div>

        <Button 
          type="submit" 
          className="w-full"
          disabled={!newTodo.taskName.trim() || addLoading}
        >
          {addLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding...
            </>
          ) : (
            "Add Todo"
          )}
        </Button>
      </form>

      <div className="space-y-4">
        {loading ? (
          Array.from({ length: 1 }).map((_, i) => <TodoSkeleton key={i} />)
        ) : data?.todos.length === 0 ? (
          <p className="text-center text-muted-foreground">No todos yet. Add one above!</p>
        ) : (
          data?.todos.map((todo) => (
            <TodoCard
              key={todo.id}
              {...todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  )
}

