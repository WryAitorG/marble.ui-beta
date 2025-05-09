"use client";

import Link from "next/link";
import { sidebarSections } from "@/utils/sidebarSections";

interface Props {
  currentSlug: string;
}

const NextPrevNavigation: React.FC<Props> = ({ currentSlug }) => {
  const flatSlugs = sidebarSections.flatMap(section => section.items.map(item => item.slug));
  const currentIndex = flatSlugs.indexOf(currentSlug);

  const prevSlug = currentIndex > 0 ? flatSlugs[currentIndex - 1] : null;
  const nextSlug = currentIndex < flatSlugs.length - 1 ? flatSlugs[currentIndex + 1] : null;

  return (
    <div className="flex justify-between mt-16">
      {prevSlug ? (
        <Link
          href={`/components/${prevSlug}`}
          className="px-4 py-2 rounded-lg border text-sm font-semibold shadow-sm hover:bg-gray-100 transition"
        >
          ← {prevSlug.charAt(0).toUpperCase() + prevSlug.slice(1)}
        </Link>
      ) : <div />}

      {nextSlug ? (
        <Link
          href={`/components/${nextSlug}`}
          className="px-4 py-2 rounded-lg border text-sm font-semibold shadow-sm hover:bg-gray-100 transition"
        >
          {nextSlug.charAt(0).toUpperCase() + nextSlug.slice(1)} →
        </Link>
      ) : <div />}
    </div>
  );
};

export default NextPrevNavigation;
