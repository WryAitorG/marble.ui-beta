import LeftSidebar from "@/components/ui/container/LeftSidebar";

// ComponentsLayout.tsx
export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* 📌 Sidebar izquierdo con scroll personalizado */}
      <aside className="sticky top-20 h-[calc(101vh-6rem)] pt-1 overflow-y-auto custom-scroll">
      <LeftSidebar />
      </aside>
      {/* 📌 Contenido principal con scroll normal */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
