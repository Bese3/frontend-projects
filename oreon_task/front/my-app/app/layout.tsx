import "@/styles/globals.css"
import { Inter } from 'next/font/google'
import { ApolloWrapper } from "@/lib/apollo-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Todo App with GraphQL",
  description: "A todo application built with Next.js, Apollo Client, and GraphQL",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  )
}

