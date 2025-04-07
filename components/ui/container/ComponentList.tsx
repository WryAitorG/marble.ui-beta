"use client";

import { useEffect, useState, ComponentType, JSX } from "react";
import ToggleComponent from "@/components/ui/container/ToggleComponent";

interface Props {
  category: string;
  components: {
    title: string;
    description: string;
    slug: string;
    code: string;
  }[];
}

export default function ComponentList({ category, components }: Props) {
  const [loaded, setLoaded] = useState<
    Record<string, ComponentType<JSX.IntrinsicAttributes>>
  >({});

  // ✅ Precarga el primer componente automáticamente al montar
  useEffect(() => {
    if (components.length > 0) {
      const first = components[0];
      import(`@/components/preview/${category}/${first.slug}`).then((mod) => {
        setLoaded((prev) => ({ ...prev, [first.slug]: mod.default }));
      });
    }
  }, [category, components]);

  const handleLoad = async (slug: string) => {
    if (loaded[slug]) return;
    const mod = await import(`@/components/preview/${category}/${slug}`);
    setLoaded((prev) => ({ ...prev, [slug]: mod.default }));
  };

  return (
    <div className="flex flex-col gap-6">
      {components.map((comp, index) => {
        const LoadedComponent = loaded[comp.slug];

        if (!LoadedComponent) {
          // Solo el primero se carga automáticamente
          if (index === 0) return null;

          return (
            <div
              key={comp.slug}
              className="pt-4 w-full"
              onMouseEnter={() => handleLoad(comp.slug)}
            />
          );
        }

        return (
          <div key={comp.slug} className="pt-4 w-full">
            <h2 className="text-xl font-bold mb-2 pt-8">{comp.title}</h2>
            <p className="mb-4 text-gray-400">{comp.description}</p>
            <ToggleComponent component={<LoadedComponent />} code={comp.code} />
          </div>
        );
      })}
    </div>
  );
}
