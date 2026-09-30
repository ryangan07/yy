import AnimatedContent from "@/components/effects/AnimatedContent";
import CursorGrid from "@/components/effects/CursorGrid";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

export default function ShowcaseDemoPage() {
  return (
    <main className="relative bg-white text-neutral-900">
      <div className="fixed inset-0">
        <CursorGrid
          cellSize={44}
          color="#1C1917"
          radius={180}
          falloff="smooth"
          holdTime={120}
          fadeDuration={900}
          lineWidth={1}
          maxOpacity={0.35}
          fillOpacity={0.06}
          gridOpacity={0.05}
          cellRadius={3}
        />
      </div>

      <section className="pointer-events-none flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="text-xs uppercase tracking-[0.16em] text-neutral-400">
          Demo — scroll down, and move your mouse around
        </p>
        <h1 className="mt-4 font-display text-6xl font-light">Scroll &amp; cursor showcase</h1>
        <p className="mt-4 max-w-md text-neutral-500">
          Background grid lights up where your mouse moves (an open-source component, built in
          the same spirit as the cursor-trail effect you pointed me to — not a copy of anyone&apos;s
          site code). Scroll down to see the reveal-on-scroll pieces.
        </p>
      </section>

      {[1, 2, 3, 4].map((i) => (
        <section
          key={i}
          className="pointer-events-none flex min-h-screen items-center justify-center px-6"
        >
          <AnimatedContent
            distance={80}
            direction="vertical"
            duration={0.9}
            ease="power3.out"
            initialOpacity={0}
            scale={0.96}
            threshold={0.2}
          >
            <div className="max-w-lg rounded-lg border border-neutral-200 bg-white/80 p-10 text-center shadow-sm backdrop-blur">
              <p className="text-xs uppercase tracking-[0.16em] text-neutral-400">
                Section {i}
              </p>
              <h2 className="mt-3 font-display text-4xl font-light">
                react-bits AnimatedContent
              </h2>
              <p className="mt-3 text-sm text-neutral-500">
                Slides and fades in on scroll — this is the actual react-bits component
                (@react-bits/AnimatedContent), not a re-implementation.
              </p>
            </div>
          </AnimatedContent>
        </section>
      ))}

      <section className="pointer-events-none flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center">
        <p className="text-xs uppercase tracking-[0.16em] text-neutral-400">
          WhatsApp icon check
        </p>
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg">
          <WhatsAppIcon size={30} />
        </div>
        <p className="max-w-sm text-sm text-neutral-500">
          The actual phone-in-speech-bubble mark, not a generic chat bubble icon.
        </p>
      </section>
    </main>
  );
}
