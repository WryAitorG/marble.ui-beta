"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  loadComponentBySlug,
  loadAllComponentsByCategory,
} from "@/utils/loadComponents";
import { sidebarSections } from "@/utils/sidebarSections";

export default function LeftSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleHover = (slug: string) => {
    router.prefetch(`/components/${slug}`);
    loadComponentBySlug(slug); // precarga solo el primero
  };

  const handleClick = (slug: string) => {
    loadAllComponentsByCategory(slug); // precarga todos los componentes
  };

  const renderLink = (
    key: string,
    label: string,
    href: string,
    isActive: boolean,
    onHover?: () => void,
    onClick?: () => void
  ) => (
    <Link
      key={key}
      href={href}
      prefetch={false}
      onMouseEnter={!isActive ? onHover : undefined}
      onClick={(e) => {
        if (isActive) {
          e.preventDefault(); // 👈 evitar recarga o navegación
          return;
        }
        onClick?.();
      }}
      className={`block px-4 py-1.5 rounded-md transition-all text-sm text-left ${
        isActive
          ? "bg-gray-100 text-black shadow scale-105 cursor-default"
          : "text-black hover:bg-gray-100"
      }`}
    >
      {label}
    </Link>
  );
  

  return (
    <aside className="bg-white hidden md:flex pt-16 min-w-[206px] text-left pl-2">
      <div className="pt-2 space-y-10 text-base pb-14">
        {sidebarSections.map((section) => (
          <div key={section.title}>
            <h2 className="text-base font-bold text-black uppercase tracking-wide mb-2">
              {section.title}
            </h2>
            <nav className="space-y-1.5">
              {section.items.map((item) =>
               renderLink(
                item.slug,
                item.slug.replace("-", " "), // 👈 sin el número
                `/components/${item.slug}`,
                pathname === `/components/${item.slug}`,
                () => handleHover(item.slug),
                () => handleClick(item.slug)
              )
              )}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
}
