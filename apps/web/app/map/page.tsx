import { WorldMap, MapHeader } from '@/modules/map';

export default function MapPage() {
  return (
    <main className="min-h-screen bg-[#1A1A1A] text-white">
      <MapHeader />
      <div className="max-w-[700px] mx-auto px-4 pb-8">
        <WorldMap />
      </div>
    </main>
  );
}
