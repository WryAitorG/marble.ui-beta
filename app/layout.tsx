import "@/styles/globals.css";
import Navbar from "@/components/ui/navegation/Navbar";
import Footer from "@/components/ui/navegation/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-white text-gray-900 flex flex-col min-h-screen">
        {/* 📌 Contenedor global con ancho limitado */}
        <div className="w-full max-w-8xl mx-auto px-4 @sm:px-6 @md:px-8 flex flex-col flex-1">
          <Navbar />
          <main className="flex-1 pt-0 sm:pt-16 md:pt-20">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
