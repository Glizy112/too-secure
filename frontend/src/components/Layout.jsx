import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#0d0f14]">
 
      {/* Subtle grid background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(56, 189, 248, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
 
      {/* Ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-200 h-75 rounded-full bg-sky-500/5 blur-[140px] pointer-events-none z-0" />
 
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <Navbar />
        {children}
      </div>
 
      {/* Bottom badge */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-20">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/4 border border-white/6 text-white/25 text-xs whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Secure connection established
        </div>
      </div>
 
    </div>
  );
}