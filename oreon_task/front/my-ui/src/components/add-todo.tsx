import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Plus } from 'lucide-react'
import { ADD_TODO, GET_TODOS } from '../graphql/operations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function AddTodo() {
  const [title, setTitle] = useState('')
  const [addTodo, { loading }] = useMutation(ADD_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    await addTodo({
      variables: {
        title: title.trim(),
      },
    })
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo..."
        className="flex-1"
      />
      <Button type="submit" disabled={loading || !title.trim()}>
        <Plus className="h-4 w-4 mr-2" />
        Add Todo
      </Button>
    </form>
  )
}

