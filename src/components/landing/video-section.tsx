const videos = [
  "/videos/video1.mov",
  "/videos/video2.mov",
  "/videos/video3.mp4",
];

export function VideoSection() {
  return (
    <section className="py-14 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-widest text-neutral-400 mb-6 sm:mb-8 text-center">
          İçeriklerimizden
        </p>
        <div className="grid grid-cols-3 gap-3 sm:gap-5">
          {videos.map((src, i) => (
            <div key={i} className="relative overflow-hidden rounded-3xl shadow-md">
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
