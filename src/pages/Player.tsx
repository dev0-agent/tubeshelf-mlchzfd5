import { useSearchParams, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useVideo } from "@/context/video-context";
import { PlayerView } from "@/components/player-view";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { extractYouTubeId } from "@/lib/utils";

export default function Player() {
  const [searchParams] = useSearchParams();
  const uuid = searchParams.get("v");
  const { videos, tags: allTags } = useVideo();

  const video = videos.find((v) => v.id === uuid);
  const youtubeId = video ? extractYouTubeId(video.url) : null;

  if (!uuid) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <p className="text-muted-foreground text-lg">No video selected</p>
        <Button asChild variant="outline">
          <Link to="/">Go back to Library</Link>
        </Button>
      </div>
    );
  }

  if (!video || !youtubeId) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <p className="text-muted-foreground text-lg">Video not found in your library</p>
        <Button asChild variant="outline">
          <Link to="/">Go back to Library</Link>
        </Button>
      </div>
    );
  }

  const videoTags = allTags.filter((tag) => video.tags.includes(tag.id));

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="flex items-center">
        <Button asChild variant="ghost" size="sm" className="-ml-2 h-8 gap-1 text-muted-foreground hover:text-foreground">
          <Link to="/">
            <ChevronLeft className="h-4 w-4" />
            Back to Library
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <PlayerView videoId={youtubeId} />
          
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl font-bold tracking-tight leading-tight">
                {video.title}
              </h1>
              <div className="flex flex-wrap gap-2">
                {videoTags.length > 0 ? (
                  videoTags.map((tag) => (
                    <Badge key={tag.id} variant="secondary" className="px-2 py-0.5">
                      {tag.name}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground italic">No tags</span>
                )}
              </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold">Description</h2>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                  {video.description || "No description provided."}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 p-5 rounded-xl border bg-card shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Notes & Comments</h2>
              <Badge variant="outline" className="font-normal">
                {video.notes.length}
              </Badge>
            </div>
            
            <ScrollArea className="h-[400px] lg:h-[500px] pr-4 -mr-4">
              {video.notes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-2">
                  <p className="text-sm text-muted-foreground font-medium italic">No notes added yet</p>
                  <p className="text-xs text-muted-foreground/70 px-4">
                    Add tags and notes to help you remember key parts of this video.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {video.notes.map((note) => (
                    <div key={note.id} className="group relative flex flex-col gap-2 p-4 rounded-lg bg-muted/40 border border-transparent hover:border-border transition-colors">
                      <p className="text-sm leading-relaxed">
                        {note.content}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                          {new Date(note.createdAt).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}