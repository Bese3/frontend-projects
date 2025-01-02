'use client'

import { useQuery } from '@apollo/client'
import { GET_TODOS } from './graphql/operations'
import { AddTodo } from './components/add-todo'
import { TodoItem } from './components/todo-item'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

export default function TodoList() {
  const { loading, error, data } = useQuery(GET_TODOS)

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px] text-destructive">
        Error loading todos. Please try again later.
      </div>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Todo List</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <AddTodo />
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <div className="space-y-2">
            {data?.todosCollection?.edges?.map(({ node }: any) => (
              <TodoItem
                key={node.id}
                id={node.id}
                title={node.title}
                completed={node.completed}
              />
            ))}
            {data?.todosCollection?.edges?.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No todos yet. Add one above!
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

