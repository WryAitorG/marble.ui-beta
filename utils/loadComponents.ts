// Suponiendo que esta es la función que carga componentes dinámicamente
import fs from "fs";
import path from "path";

export function loadComponents() {
  const componentsDir = path.join(process.cwd(), "components", "preview");
  const components: Record<string, any> = {};

  fs.readdirSync(componentsDir).forEach((folder) => {
    const folderPath = path.join(componentsDir, folder);
    if (fs.statSync(folderPath).isDirectory()) {
      fs.readdirSync(folderPath).forEach((file) => {
        if (file.endsWith(".tsx")) {
          const componentName = file.replace(".tsx", "");
          try {
            // Asegúrate de que esta ruta refleje la configuración correcta de tu alias
            components[componentName] = require(`@/components/preview/${folder}/${componentName}`).default;
          } catch (error) {
            console.error(`Error cargando ${componentName}:`, error);
          }
        }
      });
    }
  });

  return components;
}
