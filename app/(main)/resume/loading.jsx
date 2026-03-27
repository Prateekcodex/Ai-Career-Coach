import { Loader2 } from "lucide-react"

export default function ResumeLoading() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="text-muted-foreground">Loading resume builder...</p>
      </div>
    </div>
  )
}
