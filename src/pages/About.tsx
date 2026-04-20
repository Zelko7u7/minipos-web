export default function AboutMe() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-4xl rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-600 p-10">
            <div className="text-center text-white">
              <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full border-4 border-white/30 bg-white/20 text-4xl font-bold shadow-lg">
                AA
              </div>
              <h2 className="text-2xl font-bold">Andres Aguirre</h2>
              <p className="mt-2 text-sm text-white/80">Frontend Developer</p>
            </div>
          </div>

          <div className="p-8 md:p-10 text-white">
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
              About Me
            </p>

            <h1 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
              Construyendo interfaces modernas y funcionales
            </h1>

            <p className="mt-5 text-sm leading-7 text-slate-300 md:text-base">
              Soy un desarrollador frontend apasionado por crear experiencias
              visuales limpias, intuitivas y atractivas. Me gusta trabajar con
              React, TypeScript y Tailwind CSS para desarrollar aplicaciones
              rápidas, modernas y bien estructuradas.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm text-cyan-200 border border-cyan-400/20">
                React
              </span>
              <span className="rounded-full bg-blue-500/20 px-4 py-2 text-sm text-blue-200 border border-blue-400/20">
                TypeScript
              </span>
              <span className="rounded-full bg-indigo-500/20 px-4 py-2 text-sm text-indigo-200 border border-indigo-400/20">
                Tailwind CSS
              </span>
              <span className="rounded-full bg-emerald-500/20 px-4 py-2 text-sm text-emerald-200 border border-emerald-400/20">
                UI Design
              </span>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
                <p className="text-slate-400">Enfoque</p>
                <p className="mt-1 font-semibold text-white">
                  Interfaces claras
                </p>
              </div>

              <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
                <p className="text-slate-400">Stack</p>
                <p className="mt-1 font-semibold text-white">
                  React + Tailwind
                </p>
              </div>

              <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
                <p className="text-slate-400">Meta</p>
                <p className="mt-1 font-semibold text-white">
                  Mejor UX
                </p>
              </div>

              <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
                <p className="text-slate-400">Estilo</p>
                <p className="mt-1 font-semibold text-white">
                  Moderno y limpio
                </p>
              </div>
            </div>

            <a
              href="https://github.com/Zelko7u7"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-block rounded-xl bg-cyan-500 px-5 py-3 font-medium text-slate-950 transition hover:bg-cyan-400"
            >
              Contáctame
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}