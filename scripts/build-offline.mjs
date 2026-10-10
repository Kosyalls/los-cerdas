import { build } from "esbuild";
import { copyFile, cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "offline-preview");
await mkdir(out, { recursive: true });
await build({
  entryPoints: [path.join(root, "src/main.tsx")],
  outfile: path.join(out, "app.js"),
  bundle: true,
  format: "iife",
  platform: "browser",
  target: ["es2020"],
  jsx: "automatic",
  minify: true,
  define: { "process.env.NODE_ENV": '"production"' },
  external: ["/fonts/*"],
  legalComments: "eof",
});
const css = (await readFile(path.join(out, "app.css"), "utf8")).replaceAll(
  "/fonts/",
  "./fonts/",
);
await writeFile(path.join(out, "app.css"), css);
await cp(path.join(root, "public/media"), path.join(out, "media"), {
  recursive: true,
});
await cp(path.join(root, "public/fonts"), path.join(out, "fonts"), {
  recursive: true,
});
await copyFile(
  path.join(root, "public/favicon.svg"),
  path.join(out, "favicon.svg"),
);
await writeFile(
  path.join(out, "index.html"),
  `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#111110"><meta name="robots" content="noindex,nofollow"><title>LOS CERDAS — Maqueta offline</title><link rel="icon" href="./favicon.svg"><link rel="stylesheet" href="./app.css"></head><body><div id="root"></div><script defer src="./app.js"></script></body></html>\n`,
);
await writeFile(
  path.join(out, "LEEME.txt"),
  `LOS CERDAS / MAQUETA DE DIRECCIÓN ARTÍSTICA / 2026-10-10

1. Extrae todo el ZIP en una carpeta.
2. Abre index.html con doble clic en un navegador moderno.
3. No necesitas Internet, cuentas, Node, npm ni un servidor.

Esta copia es la maqueta, no el regalo final. Incluye siete fotografías de muestra y cuatro retratos.
Incluye Soviet Connection (Michael Hunter) como MP3 local, convertido de la grabación aportada por Sergi.
El tema comienza al pulsar abrir el archivo, con volumen bajo. El botón de sonido permite silenciarlo o activarlo.
Las demás secciones explican el diseño previsto; no son funciones terminadas.
Los originales de las 41 imágenes y los dos vídeos siguen en el proyecto.
La entrega final debe incorporar TODO el material, catálogo y originales.

Contenido real, fechas e identidades: solo lo confirmado por los amigos.
Fuente Anton incluida bajo OFL; licencia en fonts/OFL.txt.
Conserva la carpeta completa. No muevas index.html por separado.
`,
);
console.log(
  "Offline prototype built: offline-preview/index.html (classic bundled JS; no server required).",
);
