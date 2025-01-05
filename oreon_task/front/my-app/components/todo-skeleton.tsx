import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function TodoSkeleton() {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-4 w-4 rounded bg-muted animate-pulse" />
            <div className="space-y-2">
              <div className="h-5 w-48 bg-muted rounded animate-pulse" />
              <div className="h-4 w-32 bg-muted rounded animate-pulse" />
            </div>
          </div>
          <div className="h-8 w-8 rounded bg-muted animate-pulse" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-4 w-full bg-muted rounded animate-pulse" />
      </CardContent>
    </Card>
  )
}

