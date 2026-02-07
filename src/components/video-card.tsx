import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Check, X } from "lucide-react";
import { Video } from "@/types";
import { useVideo } from "@/context/video-context";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  const navigate = useNavigate();
  const { tags: allTags, updateVideo } = useVideo();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(video.title);

  const videoTags = allTags.filter((tag) => video.tags.includes(tag.id));

  const handleCardClick = () => {
    if (!isEditing) {
      navigate(`/player?v=${video.id}`);
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent | React.MouseEvent) => {
    e.stopPropagation();
    updateVideo(video.id, { title });
    setIsEditing(false);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTitle(video.title);
    setIsEditing(false);
  };

  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all group"
      onClick={handleCardClick}
    >
      <CardHeader className="p-0">
        <AspectRatio ratio={16 / 9}>
          {video.thumbnail ? (
            <img
              src={video.thumbnail}
              alt={video.title}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground text-sm">No Thumbnail</span>
            </div>
          )}
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-4 flex flex-col gap-2">
        {isEditing ? (
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-8 text-sm"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave(e);
                if (e.key === "Escape") handleCancel(e as any);
              }}
            />
            <Button size="icon" variant="ghost" className="h-8 w-8 shrink-0" onClick={handleSave}>
              <Check className="h-4 w-4 text-green-600" />
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8 shrink-0" onClick={handleCancel}>
              <X className="h-4 w-4 text-red-600" />
            </Button>
          </div>
        ) : (
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-sm line-clamp-2">
              {video.title || <span className="text-muted-foreground italic">Untitled Video</span>}
            </h3>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
              onClick={handleEditClick}
            >
              <Pencil className="h-3 w-3" />
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-0 flex flex-wrap gap-1">
        {videoTags.length > 0 ? (
          videoTags.map((tag) => (
            <Badge key={tag.id} variant="secondary" className="text-[10px] px-1.5 py-0">
              {tag.name}
            </Badge>
          ))
        ) : (
          <span className="text-[10px] text-muted-foreground italic">No tags</span>
        )}
      </CardFooter>
    </Card>
  );
}
