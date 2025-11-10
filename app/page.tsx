import Link from 'next/link';

/**
 * Root page - should rarely be seen as middleware redirects to locale-specific routes
 * This serves as a fallback if the middleware doesn't work
 */
export default function RootPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream font-serif">
      <main className="flex flex-col items-center gap-8 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-gold">
          נס התמר
        </h1>
        <p className="text-xl text-dark/70 max-w-lg">
          Please select your language / אנא בחרו את השפה שלכם
        </p>
        <div className="flex gap-6">
          <Link
            href="/he"
            className="px-8 py-4 bg-gold text-white font-bold text-lg rounded-lg hover:bg-gold-light transition-colors shadow-lg"
          >
            עברית
          </Link>
          <Link
            href="/en"
            className="px-8 py-4 border-2 border-gold text-gold font-bold text-lg rounded-lg hover:bg-gold hover:text-white transition-colors"
          >
            English
          </Link>
        </div>
      </main>
    </div>
  );
}
