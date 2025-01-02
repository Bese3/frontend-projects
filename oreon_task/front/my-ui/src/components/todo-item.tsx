import { Trash2, Check } from 'lucide-react'
import { useMutation } from '@apollo/client'
import { UPDATE_TODO, DELETE_TODO, GET_TODOS } from '../graphql/operations'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

interface TodoItemProps {
  id: string
  title: string
  completed: boolean
}

export function TodoItem({ id, title, completed }: TodoItemProps) {
  const [updateTodo] = useMutation(UPDATE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  })

  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  })

  const handleToggle = async () => {
    await updateTodo({
      variables: {
        id,
        completed: !completed,
      },
    })
  }

  const handleDelete = async () => {
    await deleteTodo({
      variables: {
        id,
      },
    })
  }

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-card">
      <div className="flex items-center gap-3">
        <Checkbox
          checked={completed}
          onCheckedChange={handleToggle}
          aria-label="Toggle todo"
        />
        <span className={completed ? 'line-through text-muted-foreground' : ''}>
          {title}
        </span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        className="text-destructive"
      >
        <Trash2 className="h-4 w-4" />
        <span className="sr-only">Delete todo</span>
      </Button>
    </div>
  )
}

