export default function Library() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">My Library</h1>
      <p className="text-muted-foreground">Your collection of YouTube videos will appear here.</p>
      {/* Grid placeholder */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="aspect-video rounded-xl bg-muted/50 animate-pulse" />
        ))}
      </div>
    </div>
  )
}
