import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AppLayout } from "@/components/layout/AppLayout"
import Library from "@/pages/Library"
import Player from "@/pages/Player"
import { VideoProvider } from "@/context/video-context"

export function App() {
  return (
    <VideoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Library />} />
            <Route path="player" element={<Player />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </VideoProvider>
  )
}

export default App;
