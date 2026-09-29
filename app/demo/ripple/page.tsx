import RippleDistortion from "@/components/effects/RippleDistortion";

export default function RippleDemoPage() {
  return (
    <main className="relative">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0">
          <RippleDistortion
            src="/images/accent-2.webp"
            grayscale
            tint="#FAF8F5"
            tintAmount={0.5}
            highlightColor="#FAF8F5"
            glint={0.15}
            brushSize={110}
            spacing={30}
            rings={2}
            fade={2}
            quality="medium"
          />
        </div>
        <div className="pointer-events-none relative z-0 text-center">
          <p className="text-xs uppercase tracking-[0.16em] text-white/60">
            react-bits RippleDistortion — WebGL via ogl
          </p>
          <h1 className="mt-4 font-display text-6xl font-light text-white">
            Move your mouse around
          </h1>
          <p className="mt-4 text-white/70">
            Property render, milky-white tint, medium quality for performance.
          </p>
        </div>
      </section>
    </main>
  );
}
