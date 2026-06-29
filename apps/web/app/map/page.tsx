import Link from 'next/link';

export default function MapPage() {
  return (
    <main className="min-h-screen bg-[#1A1A1A] text-white">
      <header className="text-center pt-8 pb-4">
        <h1 className="text-xl font-medium">A Field Guide to Being Human</h1>
        <p className="text-sm text-[#888] mt-1">Part II — Understanding Other People</p>
      </header>
      <div className="max-w-[700px] mx-auto px-4 pb-8">
        <div className="flex flex-col items-center gap-6 py-8">
          <Link
            href="/chapter"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white border-[3px] border-[#DAA520] text-black font-semibold text-lg animate-pulse"
          >
            4
          </Link>
          <p className="text-sm text-[#DAA520]">Resisting Change</p>
          <p className="text-xs text-[#666]">Tap to enter</p>
        </div>
      </div>
    </main>
  );
}
