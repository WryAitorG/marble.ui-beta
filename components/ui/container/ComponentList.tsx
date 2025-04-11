"use client";

import ToggleComponent from "@/components/ui/container/ToggleComponent";

interface ComponentListProps {
  category: string;
  components: {
    title: string;
    description: string;
    slug: string;
    code: string;
    Component: React.ComponentType<Record<string, unknown>> | null;
  }[];
}

export default function ComponentList({ components }: ComponentListProps) {
  return (
    <div className="flex flex-col gap-6">
      {components.map((comp) => {
        if (!comp.Component) return null; // evita error si el componente no se pudo importar

        return (
          <div key={comp.slug} className="pt-4 w-full">
            <h2 className="text-xl font-bold mb-2 pt-8">{comp.title}</h2>
            <p className="mb-4 text-gray-400">{comp.description}</p>

            <ToggleComponent
              component={<comp.Component />}
              code={comp.code}
            />
          </div>
        );
      })}
    </div>
  );
}
