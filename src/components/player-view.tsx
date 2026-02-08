import { useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { AlertCircle } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface PlayerViewProps {
  videoId: string;
  onReady?: YouTubeProps["onReady"];
}

export function PlayerView({ videoId, onReady }: PlayerViewProps) {
  const [error, setError] = useState<string | null>(null);

  const onError: YouTubeProps["onError"] = (event) => {
    // Error codes: https://developers.google.com/youtube/iframe_api_reference#onError
    // 2 – The request contains an invalid parameter value.
    // 5 – The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.
    // 100 – The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.
    // 101 – The owner of the requested video does not allow it to be played in embedded players.
    // 150 – This error is the same as 101. It's just a 101 error in disguise!
    const errorCode = event.data;
    let message = "An error occurred while trying to play the video.";
    
    if (errorCode === 100) {
      message = "Video not found. It may have been deleted or set to private.";
    } else if (errorCode === 101 || errorCode === 150) {
      message = "Playback on other websites has been disabled by the video owner.";
    } else if (errorCode === 2) {
      message = "Invalid video ID.";
    }
    
    setError(message);
  };

  if (error) {
    return (
      <AspectRatio ratio={16 / 9} className="bg-muted rounded-xl flex items-center justify-center p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Playback Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </AspectRatio>
    );
  }

  return (
    <AspectRatio ratio={16 / 9} className="bg-black rounded-xl overflow-hidden shadow-lg group">
      <YouTube
        videoId={videoId}
        className="absolute inset-0 h-full w-full"
        iframeClassName="h-full w-full border-0"
        opts={{
          height: "100%",
          width: "100%",
          playerVars: {
            autoplay: 1,
            modestbranding: 1,
            rel: 0,
          },
        }}
        onReady={onReady}
        onError={onError}
      />
    </AspectRatio>
  );
}
