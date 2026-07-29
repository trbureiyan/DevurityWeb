export default function Loading() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section Skeleton */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden border-b border-zinc-900">
        <div className="absolute inset-0 bg-zinc-900/20 animate-pulse" />
        <div className="container relative z-10 mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-8 flex flex-col items-center">
            {/* Badge skeleton */}
            <div className="h-8 w-40 bg-zinc-800/50 rounded-full animate-pulse mb-4" />
            
            {/* Title skeleton */}
            <div className="h-20 w-3/4 bg-zinc-800/50 rounded-lg animate-pulse" />
            
            {/* Subtitle skeleton */}
            <div className="space-y-4 w-full flex flex-col items-center">
              <div className="h-6 w-48 bg-zinc-800/50 rounded animate-pulse" />
              <div className="h-6 w-48 bg-zinc-800/50 rounded animate-pulse" />
              <div className="h-6 w-48 bg-zinc-800/50 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section Skeleton */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          {/* Title */}
          <div className="text-center mb-16 flex flex-col items-center">
            <div className="h-16 w-96 bg-zinc-800/50 rounded-lg animate-pulse mb-6" />
            <div className="h-2 w-32 bg-zinc-800/50 rounded animate-pulse" />
          </div>

          {/* Sliders Navigation Skeleton */}
          <div className="flex justify-center mb-16">
            <div className="flex gap-4 w-full max-w-4xl">
              {[1, 2, 3, 4].map((i) => (
                <div key={`nav-${i}`} className="flex-1 flex flex-col items-center gap-3">
                  <div className="h-5 w-32 bg-zinc-800/50 rounded animate-pulse" />
                  <div className="h-1.5 w-full bg-zinc-800/50 rounded-full animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Cards Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl overflow-hidden animate-pulse"
              >
                {/* Avatar area */}
                <div className="aspect-square bg-zinc-800/50 w-full" />
                
                {/* Content area */}
                <div className="p-6 space-y-4">
                  {/* Name and Tagline */}
                  <div className="space-y-2">
                    <div className="h-6 w-3/4 bg-zinc-800/50 rounded" />
                    <div className="h-4 w-1/2 bg-zinc-800/30 rounded" />
                  </div>
                  
                  {/* Bio */}
                  <div className="space-y-2 pt-2">
                    <div className="h-3 w-full bg-zinc-800/30 rounded" />
                    <div className="h-3 w-full bg-zinc-800/30 rounded" />
                    <div className="h-3 w-2/3 bg-zinc-800/30 rounded" />
                  </div>

                  {/* Social links */}
                  <div className="flex gap-3 pt-4 border-t border-zinc-800/50">
                    <div className="h-10 w-10 bg-zinc-800/50 rounded-full" />
                    <div className="h-10 w-10 bg-zinc-800/50 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
