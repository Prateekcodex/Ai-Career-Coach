'use client'

import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function ResumeError({ error, reset }) {
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <AlertTriangle className="h-12 w-12 text-red-500" />
        <h2 className="text-2xl font-bold text-center">Something went wrong!</h2>
        <p className="text-muted-foreground text-center max-w-md">
          There was an error loading the resume page. Please try again.
        </p>
        <div className="space-x-2">
          <Button onClick={reset}>
            Try again
          </Button>
          <Button variant="outline" onClick={() => window.location.href = "/dashboard"}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}
