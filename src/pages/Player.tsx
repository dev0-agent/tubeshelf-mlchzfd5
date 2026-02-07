export default function Player() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Video Player</h1>
      <div className="aspect-video w-full max-w-4xl rounded-xl bg-muted/50 flex items-center justify-center">
        <span className="text-muted-foreground">YouTube Player Placeholder</span>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Video Title</h2>
        <p className="text-muted-foreground">Video description and notes will go here.</p>
      </div>
    </div>
  )
}
