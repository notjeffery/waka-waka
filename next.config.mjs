/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Waka-Waka's pages are almost entirely driven by client-side
    // localStorage reads (wallet, chats, errands, saved items) rather than
    // server data. Next's default router cache keeps a short-lived snapshot
    // of recently-visited pages so back/forward navigation feels instant —
    // but that means navigating away from a page right after changing
    // localStorage (e.g. marking an errand complete) and then back can show
    // stale content, because the page's mount-time effect doesn't re-run.
    // Setting this to 0 forces a fresh render on every navigation instead.
    staleTimes: {
      dynamic: 0,
      static: 0,
    },
  },
};

export default nextConfig;
