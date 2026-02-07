import { createContext, useContext, ReactNode } from "react";
import { Video, Tag, Note } from "@/types";
import { useLocalStorage } from "@/hooks/use-local-storage";

interface VideoContextType {
  videos: Video[];
  tags: Tag[];
  addVideo: (video: Omit<Video, "id" | "createdAt" | "updatedAt" | "notes">) => void;
  updateVideo: (id: string, video: Partial<Video>) => void;
  deleteVideo: (id: string) => void;
  addTag: (name: string) => void;
  deleteTag: (id: string) => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export function VideoProvider({ children }: { children: ReactNode }) {
  const [videos, setVideos] = useLocalStorage<Video[]>("videos", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("tags", []);

  const addVideo = (videoData: Omit<Video, "id" | "createdAt" | "updatedAt" | "notes">) => {
    const newVideo: Video = {
      ...videoData,
      id: crypto.randomUUID(),
      notes: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setVideos((prev) => [...prev, newVideo]);
  };

  const updateVideo = (id: string, videoData: Partial<Video>) => {
    setVideos((prev) =>
      prev.map((v) =>
        v.id === id ? { ...v, ...videoData, updatedAt: Date.now() } : v
      )
    );
  };

  const deleteVideo = (id: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
  };

  const addTag = (name: string) => {
    setTags((prev) => {
      // Prevent duplicate tag names
      if (prev.some((t) => t.name.toLowerCase() === name.toLowerCase())) {
        return prev;
      }
      return [...prev, { id: crypto.randomUUID(), name }];
    });
  };

  const deleteTag = (id: string) => {
    setTags((prev) => prev.filter((t) => t.id !== id));
    // Remove the deleted tag from all videos that have it
    setVideos((prev) =>
      prev.map((v) => ({
        ...v,
        tags: v.tags.filter((tId) => tId !== id),
      }))
    );
  };

  return (
    <VideoContext.Provider
      value={{
        videos,
        tags,
        addVideo,
        updateVideo,
        deleteVideo,
        addTag,
        deleteTag,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
}

export function useVideo() {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error("useVideo must be used within a VideoProvider");
  }
  return context;
}