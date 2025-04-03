import LeftSidebar from "@/components/ui/container/LeftSidebar";

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* 📌 Sidebar izquierdo */}
      <LeftSidebar />

      {/* 📌 Contenido principal */}
      <main className="flex-1 p-6">{children}</main>

    </div>
  );
}
