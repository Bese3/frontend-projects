import { Trash2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import type { Todo } from "@/types/todo"

interface TodoCardProps extends Todo {
  onToggle: (id: string, isDone: boolean) => void
  onDelete: (id: string) => void
}

export function TodoCard({ 
  id, 
  taskName, 
  taskSchedule, 
  taskDescription, 
  isDone, 
  onToggle, 
  onDelete 
}: TodoCardProps) {
  return (
    <Card className="mb-4 transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Checkbox
              id={`todo-${id}`}
              checked={isDone}
              onCheckedChange={(checked) => onToggle(id, checked as boolean)}
            />
            <div className="space-y-1">
              <CardTitle
                className={`text-lg ${
                  isDone ? "line-through text-muted-foreground" : ""
                }`}
              >
                {taskName}
              </CardTitle>
              <CardDescription>
                Schedule: {taskSchedule}
              </CardDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(id)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete todo</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className={`text-sm ${isDone ? "line-through text-muted-foreground" : ""}`}>
          {taskDescription}
        </p>
      </CardContent>
    </Card>
  )
}

