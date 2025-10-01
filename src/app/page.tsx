import ShowCasePage from "@/components/pages/showcase";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <div
        className="fixed inset-0 bg-[url('https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg')] 
               bg-cover bg-no-repeat bg-center bg-fixed 
               -z-10">
      </div>
      <ShowCasePage />
    </main>
  );
}
