import { useState } from "react";
import { Check, Hash, Plus, Settings2 } from "lucide-react";
import { useVideo } from "@/context/video-context";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface TagManagerProps {
  videoId: string;
}

export function TagManager({ videoId }: TagManagerProps) {
  const { videos, tags, addTag, updateVideo } = useVideo();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const video = videos.find((v) => v.id === videoId);

  if (!video) return null;

  const toggleTag = (tagId: string) => {
    const currentTags = new Set(video.tags);
    if (currentTags.has(tagId)) {
      currentTags.delete(tagId);
    } else {
      currentTags.add(tagId);
    }
    updateVideo(videoId, { tags: Array.from(currentTags) });
  };

  const createTag = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    
    const newTag = addTag(trimmed);
    if (newTag) {
      toggleTag(newTag.id);
      setInputValue("");
    }
  };

  const selectedCount = video.tags.length;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <Settings2 className="mr-2 h-4 w-4" />
          Manage Tags
          {selectedCount > 0 && (
            <>
              <span className="mx-2 h-4 w-[1px] bg-primary/20" />
              <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                {selectedCount}
              </Badge>
              <span className="hidden lg:inline text-xs text-muted-foreground">
                {selectedCount} selected
              </span>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[200px]" align="start">
        <Command>
          <CommandInput 
            placeholder="Search tags..." 
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList>
            <CommandEmpty className="p-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start text-xs h-8"
                onClick={createTag}
              >
                <Plus className="mr-2 h-3 w-3" />
                Create "{inputValue}"
              </Button>
            </CommandEmpty>
            <CommandGroup heading="Tags">
              {tags.map((tag) => {
                const isSelected = video.tags.includes(tag.id);
                return (
                  <CommandItem
                    key={tag.id}
                    value={tag.name}
                    onSelect={() => toggleTag(tag.id)}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check className={cn("h-4 w-4")} />
                    </div>
                    <span>{tag.name}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {tags.length > 0 && <CommandSeparator />}
            <CommandGroup>
               {inputValue.trim() !== "" && !tags.some(t => t.name.toLowerCase() === inputValue.trim().toLowerCase()) && (
                  <CommandItem onSelect={createTag}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create "{inputValue}"
                  </CommandItem>
               )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
