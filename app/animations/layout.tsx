import LeftSidebar from "@/components/ui/animations/LeftSidebar";
import RightSidebar from "@/components/ui/animations/RightSidebar";

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen ">
      {/* 📌 Sidebar izquierdo */}
      <LeftSidebar />

      {/* 📌 Contenido principal */}
      <main className="flex-1 p-6">{children}</main>

      {/* 📌 Sidebar derecho importado desde su propio archivo */}
      <RightSidebar />
    </div>
  );
}
