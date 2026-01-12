import PhotoCard from "@/src/component/PhotoCard";
import { photos } from "@/src/data/photo";

export default function Home() {
  return (
   <main className="min-h-screen p-8 max-w-7xl mx-auto">
    <header className="mb-12">
      <h1 className="text-4xl font-bold mb-4">Gallery</h1>
      <p className="text-gray-600">Explore the collection.</p>
    </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg: grid-cols3 gap-6">
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo}/>
        ))}
      </div>
   </main>
  );
}
