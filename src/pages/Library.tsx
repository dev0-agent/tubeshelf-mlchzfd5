import { useVideo } from "@/context/video-context"
import { VideoCard } from "@/components/video-card"

export default function Library() {
  const { videos } = useVideo()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">My Library</h1>
        <p className="text-muted-foreground text-sm">
          Your collection of YouTube videos and notes.
        </p>
      </div>

      {videos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-xl bg-muted/30">
          <p className="text-muted-foreground font-medium">Your library is empty</p>
          <p className="text-muted-foreground text-sm">Add a video to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  )
}
