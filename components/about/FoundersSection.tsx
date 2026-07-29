

const FOUNDERS = [
  {
    username: "trbureiyan",
    url: "https://github.com/trbureiyan",
  },
  {
    username: "Arekkazu",
    url: "https://github.com/Arekkazu",
  },
  {
    username: "JucaMora7",
    url: "https://github.com/JucaMora7",
  },
  {
    username: "Manuel-Yasno",
    url: "https://github.com/Manuel-Yasno",
  },
];

export default function FoundersSection() {
  return (
    <section className="relative bg-black py-16 border-t border-zinc-900/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center">
          {/* Subtle Title */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-[1px] bg-zinc-800"></div>
            <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-[0.2em]">
              Web Platform Founders
            </h3>
            <div className="w-8 h-[1px] bg-zinc-800"></div>
          </div>

          {/* Founders Links */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {FOUNDERS.map((founder) => (
              <a
                key={founder.username}
                href={founder.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800/50 bg-zinc-900/30 hover:bg-zinc-800 transition-colors"
              >
                <svg
                  className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium text-zinc-400 group-hover:text-white transition-colors">
                  @{founder.username}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
