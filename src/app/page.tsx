export default function LandingPage() {
  return (
    <main>
      {/* ===================== HERO ===================== */}
      <section className="relative h-screen w-full overflow-hidden bg-ink">
        {/* background video */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/market-video.mp4"
          poster="/market-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
        />

        {/* translucent overlay */}
        <div className="absolute inset-0 bg-ink/80" />

        {/* nav */}
        <nav className="relative z-10 flex items-center justify-end px-6 md:px-10 pt-8">
          <a href="#shopper" className="font-mono text-xs text-paper/70 hover:text-mint transition-colors">
            Become a shopper
          </a>
        </nav>

        {/* wordmark + CTA */}
        <div className="relative z-10 flex h-[calc(100%-88px)] flex-col items-center justify-center text-center px-6">
          {/* wrapper is left-aligned internally so each line can be offset independently,
              while staying centered as a whole block on the page */}
          <div className="inline-flex flex-col items-start text-left">
            <h1 className="leading-[0.85]">
              <span className="block font-wordmark font-extrabold text-5xl md:text-7xl text-mint tracking-tight uppercase -ml-2 md:-ml-4">
                Waka
              </span>
              {/* nudge this right so it starts around the A/K of the word above — adjust ml value to taste */}
              <span className="block font-cursive text-6xl md:text-8xl text-paper -mt-1 md:-mt-3 ml-20 md:ml-32">
                Waka
              </span>
            </h1>
          </div>
          <p className="mt-6 max-w-md text-paper/70 text-base md:text-lg font-body">
            Send someone who knows the market — watch it happen live before you pay.
          </p>
        </div>

        {/* CTA bottom-right */}
        <a
          href="#get-started"
          className="group absolute z-10 bottom-8 right-6 md:bottom-12 md:right-12 inline-flex items-center gap-3 rounded-full border border-mint/50 bg-transparent text-paper pl-6 pr-4 py-3 font-body font-medium
                     transition-all duration-300 ease-out
                     hover:bg-mint hover:text-ink hover:border-mint hover:pr-6 hover:gap-4 hover:shadow-lg hover:shadow-mint/20
                     active:scale-95 active:duration-150"
        >
          Get started
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </section>

      {/* ===================== PAIN POINTS ===================== */}
      <section className="bg-paper text-charcoal">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="font-mono text-sm text-clay mb-3">WHY WAKA-WAKA</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-16 max-w-2xl">
            Buying from the market shouldn&rsquo;t mean guessing what you&rsquo;ll get.
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="border-t-2 border-ink pt-6">
              <h3 className="font-display font-bold text-xl mb-3">
                No time to go yourself
              </h3>
              <p className="text-charcoal/70 leading-relaxed">
                Between work and everything else, getting to a specific
                market on a specific day isn&rsquo;t always possible. Send
                someone who already knows the way.
              </p>
            </div>
            <div className="border-t-2 border-ink pt-6">
              <h3 className="font-display font-bold text-xl mb-3">
                Can&rsquo;t trust it sight-unseen
              </h3>
              <p className="text-charcoal/70 leading-relaxed">
                A vendor&rsquo;s word isn&rsquo;t always enough. See the
                actual item, ask questions, and hear the real price before
                you commit.
              </p>
            </div>
            <div className="border-t-2 border-ink pt-6">
              <h3 className="font-display font-bold text-xl mb-3">
                It should feel personal
              </h3>
              <p className="text-charcoal/70 leading-relaxed">
                Like sending a friend who knows the market — not a faceless
                delivery. You&rsquo;re on the call, in real time, making the
                call.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="font-mono text-sm text-mint mb-3">HOW IT WORKS</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-16 max-w-2xl">
            Your money only moves after you&rsquo;ve seen it with your own eyes.
          </h2>

          <div className="grid md:grid-cols-4 gap-8 font-mono text-sm">
            <div>
              <p className="text-mint mb-2">01</p>
              <p className="text-paper/80 leading-relaxed">
                Post your list and fund your Waka-Waka wallet.
              </p>
            </div>
            <div>
              <p className="text-mint mb-2">02</p>
              <p className="text-paper/80 leading-relaxed">
                A shopper who knows that market picks it up.
              </p>
            </div>
            <div>
              <p className="text-mint mb-2">03</p>
              <p className="text-paper/80 leading-relaxed">
                They call you live from the stall — you see it, you ask,
                they confirm the price out loud.
              </p>
            </div>
            <div>
              <p className="text-mint mb-2">04</p>
              <p className="text-paper/80 leading-relaxed">
                You approve, we pay the vendor directly. Shopper never
                touches your money.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== MARKET COVERAGE ===================== */}
      <section className="bg-paper text-charcoal">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="font-mono text-sm text-clay mb-3">ANY MARKET, ANY LIST</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-12 max-w-2xl">
            From tomatoes to textiles.
          </h2>
          <div className="flex flex-wrap gap-3 font-mono text-sm">
            {[
              "Foodstuff & perishables",
              "Fabric & textiles",
              "Electronics",
              "Building materials",
              "Fashion & accessories",
              "Spare parts",
              "Home & kitchenware",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-ink/20 px-4 py-2 hover:border-clay hover:text-clay transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== DUAL CTA ===================== */}
      <section id="get-started" className="bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-6 py-24 grid md:grid-cols-2 gap-8">
          <div className="rounded-3xl bg-teal/40 border border-paper/10 p-10">
            <h3 className="font-display font-bold text-2xl mb-3">
              Need something from the market?
            </h3>
            <p className="text-paper/70 mb-6 leading-relaxed">
              Post your list, get matched with a shopper who knows that
              market, and watch it happen live.
            </p>
            <a
              href="/signup/customer"
              className="inline-block rounded-full bg-mint text-ink px-6 py-3 font-medium hover:opacity-90 transition-opacity"
            >
              Find a shopper
            </a>
          </div>
          <div id="shopper" className="rounded-3xl bg-charcoal/40 border border-paper/10 p-10">
            <h3 className="font-display font-bold text-2xl mb-3">
              Know a market like the back of your hand?
            </h3>
            <p className="text-paper/70 mb-6 leading-relaxed">
              Turn that knowledge into income. Run errands, build your
              rating, get paid per job — you never touch the customer&rsquo;s
              money.
            </p>
            <a
              href="/signup/shopper"
              className="inline-block rounded-full border border-paper/30 px-6 py-3 font-medium hover:border-mint hover:text-mint transition-colors"
            >
              Become a shopper
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-ink text-paper/40 font-mono text-xs">
        <div className="mx-auto max-w-6xl px-6 py-8">
          © {new Date().getFullYear()} Waka-Waka
        </div>
      </footer>
    </main>
  );
}