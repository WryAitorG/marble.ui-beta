import "@/styles/globals.css";
import Navbar from "@/components/ui/navegation/Navbar";
import Footer from "@/components/ui/navegation/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-white text-gray-900 flex flex-col min-h-screen">
        <Navbar /> {/* ⬅ Navbar fijo arriba */}
        <main className="flex-1 pt-16">{children}</main> {/* ⬅ Contenido dinámico */}
        <Footer /> {/* ⬅ Footer fijo abajo */}
      </body>
    </html>
  );
}
