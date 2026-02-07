"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { useVideo } from "@/context/video-context"
import { extractYouTubeId } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AddVideoDialog() {
  const { addVideo } = useVideo()
  const [url, setUrl] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const videoId = extractYouTubeId(url)

      if (!videoId) {
        throw new Error("Invalid YouTube URL")
      }

      // Fetch metadata
      const response = await fetch(
        `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`
      )
      
      if (!response.ok) {
        throw new Error("Failed to fetch video metadata")
      }

      const data = await response.json()

      if (data.error) {
         throw new Error(data.error || "Video not found")
      }

      const title = data.title || `Video ${videoId}`
      // noembed returns author_name, we can put it in description or just use it.
      // The requirement says "description", existing Video type has description?.
      // We can put author_name in description for now if description is not available.
      const description = data.author_name ? `By ${data.author_name}` : ""
      
      // Construct thumbnail URL (maxresdefault is best quality)
      const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

      addVideo({
        title,
        url,
        thumbnail,
        description,
        tags: [],
      })

      setIsOpen(false)
      setUrl("")
    } catch (err) {
      console.error("Failed to add video", err)
      setError(err instanceof Error ? err.message : "Failed to add video")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Video
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Video</DialogTitle>
          <DialogDescription>
            Paste a YouTube URL to add it to your library.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="url">YouTube URL</Label>
            <Input
              id="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isLoading}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Video"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
