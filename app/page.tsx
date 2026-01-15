import PhotoCard from "@/src/component/PhotoCard";
import { photos } from "@/src/data/photo";
import ContactForm from "@/src/component/ContactForm";

export default function Home() {
  return (
   <main className="min-h-screen p-8 max-w-7xl mx-auto">
    <header className="mb-12">
      <h1 className="text-4xl font-bold mb-4">Gallery</h1>
      <p className="text-gray-600">Explore the collection.</p>
    </header>

      {/* photo grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg: grid-cols3 gap-6">
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo}/>
        ))}
      </div>

      {/* 聯絡表單 (Phase 2.3 add) */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-10">
        <ContactForm />
      </div>
   </main>
  );
}
