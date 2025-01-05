import { TodoList } from "@/components/todo-list"

export default function Home() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Todo List</h1>
      <TodoList />
    </main>
  )
}

