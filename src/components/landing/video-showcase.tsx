const videos = [
  "/videos/video1.mov",
  "/videos/video2.mov",
  "/videos/video3.mp4",
];

export function VideoShowcase() {
  return (
    <section className="pb-16 sm:pb-24">
      <div className="max-w-5xl mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {videos.map((src, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl sm:rounded-3xl bg-neutral-100 shadow-sm ${
                i === 1 ? "-translate-y-4 sm:-translate-y-6" : ""
              }`}
            >
              <video
                src={src}
                autoPlay
                muted
                loop
                playsInline
                className="w-full object-cover aspect-[2/3]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
